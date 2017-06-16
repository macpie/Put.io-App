var token = localStorage.getItem('putio.access_token'),
    headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
    };

if (token) {
    var defaultFolder = 0;

    $.ajax('https://api.put.io/v2/account/settings', {
            method: 'GET',
            headers: headers,
            data: {
                oauth_token: token
            }
        })
        .done(function(data) {
            var settings = data.settings || {};

            defaultFolder = settings.default_download_folder || 0;

            console.log("got default download folder");
        })
        .fail(function() {
            console.warn("failed to get default download folder");
        });

} else {
    console.warning("token is missing");
}

function on_click(info) {
    $.ajax('https://api.put.io/v2/transfers/add', {
            method: 'POST',
            headers: headers,
            data: {
                oauth_token: token,
                url: info.linkUrl,
                save_parent_id: defaultFolder
            }
        })
        .done(function(data) {
            console.log("transfer started");

            chrome.notifications.create('', {
                type: 'basic',
                iconUrl: 'img/icon48.png',
                title: 'Transfer added',
                message: data.transfer.name || ''
            });
        })
        .fail(function(x, status) {
            console.warn("transfer failed " + status);

            chrome.notifications.create('', {
                type: 'basic',
                iconUrl: 'img/icon48.png',
                title: 'Transfer failed'
            });
        });
}

chrome.contextMenus.create({
    title: 'Upload to put.io',
    contexts: ['link', 'selection'],
    onclick: on_click
});
