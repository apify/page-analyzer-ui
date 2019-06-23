import 'whatwg-fetch';

const { fetch } = global;

const parseJSON = async (response) => {
    let body
    try {
        const responseBody = await response.text();
        body = JSON.parse(responseBody);
    } catch (err) {
        body = response.body;
    }

    return {
        code: response.status,
        body,
    }
};

const throwIfErr = (response) => {
    if (response.code >= 400) return response;
    else return response.body;
}

export default function fetchData(input, init) {
    return fetch(input, init).then(parseJSON).then(throwIfErr);
}
