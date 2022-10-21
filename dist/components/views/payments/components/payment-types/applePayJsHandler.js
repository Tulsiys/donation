"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.performApplePayPayment = exports.isApplePayJsAvailable = void 0;
require("core-js/modules/es.promise.js");
require("core-js/modules/es.json.stringify.js");
var _ApplePayRestClient = require("./ApplePayRestClient");
var _appleWorldPayConfig = require("./appleWorldPayConfig");
var _constant = require("../../../../common/constant");
const existsApplePayJsApi = () => {
  return new Promise((resolve, reject) => {
    try {
      const enabled = window.ApplePaySession && window.ApplePaySession.canMakePayments();
      resolve(enabled);
    } catch (err) {
      reject(err);
    }
  });
};
const isApplePayJsAvailable = () => {
  return existsApplePayJsApi().then(() => {
    return window.ApplePaySession.canMakePaymentsWithActiveCard(_appleWorldPayConfig.merchantIdentifier);
  });
};
exports.isApplePayJsAvailable = isApplePayJsAvailable;
const getPaymentRequest = (currencyCode, items, label, amount) => {
  return {
    currencyCode: currencyCode,
    countryCode: 'FI',
    //requiredShippingContactFields: ['name', 'email', 'phone'],
    lineItems: items,
    total: {
      label: label,
      amount: amount
    },
    supportedNetworks: ['masterCard', 'visa'],
    merchantCapabilities: ['supports3DS', 'supportsCredit', 'supportsDebit']
  };
};
const getOnValidateMerchant = (resolve, reject, session) => {
  return event => {
    (0, _ApplePayRestClient.performValidation)(event.validationURL, _appleWorldPayConfig.merchantIdentifier, _appleWorldPayConfig.merchantDisplay, window.location.hostname).then(response => {
      session.completeMerchantValidation(response);
    }).catch(err => {
      console.log("Validate error ", JSON.stringify(err));
      session.abort();
    });
  };
};
const getOnPaymentAuthorized = (resolve, reject, session, currencyCode, amount) => {
  return event => {
    // amount must be provided in cents
    (0, _ApplePayRestClient.performApplePayDebit)(amount * 100, currencyCode, event.payment.token.paymentData).then(response => {
      if (response.code === 100) {
        session.completePayment(window.ApplePaySession.STATUS_SUCCESS);
        resolve(_constant.PaymentStatus.SUCCESS);
      } else {
        console.log("Payment error in response ", JSON.stringify(response));
        session.completePayment(window.ApplePaySession.STATUS_FAILURE);
        resolve(_constant.PaymentStatus.FAILURE);
      }
    }).catch(err => {
      console.log("Payment error ", JSON.stringify(err));
      session.completePayment(window.ApplePaySession.STATUS_FAILURE);
      reject(err);
    });
  };
};
const getOnCancel = (resolve, reject, session) => {
  return event => {
    console.log("Session cancelled!!!");
    resolve(_constant.PaymentStatus.CANCEL);
  };
};
const performApplePayPayment = (currencyCode, items, label, amount) => {
  return new Promise((resolve, reject) => {
    const session = new window.ApplePaySession(_appleWorldPayConfig.APPLE_PAY_VERSION_NUMBER, getPaymentRequest(currencyCode, items, label, amount));
    session.onvalidatemerchant = getOnValidateMerchant(resolve, reject, session);
    session.onpaymentauthorized = getOnPaymentAuthorized(resolve, reject, session, currencyCode, amount);
    session.oncancel = getOnCancel(resolve, reject, session);
    session.begin();
  });
};
exports.performApplePayPayment = performApplePayPayment;