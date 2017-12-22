export default function htmlArrayTemplate(label, list) {
    const { arraySelector, childSelector, possibleIndexes } = list;
    const indexes = Object.keys(possibleIndexes);
    return `
        parsedData['${label}'] = [];
        $('${arraySelector}').each(function(index) {
            if ([${indexes.join(', ')}].indexOf(index) === -1) return;
            parsedData['${label}'].push($.trim($(this).find('${childSelector}').text()));
        });
    `;
}
