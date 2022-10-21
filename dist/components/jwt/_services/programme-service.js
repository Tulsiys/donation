"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.programmeService = void 0;
require("core-js/modules/es.promise.js");
var _helpers = require("../_helpers");
var _constant = require("../../common/constant");
// import { BASE_URL } from "../../data/constants.js";

// const BASE_URL = process.env.BASE_URL;

const programmeService = {
  getPatronProgrammes
};

// async function getPatronProgrammes(pageNumber = 0, pageSize = 3)
exports.programmeService = programmeService;
async function getPatronProgrammes() {
  let pageNumber = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  let pageSize = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  const requestOptions = {
    method: 'POST',
    headers: (0, _helpers.authHeader)()
  };
  const url = _constant.BASE_URL + "/v1/Patron/getPatronProgrammes?charityId=" + _constant.NGS_CHARITY_ID + "&pageNumber=" + pageNumber + "&pageSize=" + pageSize;
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