import 'whatwg-fetch';

const { fetch } = global;

const parseJSON = (response) => {
    if (response && response.status === 404) {
        return response;
    }
    return response ? response.json() : { code: 204, status: 'Ok' }
};

export default function fetchData(input, init) {
    return fetch(input, init).then(parseJSON);
}
