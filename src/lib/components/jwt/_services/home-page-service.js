import { handleResponse } from '../_helpers';
import { BASE_URL, NGS_CHARITY_ID } from "../../common/constant";
import { authContext } from "../../data/authContext";

export const homePageService = {
    getHomePageSettings,
    getDonationWidgetData,
    getDonorWallData,
    getPayPartners
};

const header = {
    "givepls_token": authContext.IdToken,
    "Content-Type": "application/json",
}
async function getHomePageSettings() {
    const requestOptions = {
        method: 'POST',
        headers: header
    };
    const url = BASE_URL + "/v1/Home/homePageConfiguration?charityId=" + NGS_CHARITY_ID;
    return fetch(url, requestOptions)
        .then(handleResponse)
        .then(result => {
            if (result.data !== null && result.data !== undefined && result.data.status === 1) {
                return result.data;
            } else {
                return false
            }
        }).catch(error => {
            return false;
        });
}

async function getDonationWidgetData(appealId) {
    const requestOptions = {
        method: 'POST',
        headers: header
    };
    const url = BASE_URL + "/v1/Donation/donationWidget?charityId=" + NGS_CHARITY_ID + "&appealId=" + appealId;
    return fetch(url, requestOptions)
        .then(handleResponse)
        .then(result => {
            console.log('donation widget data', result);
            return result.data;
        }).catch(error => {
            return { status: 0 };
        });
}

async function getDonorWallData(pageNo, pageSize) {
    const requestOptions = {
        method: 'POST',
        headers: header
    };
    const url = BASE_URL + "/v1/Donation/donorWall?charityId=" + NGS_CHARITY_ID + "&pageNumber=" + pageNo + "&pageSize=" + pageSize;
    return fetch(url, requestOptions)
        .then(handleResponse)
        .then(result => {
            if (result.data !== null && result.data !== undefined && result.data.status === 1) {
                return result.data;
            } else {
                return []
            }
        }).catch(error => {
            return [];
        });
}

async function getPayPartners(charityId) {
    const requestOptions = {
        method: 'POST',
        headers: header
    };
    // const url = BASE_URL + "/v1/Donation/getPayPartners?charityId=" + NGS_CHARITY_ID;
    const url = BASE_URL + "/v1/Donation/getPayPartners?charityId=" + charityId;
    return fetch(url, requestOptions)
        .then(handleResponse)
        .then(result => {
            if (result.data !== null && result.data !== undefined && result.data.status === 1) {
                return result.data;
            } else {
                return []
            }
        }).catch(error => {
            return [];
        });
}