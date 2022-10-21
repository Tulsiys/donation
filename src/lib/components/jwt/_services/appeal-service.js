import { handleResponse, authHeader } from '../_helpers';
import { BASE_URL } from "../../common/constant";
// const BASE_URL = process.env.BASE_URL;

export const appeal = {
    getAppealList,
    getAppealDetails
};

async function getAppealList(payload) {
    const requestOptions = {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: authHeader()
    };
    const url = BASE_URL + "/v1/Appeal/getAppealList";
    return fetch(url, requestOptions)
        .then(handleResponse)
        .then(result => {
            if (result.data !== null && result.data !== undefined && result.data.status === 1) {
                return result.data;
            } else {
                return []
            }
        }).catch(error => {
            return error;
        });
}

async function getAppealDetails(appealDetailsPayload) {

    const requestOptions = {
        method: 'POST',
        // body: JSON.stringify(appealData),
        headers: authHeader()
    };
    const url = BASE_URL + `/v1/Appeal/getAppealDetails?id=${appealDetailsPayload.appealId}&charityId=${appealDetailsPayload.charityId}`;
    return fetch(url, requestOptions)
        .then(handleResponse)
        .then(result => {
            return result.data;
        }).catch(error => {
            return error;
        });
}