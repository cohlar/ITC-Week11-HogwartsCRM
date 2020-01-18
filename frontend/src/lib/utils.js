export function getParameterByName(name, url) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

export function formatDatetime(datetimeString) {
    return datetimeString.split('.')[0].replace('T', ' ');
}

export function parseErrorMessage(html_string) {
    const start = html_string.indexOf('<p>') + 3;
    const end = html_string.indexOf('</p>');
    return html_string.substring(start, end);
}