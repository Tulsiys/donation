"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.profileService = void 0;
require("core-js/modules/es.promise.js");
require("core-js/modules/es.json.stringify.js");
var _helpers = require("../jwt/_helpers");
var _constant = require("../common/constant");
const profileService = {
  getUserData,
  getCardData,
  getCardDetails,
  transactionListing
};
exports.profileService = profileService;
async function getUserData(userDetails) {
  const requestOptions = {
    method: 'POST',
    headers: (0, _helpers.authHeader)(),
    body: JSON.stringify(userDetails)
  };
  const url = _constant.BASE_URL + "/User/getSignInUserDetails";
  return fetch(url, requestOptions).then(_helpers.handleResponse).then(result => {
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
    headers: (0, _helpers.authHeader)()
  };
  const url = _constant.BASE_URL + "/User/getUserStripeToken?Guid=" + guid;
  return fetch(url, requestOptionsForStripe).then(_helpers.handleResponse).then(result => {
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
    headers: {
      'Authorization': 'Bearer ' + _constant.STRIPE_SECRCT
    }
  };
  return fetch('https://api.stripe.com/v1/customers/' + customerId + '/sources/' + cardId, requestOptionsForStripe).then(_helpers.handleResponse).then(result => {
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
    charityId: _constant.NGS_CHARITY_ID,
    pageNumber: 1
  };
  const requestOptions = {
    method: 'POST',
    headers: (0, _helpers.authHeader)(),
    body: JSON.stringify(data)
  };
  const url = _constant.BASE_URL + "/v1/Donation/getUserTransactions";
  return fetch(url, requestOptions).then(_helpers.handleResponse).then(result => {
    if (result.data !== null && result.data !== undefined && result.data.status === 1) {
      return result;
    }
  }).catch(error => {
    return [];
  });
}