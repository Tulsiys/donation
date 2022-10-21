"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.appeal = void 0;
require("core-js/modules/es.promise.js");
require("core-js/modules/es.json.stringify.js");
var _helpers = require("../_helpers");
var _constant = require("../../common/constant");
// const BASE_URL = process.env.BASE_URL;

const appeal = {
  getAppealList,
  getAppealDetails
};
exports.appeal = appeal;
async function getAppealList(payload) {
  const requestOptions = {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: (0, _helpers.authHeader)()
  };
  const url = _constant.BASE_URL + "/v1/Appeal/getAppealList";
  return fetch(url, requestOptions).then(_helpers.handleResponse).then(result => {
    if (result.data !== null && result.data !== undefined && result.data.status === 1) {
      return result.data;
    } else {
      return [];
    }
  }).catch(error => {
    return error;
  });
}
async function getAppealDetails(appealDetailsPayload) {
  const requestOptions = {
    method: 'POST',
    // body: JSON.stringify(appealData),
    headers: (0, _helpers.authHeader)()
  };
  const url = _constant.BASE_URL + "/v1/Appeal/getAppealDetails?id=".concat(appealDetailsPayload.appealId, "&charityId=").concat(appealDetailsPayload.charityId);
  return fetch(url, requestOptions).then(_helpers.handleResponse).then(result => {
    return result.data;
  }).catch(error => {
    return error;
  });
}