import { authHeader, handleResponse } from '../_helpers';
import { BASE_URL, NGS_CHARITY_ID } from '../../common/constant';

// import { BASE_URL } from "../../data/constants.js";

// const BASE_URL = process.env.BASE_URL;

export const programmeService = {
    getPatronProgrammes
};

// async function getPatronProgrammes(pageNumber = 0, pageSize = 3)
async function getPatronProgrammes(pageNumber = 0, pageSize = 0) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader()
    };

    const url = BASE_URL + "/v1/Patron/getPatronProgrammes?charityId=" + NGS_CHARITY_ID + "&pageNumber=" + pageNumber + "&pageSize=" + pageSize;
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
