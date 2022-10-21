"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.performValidation = exports.performApplePayDebit = void 0;
require("core-js/modules/es.promise.js");
var _axios = _interopRequireDefault(require("axios"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const baseUrl = process.env.REACT_APP_API_URL;
const post = (path, data, errorMessage) => {
  return new Promise((resolve, reject) => {
    (0, _axios.default)({
      method: 'post',
      url: baseUrl + path,
      data: data,
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => {
      if (response.status === 200) {
        resolve(response.data);
      } else {
        reject(new Error(errorMessage));
      }
    }).catch(error => {
      console.log(error);
      reject(error);
    });
  });
};
const performValidation = (url, merchantIdentifier, displayName, domain) => {
  const data = {
    url: url,
    body: {
      merchantIdentifier: merchantIdentifier,
      displayName: displayName,
      initiative: "web",
      initiativeContext: domain
    }
  };
  return post('/session/create', data, 'Could not get session');
};
exports.performValidation = performValidation;
const performApplePayDebit = (amount, currency, payment_data) => {
  const data = {
    payment_data: payment_data,
    amount: amount,
    currency: currency
  };
  return post('/applepay/debit', data, 'Could not perform debit');
};
exports.performApplePayDebit = performApplePayDebit;