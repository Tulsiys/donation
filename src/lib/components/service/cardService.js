import { handleResponse, authHeader } from '../jwt/_helpers';
import { BASE_URL } from "../common/constant";
import { STRIPE_SECRCT } from "../common/constant";


export const cardService = {
    cardPayment,
    sendCardToken,
    getUserStripeToken,
    getCardDetails,
    confirmGrabPayment,
    donateNowGrabPayment,
    adoptionDonateNowSync,
    donateNowSync,
    paymentSyncWithSalesForce,
}

async function cardPayment(paymentDetails) {
    const requestOptionsForStripe = {
        method: 'POST',
        headers: { 'Authorization': 'Bearer ' + STRIPE_SECRCT },
    };
    return fetch('https://api.stripe.com/v1/tokens?card[number]=' + paymentDetails.cardNumber + '&card[exp_month]=' + paymentDetails.cardExpiryMonth + '&card[exp_year]=' + paymentDetails.cardExpiryYear + '&card[cvc]=' + paymentDetails.cardCvcNumber + '&card[name]=' + paymentDetails.nameOnCard, requestOptionsForStripe)
        .then(response => {
            if (!response.ok) {
                return Promise.reject(response)
            }
            return response.json()
        })
        .catch(async response => {
            const error = await response.text().then(text => text)
            return Promise.reject(error)
        })
}

async function adoptionDonateNowSync(txnId, isUserUnmap) {

    const requestOptionsForStripe = {
        method: 'POST',
        headers: authHeader(),
    };

    return fetch(BASE_URL + '/v1/Donation/adoptionDonateNowSync?transactionNumber=' + txnId + '&userUnmap='+ isUserUnmap, requestOptionsForStripe)
        .then(handleResponse)
        .then(result => {
            return result;
        }).catch(error => {
            return [];
        });
}

async function sendCardToken(tokenDetails) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(tokenDetails)
    };

    const url = BASE_URL + `/v1/Donation/donateNow`;
    return fetch(url, requestOptions)
        .then(handleResponse)
        .then(result => {
            if (result.data !== null && result.data !== undefined && result.data.status === 1) {
                // Call this split API function
                // donateNowSync(result.data.txnNo);
                
                return result.data;
            } else {
                var data = {}
                return data = { status: 0, message: result.data.message }
            }
        }).catch(error => {
            var data = {}
            return data = { status: 0, message: error.message }
        });
}

async function getUserStripeToken(guid, charityId = 15) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader(),
    };
    const url = BASE_URL + `/User/getUserStripeToken?Guid=` + guid + '&charityId=' + charityId;
    return fetch(url, requestOptions)
        .then(handleResponse)
        .then(result => {
            if (result.data !== null && result.data !== undefined && result.data.status === 1) {
                return result.data;
            } else {
                var data = {}
                return data = { status: 0, message: result.data.message }
            }
        }).catch(error => {
            var data = {}
            return data = { status: 0, message: error.message }
        });
}

async function getCardDetails(cardId, customerId) {

    const requestOptionsForStripe = {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + STRIPE_SECRCT },
    };

    return fetch('https://api.stripe.com/v1/customers/' + customerId + '/sources/' + cardId, requestOptionsForStripe)
        .then(handleResponse)
        .then(result => {
            return result;
        }).catch(error => {
            return [];
        });
}

async function donateNowSync(txnId) {

    const requestOptionsForStripe = {
        method: 'POST',
        headers: authHeader(),
    };

    return fetch(BASE_URL + '/v1/Donation/donateNowSync?transactionNumber=' + txnId, requestOptionsForStripe)
        .then(handleResponse)
        .then(result => {
            return result;
        }).catch(error => {
            return [];
        });
}

async function paymentSyncWithSalesForce(txnId) {
    const requestOptionsForStripe = {
        method: 'POST',
        headers: authHeader(),
    };

    return fetch(BASE_URL + '/v1/Donation/paymentSyncWithSalesForce?transactionNumber=' + txnId, requestOptionsForStripe)
        .then(handleResponse)
        .then(result => {
            return result;
        }).catch(error => {
            return [];
        });
}

async function confirmGrabPayment(grabPayPayload) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(grabPayPayload)
    };

    const url = BASE_URL + `/v1/Donation/confirmGrabPayment`;
    return fetch(url, requestOptions)
        .then(handleResponse)
        .then(result => {
            if (result.data !== null && result.data !== undefined && result.data.status === 1) {
                // Call this split API function
                donateNowSync(result.data.txnNo);
                return result.data;
            } else {
                var data = {}
                return data = { status: 0, message: result.data.message }
            }
        }).catch(error => {
            var data = {}
            return data = { status: 0, message: error.message }
        });
}

async function donateNowGrabPayment(grabDonatepayload) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(grabDonatepayload)
    };

    const url = BASE_URL + `/v1/Donation/donateNowGrabPayment`;
    return fetch(url, requestOptions)
        .then(handleResponse)
        .then(result => {
            if (result.data !== null && result.data !== undefined && result.data.status === 1) {
                return result.data;
            } else {
                var data = {}
                return data = { status: 0, message: result.data.message !== undefined ? result.data.message : result.message }
            }
        }).catch(error => {
            var data = {}
            return data = { status: 0, message: error.message }
        });
}