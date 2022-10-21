import { NGS_CHARITY_ID, STRIPE_SECRCT } from "../common/constant";
import { handleResponse, authHeader } from '../jwt/_helpers';
import { BASE_URL } from "../common/constant";
import { authContext } from '../data/authContext';


export const newCardService = {
    addNewCard,
    addNewWorldPayCard,
    editCardDetails,
    editCardWorldPayCard,
    deleteCard,
};

async function addNewCard(cardDetails) {
   
    const requestOptionsForStripe = { 
        method: 'POST',
        headers: { 'Authorization': 'Bearer ' + STRIPE_SECRCT },
    };
    return fetch('https://api.stripe.com/v1/tokens?card[number]=' + cardDetails.cardNumber + '&card[exp_month]=' + cardDetails.cardExpiryMonth + '&card[exp_year]=' + cardDetails.cardExpiryYear + '&card[cvc]=' + cardDetails.cardCvcNumber + '&card[name]=' + cardDetails.nameOnCard, requestOptionsForStripe)
        .then(response => {
            // reject not ok response
            
            if (!response.ok) {

                return Promise.reject(response)
            }
            return response.json() // or return response.text()
        })
        // catch error response and extract the error message
        .catch(async response => {
            const error = await response.text().then(text => text)
            return Promise.reject(error) 
        })
        .then(result => {
            if (result.card.length !== 0 && result.id !== '' && result.type === 'card') {
                return fetch('https://api.stripe.com/v1/customers?source=' + result.id, requestOptionsForStripe)
                    .then(response => {
                        // reject not ok response
                        if (!response.ok) {

                            return Promise.reject(response)
                        }
                        return response.json() // or return response.text()
                    })
                    // catch error response and extract the error message
                    .catch(async response => {
                        const error = await response.text().then(text => text)
                        return Promise.reject(error)
                    })
                    .then(customerResult => {
                        if (customerResult.id !== '') {
                            
                            const cardDetailsWithStripe = {
                                "cardId": result.card.id,
                                "fingerprint": result.card.fingerprint,
                                "customerId": customerResult.id,
                                "cardToken": result.id,
                                "guid" : cardDetails.guid,
                                "isDefaultCard": cardDetails.isDefaultCard,
                                "expiryMonth": cardDetails.cardExpiryMonth,
                                "expiryYear": cardDetails.cardExpiryYear,
                                "charityId": NGS_CHARITY_ID,
                            }
                            const requestOptions = {
                                method: 'POST',
                                headers: authHeader(),
                                body: JSON.stringify(cardDetailsWithStripe)
                            };
                            const url =  BASE_URL + `/User/addCardDetails`;
                            return fetch(url, requestOptions)
                                .then(response => {
                                    // reject not ok response
                                    
                                    if (!response.ok) {
                                        // authenticationService.refreshToken()
                                        return Promise.reject(response)
                                    }
                                    return response.json() // or return response.text()
                                })
                                // catch error response and extract the error message
                                .catch(async response => {
                                    const error = await response.text().then(text => text)
                                    return Promise.reject(error)
                                })
                                .then(result => {
                                    if (result.data !== null && result.data !== undefined && result.data.status === 1) {
                                        return result.data;
                                    } else {
                                        return result.data;
                                    }
                                }).catch(error => {
                                    return [];
                                });
                        }
                    })
                    .catch(error => {
                        return [];
                    })
            }
        }).catch(error => {
            return [];
        });
}

async function addNewWorldPayCard(cardDetails){

    const cardDetailsWorldPay = {
        "cardId": cardDetails.cardId ?? "",
        "fingerprint": cardDetails.fingerprint ?? "",
        "customerId": cardDetails.customerId ?? "",
        "cardToken": cardDetails.cardToken ?? "",
        "guid" : cardDetails.guid,
        "isDefaultCard": cardDetails.isDefaultCard,
        "expiryMonth": parseInt(cardDetails.cardExpiryMonth),
        "expiryYear": parseInt(cardDetails.cardExpiryYear),
        "charityId": NGS_CHARITY_ID,
        "cardWPEncryptedVal": cardDetails.cardWPEncryptedVal,
        "cardWPShopperId": cardDetails.cardWPShopperId,
        "cardHolderName": cardDetails.nameoncard
    }

    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(cardDetailsWorldPay)
    };

    const url =  BASE_URL + `/User/addCardDetails`;
    
    return fetch(url, requestOptions)
        .then(response => {
            // reject not ok response
            
            if (!response.ok) {
                // authenticationService.refreshToken()
                return Promise.reject(response)
            }
            return response.json() // or return response.text()
        })
        // catch error response and extract the error message
        .catch(async response => {
            const error = await response.text().then(text => text)
            return Promise.reject(error)
        })
        .then(result => {
            if (result.data !== null && result.data !== undefined && result.data.status === 1) {
                return result.data;
            } else {
                return result.data;
            }
        }).catch(error => {
            return [];
        });

}


async function editCardDetails(cardDetails) {
    const requestOptionsForStripe = {
        method: 'POST',
        headers: { 'Authorization': 'Bearer ' + STRIPE_SECRCT },
    };
    return fetch('https://api.stripe.com/v1/customers/' + cardDetails.customerId + '/sources/' + cardDetails.cardUniqueId + '?exp_month=' + cardDetails.cardExpiryMonth + '&exp_year=' + cardDetails.cardExpiryYear + '&name=' + cardDetails.nameOnCard, requestOptionsForStripe)
        .then(response => {
            // reject not ok response
            if (!response.ok) {
                return Promise.reject(response)
            }
            return response.json() // or return response.text()
        })
        // catch error response and extract the error message
        .catch(async response => {
            const error = await response.text().then(text => text)
            return Promise.reject(error)
        })
        .then(result => {
            const cardDetailsWithStripe = {
                "id": cardDetails.id,
                "guid" : cardDetails.guid,
                "cardToken": cardDetails.cardToken,
                "cardId": cardDetails.cardUniqueId,
                "customerId": cardDetails.customerId,
                "fingerprint": cardDetails.fingerprint,
                "isDefaultCard": cardDetails.isDefaultCard,
                "expiryMonth": cardDetails.cardExpiryMonth,
                "expiryYear": cardDetails.cardExpiryYear,
                "charityId": NGS_CHARITY_ID,
            };
            //console.log(cardDetails);
            const requestOptions = {
                method: 'POST',
                headers: authHeader(),
                body: JSON.stringify(cardDetailsWithStripe)
            };
            const url = BASE_URL + `/User/editCardDetails`;
            return fetch(url, requestOptions)
            .then(response => {
                // reject not ok response
                if (!response.ok) {
                    return Promise.reject(response)
                }
                return response.json() // or return response.text()
            })
            .then(result => {
                if (result.data !== null && result.data !== undefined && result.data.status === 1) {
                    return result.data;
                }
            }).catch(error => {
                return [];
            });
        }).catch(error => {
            return [];
        });
}

async function deleteCard(cardDetails) {
    
    const cardDetailsWithStripe = {
        "id": cardDetails.id,
        "cardId": cardDetails.cardId ?? "",
        "fingerprint": cardDetails.fingerprint ?? "",
        "customerId": cardDetails.customerId ?? "",
        "cardToken": cardDetails.cardToken ?? "",
        "isDefaultCard" : cardDetails.isDefaultCard,
        "guid": cardDetails.guid,
        "expiryMonth": cardDetails.expiryMonth,
        "expiryYear": cardDetails.expiryYear,
        "charityId": NGS_CHARITY_ID,
        "cardWPShopperId": cardDetails.cardWPShopperId,
        "cardHolderName": cardDetails.nameoncard ?? ""
    }
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(cardDetailsWithStripe)
    };
    const url =  BASE_URL + `/User/removeCard`;
    return fetch(url, requestOptions)
        .then(response => {
            
            if (!response.ok) {
           
                return Promise.reject(response)
            }
            return response.json() // or return response.text()
        })
        // catch error response and extract the error message
        .catch(async response => {
            const error = await response.text().then(text => text)
            return Promise.reject(error)
        })
        .then(result => {
            if (result.data !== null && result.data !== undefined && result.data.status === 1) {
                return result.data;
            } else {
                return result.data;
            }
        }).catch(error => {
            return [];
        });
                            
}

async function editCardWorldPayCard(cardDetails){

    const cardDetailsWorldPay = {
        "cardId": cardDetails.cardId ?? "",
        "fingerprint": cardDetails.fingerprint ?? "",
        "customerId": cardDetails.customerId ?? "",
        "cardToken": cardDetails.cardToken ?? "",
        "guid" : cardDetails.guid,
        "isDefaultCard": cardDetails.isDefaultCard,
        "expiryMonth": parseInt(cardDetails.cardExpiryMonth),
        "expiryYear": cardDetails.cardExpiryYear,
        "charityId": NGS_CHARITY_ID,
        "cardWPShopperId": cardDetails.cardWPShopperId,
        "cardHolderName": cardDetails.nameOnCard,
        "id": cardDetails.id
    }

    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(cardDetailsWorldPay)
    };

    const url =  BASE_URL + `/User/editCardDetails`;
    
    return fetch(url, requestOptions)
        .then(response => {
            // reject not ok response
            
            if (!response.ok) {
                // authenticationService.refreshToken()
                return Promise.reject(response)
            }
            return response.json() // or return response.text()
        })
        // catch error response and extract the error message
        .catch(async response => {
            const error = await response.text().then(text => text)
            return Promise.reject(error)
        })
        .then(result => {
            if (result.data !== null && result.data !== undefined && result.data.status === 1) {
                return result.data;
            } else {
                return result.data;
            }
        }).catch(error => {
            return [];
        });

}