export function getParameterByName(name, param_string) {
    if (!param_string) return;
    param_string = param_string.split('?')[1];
    const params = param_string.split(/&|=/);
    const index = params.indexOf(name);
    return params[index+1];
}

export function formatDatetime(datetimeString) {
    return datetimeString.split('.')[0].replace('T', ' ');
}

export function parseErrorMessage(html_string) {
    const start = html_string.indexOf('<p>') + 3;
    const end = html_string.indexOf('</p>');
    return html_string.substring(start, end);
}