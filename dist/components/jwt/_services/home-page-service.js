"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.homePageService = void 0;
require("core-js/modules/es.promise.js");
var _helpers = require("../_helpers");
var _constant = require("../../common/constant");
var _authContext = require("../../data/authContext");
const homePageService = {
  getHomePageSettings,
  getDonationWidgetData,
  getDonorWallData,
  getPayPartners
};
exports.homePageService = homePageService;
const header = {
  "givepls_token": _authContext.authContext.IdToken,
  "Content-Type": "application/json"
};
async function getHomePageSettings() {
  const requestOptions = {
    method: 'POST',
    headers: header
  };
  const url = _constant.BASE_URL + "/v1/Home/homePageConfiguration?charityId=" + _constant.NGS_CHARITY_ID;
  return fetch(url, requestOptions).then(_helpers.handleResponse).then(result => {
    if (result.data !== null && result.data !== undefined && result.data.status === 1) {
      return result.data;
    } else {
      return false;
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
  const url = _constant.BASE_URL + "/v1/Donation/donationWidget?charityId=" + _constant.NGS_CHARITY_ID + "&appealId=" + appealId;
  return fetch(url, requestOptions).then(_helpers.handleResponse).then(result => {
    console.log('donation widget data', result);
    return result.data;
  }).catch(error => {
    return {
      status: 0
    };
  });
}
async function getDonorWallData(pageNo, pageSize) {
  const requestOptions = {
    method: 'POST',
    headers: header
  };
  const url = _constant.BASE_URL + "/v1/Donation/donorWall?charityId=" + _constant.NGS_CHARITY_ID + "&pageNumber=" + pageNo + "&pageSize=" + pageSize;
  return fetch(url, requestOptions).then(_helpers.handleResponse).then(result => {
    if (result.data !== null && result.data !== undefined && result.data.status === 1) {
      return result.data;
    } else {
      return [];
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
  const url = _constant.BASE_URL + "/v1/Donation/getPayPartners?charityId=" + charityId;
  return fetch(url, requestOptions).then(_helpers.handleResponse).then(result => {
    if (result.data !== null && result.data !== undefined && result.data.status === 1) {
      return result.data;
    } else {
      return [];
    }
  }).catch(error => {
    return [];
  });
}