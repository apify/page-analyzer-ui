import fetch from './fetch';

const API_URL = 'https://api.apify.com/v2';
const ACT_ID = 'apify~page-analyzer';
// const ACT_ID = 'jaroslavhejlek~act-page-analyzer';

export async function startRun(INPUT) {
    const url = `${API_URL}/acts/${ACT_ID}/runs`;
    const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(INPUT),
        json: true,
        headers: {
            'Content-Type': 'application/json',
        }
    });
    return response;
}

export async function getRun(runId) {
    const url = `${API_URL}/acts/${ACT_ID}/runs/${runId}`;
    const response = await fetch(url, {
        method: 'GET',
        json: true,
    });
    return response;
}

export async function getOutput(keystoreId) {
    const url = `${API_URL}/key-value-stores/${keystoreId}/records/OUTPUT`;
    const response = await fetch(url, {
        method: 'GET',
        json: true,
    });
    return response;
}
