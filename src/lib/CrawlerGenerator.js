import pageFunctionTemplate from '../templates/pageFunction';
import crawlerTemplate from '../templates/crawler';
import jsonLDFieldTemplate from '../templates/jsonLDField';
import normalize from './normalize';

const METADA_COEFICIENT = 1;
const SCHEMA_ORG_COEFICIENT = 0.95;
const JSON_LD_COEFICIENT = 0.95;
const WINDOW_COEFICIENT = 0.95;
const HTML_COEFICIENT = 0.8;

const LETTER_COEFICIENT = 0.02;
const PATH_LENGTH_COEFICIENT = 0.005;
const MALFORMED_COEFICIENT = 0.9;

const getTypeCoeficient = (type) => {
    switch (type) {
    case 'schemaOrg': return SCHEMA_ORG_COEFICIENT;
    case 'metadata': return METADA_COEFICIENT;
    case 'jsonLD': return JSON_LD_COEFICIENT;
    case 'window': return WINDOW_COEFICIENT;
    case 'html': return HTML_COEFICIENT;
    default: return 0;
    }
}

export const getScore = (searchString, type, item) => {
    const value = item.value || item.text;
    const path = item.path || item.selector;
    const normalizedValue = normalize(value);
    const normalizedSearchString = normalize(searchString);
    const containsNormalizedSearch = normalizedValue.indexOf(normalizedSearchString) !== -1;
    if (!containsNormalizedSearch) return -1;
    const malformedCoeficient = value.indexOf(searchString) === -1 ? MALFORMED_COEFICIENT : 1;
    const typeCoeficient = getTypeCoeficient(type);
    const ineficiencyCoeficient = 1 - (normalizedValue.replace(normalizedSearchString, '').length * LETTER_COEFICIENT) - (path.length * PATH_LENGTH_COEFICIENT);
    return typeCoeficient * malformedCoeficient * ineficiencyCoeficient;
}

const generateCrawler = (url, crawlerName, items, searchResults) => {
    const data = {
        requiresJQuery: false,
        requiresSchemaOrg: false,
        crawlerItems: [],
    };
    Object.keys(items).forEach((searchString, i) => {
        const selectedOption = items[searchString];
        if (!selectedOption) {
            return;
        }
        const value = searchResults[searchString][selectedOption.value];
        const label = selectedOption.label;

        switch (value.type) {
            case 'schemaOrg': {
                data.requiresJQuery = true;
                data.requiresSchemaOrg = true;
                data.crawlerItems.push(`parsedData['${label}'] = schemaOrg${value.path};`);
                break;
            }
            case 'metadata': {
                data.requiresJQuery = true;
                const trimmedPath = value.path.substr(1);
                data.crawlerItems.push(`parsedData['${label}'] = $('meta[property="${trimmedPath}"], meta[name="${trimmedPath}"]').attr('content');`);
                break;
            }
            case 'jsonLD': {
                data.requiresJQuery = true;
                data.crawlerItems.push(jsonLDFieldTemplate(label, value.path));
                break;
            }
            case 'window': {
                data.crawlerItems.push(`parsedData['${label}'] = window${value.path};`);
                break;
            }
            case 'html': {
                data.requiresJQuery = true;
                data.crawlerItems.push(`parsedData['${label}'] = $('${value.path}').text();`);
                break;
            }
            // no default
        }
    });

    const pageFunction = pageFunctionTemplate(data);
    return crawlerTemplate({
        requiresJQuery: data.requiresJQuery,
        pageFunction,
        name: crawlerName,
        url,
    });
}

export default generateCrawler;
