export default function objectArrayTemplate(root, label, list) {
    const { arrayPath, childPath, possibleIndexes } = list;
    const indexes = Object.keys(possibleIndexes);
    return `
        parsedData['${label}'] = [];
        for (var i = 0; i < ${root}${arrayPath}.length; i++){
            if ([${indexes.join(', ')}].indexOf(i) === -1) continue;
            var item = ${root}${arrayPath}[i];
            parsedData['${label}'].push(item.${childPath});
        }
    `;
}
