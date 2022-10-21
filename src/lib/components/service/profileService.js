import { handleResponse, authHeader } from '../jwt/_helpers';
import { BASE_URL, NGS_CHARITY_ID, STRIPE_SECRCT } from "../common/constant";

export const profileService = {
    getUserData,
    getCardData,
    getCardDetails,
    transactionListing
}

async function getUserData(userDetails) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(userDetails)
    };
    const url = BASE_URL + `/User/getSignInUserDetails`; 
    return fetch(url, requestOptions)
        .then(handleResponse)
        .then(result => {
            //console.log(result);
             if (result.data !== null && result.data !== undefined && result.data.status === 1) {
                return result;
            }
        }).catch(error => {
           
            return [];
        });
}

async function getCardData(guid) {
    //console.log("profile service", guid);
    const requestOptionsForStripe = {
        method: 'GET',
        headers: authHeader(),
    };
    const url = BASE_URL + `/User/getUserStripeToken?Guid=` + guid; 
    
    return fetch(url, requestOptionsForStripe)
        .then(handleResponse)
        .then(result => {
            
            if (result.data.userStripeTokens.result !== null && result.data.userStripeTokens.result !== undefined) {
                let resultData = result.data.userStripeTokens.result;
                return resultData;
            }
        }).catch(error => {
            return [];
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
async function transactionListing() {
    let data = {
        // guid : authContext.guid ?? '',
        guid: "6114d359e33a250071d4cc38",
        // guid: "611b7059f56b7d0075527513",
        charityId: NGS_CHARITY_ID,
        pageNumber : 1
    } 
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(data)
    };
    const url = BASE_URL + `/v1/Donation/getUserTransactions`; 
    return fetch(url, requestOptions)
        .then(handleResponse)
        .then(result => {
            
             if (result.data !== null && result.data !== undefined && result.data.status === 1) {
                return result;
            }
        }).catch(error => {
           
            return [];
        });
}