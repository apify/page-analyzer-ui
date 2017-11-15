import { AllHtmlEntities } from 'html-entities';
import { isString } from 'lodash';

const entities = new AllHtmlEntities();

const removeHTMLTags = (text) => text.replace(/<[^>]*>?/g, '');
const replaceHTMLEntities = (text) => entities.decode(text);
const removeSpaces = (text) => text.replace(/\s/g, '');
const convertCommasInNumbers = (text) => text.replace(/(\d+),(\d+)/g, '$1.$2');

export default function normalize(text) {
    if (!isString(text)) return text;
    let normalized = removeHTMLTags(text);
    normalized = replaceHTMLEntities(normalized);
    normalized = removeSpaces(normalized);
    normalized = convertCommasInNumbers(normalized);
    return normalized;
};
