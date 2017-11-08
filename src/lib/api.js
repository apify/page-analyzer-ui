import fetch from './fetch';

const API_URL = 'https://api.apify.com/v2';
const ACT_ID = 'jaroslavhejlek~act-page-analyzer';

export async function startRun(INPUT) {
    try {
        const url = `${API_URL}/acts/${ACT_ID}/runs`;
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(INPUT),
            json: true,
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if (response.status >= 400) {
            console.error(response);
            throw Error('API Connection error');
        }
        console.log(response);
        return response;
    } catch (error) {
        console.error(error);
    }
}

export async function getRun(runId) {
    try {
        const url = `${API_URL}/acts/${ACT_ID}/runs/${runId}`;
        const response = await fetch(url, {
            method: 'GET',
            json: true,
        });
        if (response.status >= 400) {
            console.error(response);
            throw Error('API Connection error');
        }
        console.log(response);
        return response;
    } catch (error) {
        console.error(error);
    }
}

export async function getOutput(keystoreId) {
    try {
        const url = `${API_URL}/key-value-stores/${keystoreId}/records/OUTPUT`;
        const response = await fetch(url, {
            method: 'GET',
            json: true,
        });
        if (response.status >= 400 && response.status !== 404) {
            console.error(response);
            throw Error('API Connection error');
        }
        return response;
    } catch (error) {
        throw error;
    }
}
