export default function jsonLDArrayTemplate(label, list) {
    const { arrayPath, childPath, possibleIndexes } = list;
    const indexes = Object.keys(possibleIndexes);
    const position = arrayPath.substr(1, arrayPath.indexOf(']') - 1);
    const jsonLDArrayPath = arrayPath.substr(3);
    return `
        parsedData['${label}'] = $('script[type="application/ld+json"]').get(${position});
        if (parsedData['${label}']) parsedData['${label}'] = JSON.parse(parsedData['${label}'].text);
        if (parsedData['${label}']) parsedData['${label}'] = parsedData['${label}']${jsonLDArrayPath};
        else parsedData['${label}'] = '';

        if (parsedData['${label}']) {
            var itemsArray = parsedData['${label}'];
            parsedData['${label}'] = [];
            for (var i = 0; i < itemsArray.length; i++){
                if ([${indexes.join(', ')}].indexOf(i) === -1) continue;
                var item = itemsArray[i];
                parsedData['${label}'].push(item.${childPath});
            }
        }
    `;
}
