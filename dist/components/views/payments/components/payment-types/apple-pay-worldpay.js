"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ApplePayWorldpayNew;
require("core-js/modules/es.promise.js");
require("core-js/modules/es.json.stringify.js");
require("core-js/modules/web.dom-collections.iterator.js");
require("core-js/modules/es.symbol.description.js");
var _react = _interopRequireWildcard(require("react"));
var _braintreeWeb = require("braintree-web");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function ApplePayWorldpayNew(props) {
  function getApplePaySession(url) {
    return new Promise(function (resolve, reject) {
      var xhr = new XMLHttpRequest();
      xhr.open('POST', '/api/session/create');
      xhr.onload = function () {
        if (this.status >= 200 && this.status < 300) {
          resolve(JSON.parse(xhr.response));
        } else {
          reject({
            status: this.status,
            statusText: xhr.statusText
          });
        }
      };
      xhr.onerror = function () {
        reject({
          status: this.status,
          statusText: xhr.statusText
        });
      };
      xhr.setRequestHeader("Content-T ype", "application/json");
      xhr.send(JSON.stringify({
        validationUrl: url
      }));
    });
  }
  (0, _react.useEffect)(() => {
    var paymentRequest = _braintreeWeb.applePay.createPaymentRequest({
      countryCode: 'US',
      currencyCode: 'USD',
      supportedNetworks: ['visa', 'masterCard', 'amex', 'discover'],
      merchantCapabilities: ['supports3DS'],
      total: {
        label: 'Your Merchant Name',
        amount: props.donationAmount * 100
      }
    });
    // console.log('---->', JSON.stringify(paymentRequest));
    var session = new window.ApplePaySession(3, paymentRequest);
    console.log('-->', JSON.stringify(session));
    session.onvalidatemerchant = event => {
      const validationURL = event.ValidationURL;
      getApplePaySession(validationURL).then(function (response) {
        session.completeMerchantValidation(response);
      });
    };
    if (_braintreeWeb.ApplePaySession) {
      console.log('==> ' + JSON.stringify(_braintreeWeb.ApplePaySession));
      if (_braintreeWeb.ApplePaySession.canMakePayments) {
        showApplePayButton();
      }
    }
  }, []);
  function showApplePayButton() {
    HTMLCollection.prototype[Symbol.iterator] = Array.prototype[Symbol.iterator];
    const buttons = document.getElementsByClassName("apple-pay-button");
    for (let button of buttons) {
      button.className += " visible";
    }
  }
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
    class: "apple-pay"
  }, /*#__PURE__*/_react.default.createElement("h2", null, " Buy with Apple\xA0Pay "), /*#__PURE__*/_react.default.createElement("p", null, "Compatible browsers will display an Apple\xA0Pay button below."), /*#__PURE__*/_react.default.createElement("div", {
    class: "apple-pay-button",
    onclick: "applePayButtonClicked()"
  })));
}