import moment from 'moment';

export const bytesToString = (bytes, precision) => {
    if (bytes === 0) return '0 KB';
    if (isNaN(parseFloat(bytes)) || !isFinite(bytes)) return '-';
    if (typeof precision === 'undefined') precision = 1;

    var units = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB'],
        number = Math.floor(Math.log(bytes) / Math.log(1024));

    return (bytes / Math.pow(1024, Math.floor(number)))
        .toFixed(precision) + ' ' + units[number];
};

export const printDate = (date) => {
    if (date) {
        var localTime = moment.utc(date)
            .toDate();
        return moment(localTime)
            .format('DD/MM/YY @ HH:mm:ss');
    } else {
        return 'none';
    }
};

export const printDuration = (seconds) => {
    if (seconds < 0) {
        return 'forever';
    } else if (seconds) {
        return moment.duration(seconds, 'seconds')
            .humanize();
    } else {
        return 'none';
    }
};
