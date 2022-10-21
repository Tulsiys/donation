"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.newCardService = void 0;
require("core-js/modules/es.promise.js");
require("core-js/modules/es.json.stringify.js");
require("core-js/modules/es.parse-int.js");
var _constant = require("../common/constant");
var _helpers = require("../jwt/_helpers");
var _authContext = require("../data/authContext");
const newCardService = {
  addNewCard,
  addNewWorldPayCard,
  editCardDetails,
  editCardWorldPayCard,
  deleteCard
};
exports.newCardService = newCardService;
async function addNewCard(cardDetails) {
  const requestOptionsForStripe = {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + _constant.STRIPE_SECRCT
    }
  };
  return fetch('https://api.stripe.com/v1/tokens?card[number]=' + cardDetails.cardNumber + '&card[exp_month]=' + cardDetails.cardExpiryMonth + '&card[exp_year]=' + cardDetails.cardExpiryYear + '&card[cvc]=' + cardDetails.cardCvcNumber + '&card[name]=' + cardDetails.nameOnCard, requestOptionsForStripe).then(response => {
    // reject not ok response

    if (!response.ok) {
      return Promise.reject(response);
    }
    return response.json(); // or return response.text()
  })
  // catch error response and extract the error message
  .catch(async response => {
    const error = await response.text().then(text => text);
    return Promise.reject(error);
  }).then(result => {
    if (result.card.length !== 0 && result.id !== '' && result.type === 'card') {
      return fetch('https://api.stripe.com/v1/customers?source=' + result.id, requestOptionsForStripe).then(response => {
        // reject not ok response
        if (!response.ok) {
          return Promise.reject(response);
        }
        return response.json(); // or return response.text()
      })
      // catch error response and extract the error message
      .catch(async response => {
        const error = await response.text().then(text => text);
        return Promise.reject(error);
      }).then(customerResult => {
        if (customerResult.id !== '') {
          const cardDetailsWithStripe = {
            "cardId": result.card.id,
            "fingerprint": result.card.fingerprint,
            "customerId": customerResult.id,
            "cardToken": result.id,
            "guid": cardDetails.guid,
            "isDefaultCard": cardDetails.isDefaultCard,
            "expiryMonth": cardDetails.cardExpiryMonth,
            "expiryYear": cardDetails.cardExpiryYear,
            "charityId": _constant.NGS_CHARITY_ID
          };
          const requestOptions = {
            method: 'POST',
            headers: (0, _helpers.authHeader)(),
            body: JSON.stringify(cardDetailsWithStripe)
          };
          const url = _constant.BASE_URL + "/User/addCardDetails";
          return fetch(url, requestOptions).then(response => {
            // reject not ok response

            if (!response.ok) {
              // authenticationService.refreshToken()
              return Promise.reject(response);
            }
            return response.json(); // or return response.text()
          })
          // catch error response and extract the error message
          .catch(async response => {
            const error = await response.text().then(text => text);
            return Promise.reject(error);
          }).then(result => {
            if (result.data !== null && result.data !== undefined && result.data.status === 1) {
              return result.data;
            } else {
              return result.data;
            }
          }).catch(error => {
            return [];
          });
        }
      }).catch(error => {
        return [];
      });
    }
  }).catch(error => {
    return [];
  });
}
async function addNewWorldPayCard(cardDetails) {
  var _cardDetails$cardId, _cardDetails$fingerpr, _cardDetails$customer, _cardDetails$cardToke;
  const cardDetailsWorldPay = {
    "cardId": (_cardDetails$cardId = cardDetails.cardId) !== null && _cardDetails$cardId !== void 0 ? _cardDetails$cardId : "",
    "fingerprint": (_cardDetails$fingerpr = cardDetails.fingerprint) !== null && _cardDetails$fingerpr !== void 0 ? _cardDetails$fingerpr : "",
    "customerId": (_cardDetails$customer = cardDetails.customerId) !== null && _cardDetails$customer !== void 0 ? _cardDetails$customer : "",
    "cardToken": (_cardDetails$cardToke = cardDetails.cardToken) !== null && _cardDetails$cardToke !== void 0 ? _cardDetails$cardToke : "",
    "guid": cardDetails.guid,
    "isDefaultCard": cardDetails.isDefaultCard,
    "expiryMonth": parseInt(cardDetails.cardExpiryMonth),
    "expiryYear": parseInt(cardDetails.cardExpiryYear),
    "charityId": _constant.NGS_CHARITY_ID,
    "cardWPEncryptedVal": cardDetails.cardWPEncryptedVal,
    "cardWPShopperId": cardDetails.cardWPShopperId,
    "cardHolderName": cardDetails.nameoncard
  };
  const requestOptions = {
    method: 'POST',
    headers: (0, _helpers.authHeader)(),
    body: JSON.stringify(cardDetailsWorldPay)
  };
  const url = _constant.BASE_URL + "/User/addCardDetails";
  return fetch(url, requestOptions).then(response => {
    // reject not ok response

    if (!response.ok) {
      // authenticationService.refreshToken()
      return Promise.reject(response);
    }
    return response.json(); // or return response.text()
  })
  // catch error response and extract the error message
  .catch(async response => {
    const error = await response.text().then(text => text);
    return Promise.reject(error);
  }).then(result => {
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
    headers: {
      'Authorization': 'Bearer ' + _constant.STRIPE_SECRCT
    }
  };
  return fetch('https://api.stripe.com/v1/customers/' + cardDetails.customerId + '/sources/' + cardDetails.cardUniqueId + '?exp_month=' + cardDetails.cardExpiryMonth + '&exp_year=' + cardDetails.cardExpiryYear + '&name=' + cardDetails.nameOnCard, requestOptionsForStripe).then(response => {
    // reject not ok response
    if (!response.ok) {
      return Promise.reject(response);
    }
    return response.json(); // or return response.text()
  })
  // catch error response and extract the error message
  .catch(async response => {
    const error = await response.text().then(text => text);
    return Promise.reject(error);
  }).then(result => {
    const cardDetailsWithStripe = {
      "id": cardDetails.id,
      "guid": cardDetails.guid,
      "cardToken": cardDetails.cardToken,
      "cardId": cardDetails.cardUniqueId,
      "customerId": cardDetails.customerId,
      "fingerprint": cardDetails.fingerprint,
      "isDefaultCard": cardDetails.isDefaultCard,
      "expiryMonth": cardDetails.cardExpiryMonth,
      "expiryYear": cardDetails.cardExpiryYear,
      "charityId": _constant.NGS_CHARITY_ID
    };
    //console.log(cardDetails);
    const requestOptions = {
      method: 'POST',
      headers: (0, _helpers.authHeader)(),
      body: JSON.stringify(cardDetailsWithStripe)
    };
    const url = _constant.BASE_URL + "/User/editCardDetails";
    return fetch(url, requestOptions).then(response => {
      // reject not ok response
      if (!response.ok) {
        return Promise.reject(response);
      }
      return response.json(); // or return response.text()
    }).then(result => {
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
  var _cardDetails$cardId2, _cardDetails$fingerpr2, _cardDetails$customer2, _cardDetails$cardToke2, _cardDetails$nameonca;
  const cardDetailsWithStripe = {
    "id": cardDetails.id,
    "cardId": (_cardDetails$cardId2 = cardDetails.cardId) !== null && _cardDetails$cardId2 !== void 0 ? _cardDetails$cardId2 : "",
    "fingerprint": (_cardDetails$fingerpr2 = cardDetails.fingerprint) !== null && _cardDetails$fingerpr2 !== void 0 ? _cardDetails$fingerpr2 : "",
    "customerId": (_cardDetails$customer2 = cardDetails.customerId) !== null && _cardDetails$customer2 !== void 0 ? _cardDetails$customer2 : "",
    "cardToken": (_cardDetails$cardToke2 = cardDetails.cardToken) !== null && _cardDetails$cardToke2 !== void 0 ? _cardDetails$cardToke2 : "",
    "isDefaultCard": cardDetails.isDefaultCard,
    "guid": cardDetails.guid,
    "expiryMonth": cardDetails.expiryMonth,
    "expiryYear": cardDetails.expiryYear,
    "charityId": _constant.NGS_CHARITY_ID,
    "cardWPShopperId": cardDetails.cardWPShopperId,
    "cardHolderName": (_cardDetails$nameonca = cardDetails.nameoncard) !== null && _cardDetails$nameonca !== void 0 ? _cardDetails$nameonca : ""
  };
  const requestOptions = {
    method: 'POST',
    headers: (0, _helpers.authHeader)(),
    body: JSON.stringify(cardDetailsWithStripe)
  };
  const url = _constant.BASE_URL + "/User/removeCard";
  return fetch(url, requestOptions).then(response => {
    if (!response.ok) {
      return Promise.reject(response);
    }
    return response.json(); // or return response.text()
  })
  // catch error response and extract the error message
  .catch(async response => {
    const error = await response.text().then(text => text);
    return Promise.reject(error);
  }).then(result => {
    if (result.data !== null && result.data !== undefined && result.data.status === 1) {
      return result.data;
    } else {
      return result.data;
    }
  }).catch(error => {
    return [];
  });
}
async function editCardWorldPayCard(cardDetails) {
  var _cardDetails$cardId3, _cardDetails$fingerpr3, _cardDetails$customer3, _cardDetails$cardToke3;
  const cardDetailsWorldPay = {
    "cardId": (_cardDetails$cardId3 = cardDetails.cardId) !== null && _cardDetails$cardId3 !== void 0 ? _cardDetails$cardId3 : "",
    "fingerprint": (_cardDetails$fingerpr3 = cardDetails.fingerprint) !== null && _cardDetails$fingerpr3 !== void 0 ? _cardDetails$fingerpr3 : "",
    "customerId": (_cardDetails$customer3 = cardDetails.customerId) !== null && _cardDetails$customer3 !== void 0 ? _cardDetails$customer3 : "",
    "cardToken": (_cardDetails$cardToke3 = cardDetails.cardToken) !== null && _cardDetails$cardToke3 !== void 0 ? _cardDetails$cardToke3 : "",
    "guid": cardDetails.guid,
    "isDefaultCard": cardDetails.isDefaultCard,
    "expiryMonth": parseInt(cardDetails.cardExpiryMonth),
    "expiryYear": cardDetails.cardExpiryYear,
    "charityId": _constant.NGS_CHARITY_ID,
    "cardWPShopperId": cardDetails.cardWPShopperId,
    "cardHolderName": cardDetails.nameOnCard,
    "id": cardDetails.id
  };
  const requestOptions = {
    method: 'POST',
    headers: (0, _helpers.authHeader)(),
    body: JSON.stringify(cardDetailsWorldPay)
  };
  const url = _constant.BASE_URL + "/User/editCardDetails";
  return fetch(url, requestOptions).then(response => {
    // reject not ok response

    if (!response.ok) {
      // authenticationService.refreshToken()
      return Promise.reject(response);
    }
    return response.json(); // or return response.text()
  })
  // catch error response and extract the error message
  .catch(async response => {
    const error = await response.text().then(text => text);
    return Promise.reject(error);
  }).then(result => {
    if (result.data !== null && result.data !== undefined && result.data.status === 1) {
      return result.data;
    } else {
      return result.data;
    }
  }).catch(error => {
    return [];
  });
}