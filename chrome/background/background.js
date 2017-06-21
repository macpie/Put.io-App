var TOKEN = null,
    DEFAULT_FOLDER = null;

authenticate(function(token, settings) {
    DEFAULT_FOLDER = settings.default_download_folder || 0;
    TOKEN = token;

    setupBadge();

    chrome.contextMenus.create({
        title: 'Upload to put.io',
        contexts: ['link', 'selection'],
        onclick: contextMenuClick
    });

    setInterval(function() {
        setupBadge();
    }, 60000);
});

function authenticate(callback) {
    var token = localStorage.getItem('putio.access_token');

    if (token) {
        request('GET', '/account/settings', {
            oauth_token: token
        }, function(data) {
            console.log("got default download folder");
            callback(token, data.settings || {});
        }, function() {
            setTimeout(function() {
                authenticate(callback);
            }, 5000);
            console.warn("failed to get default download folder");
        });

    } else {
        setTimeout(function() {
            authenticate(callback);
        }, 5000);
    }
}

function setupBadge() {

    function setBadgeColor(color) {
        chrome.browserAction.setBadgeBackgroundColor({
            'color': color
        });
    }

    function setBadgeText(text) {
        if (text !== null && text !== undefined) {
            chrome.browserAction.setBadgeText({
                'text': text.toString()
            });
        }
    }

    request('GET', '/account/info', {
        oauth_token: TOKEN
    }, function(data) {
        var disk = data.info.disk,
            percentUsed = ((100 * disk.used) / disk.size)
            .toFixed(2);

        if (percentUsed <= 50) {
            setBadgeColor([70, 136, 71, 200]);
        }

        if (percentUsed > 50 && percentUsed <= 75) {
            setBadgeColor([248, 148, 6, 200]);
        }

        if (percentUsed > 75) {
            setBadgeColor([255, 40, 38, 200]);
        }

        console.log("got account info");
    }, function() {
        console.warn("failed to get account info");
    });

    request('GET', '/transfers/count', {
        oauth_token: TOKEN
    }, function(data) {
        setBadgeText(data.count);

        console.log("got transfers count");
    }, function() {
        console.warn("failed to get transfers count");
    });

}

function contextMenuClick(info) {
    request('POST', '/transfers/add', {
        oauth_token: TOKEN,
        url: info.linkUrl,
        save_parent_id: DEFAULT_FOLDER
    }, function(data) {
        console.log("transfer started");

        chrome.notifications.create('', {
            type: 'basic',
            iconUrl: 'img/icon48.png',
            title: 'Transfer added',
            message: data.transfer.name || ''
        });
    }, function(x, status) {
        console.warn("transfer failed " + status);

        chrome.notifications.create('', {
            type: 'basic',
            iconUrl: 'img/icon48.png',
            title: 'Transfer failed'
        });
    })
}

function request(type, url, data, success, fail) {
    var uri = 'https://api.put.io/v2';

    $.ajax(uri + url, {
            method: type,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
            },
            data: data
        })
        .done(success)
        .fail(fail);
}
