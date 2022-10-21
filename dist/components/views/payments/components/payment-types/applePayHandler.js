"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.performApplePayPayment = exports.isPaymentRequestAvailable = void 0;
require("core-js/modules/es.promise.js");
require("core-js/modules/es.json.stringify.js");
var _ApplePayRestClient = require("./ApplePayRestClient");
var _appleWorldPayConfig = require("./appleWorldPayConfig");
var _constant = require("../../../../common/constant");
const isPaymentRequestAvailable = () => {
  return new Promise((resolve, reject) => {
    try {
      const enabled = window.PaymentRequest ? true : false;
      resolve(enabled);
    } catch (err) {
      reject(err);
    }
  });
};
exports.isPaymentRequestAvailable = isPaymentRequestAvailable;
const getPaymentDetails = (currencyCode, items, label, amount) => {
  return {
    // displayItems: items.map((item) => {
    //     return { 
    //         label: item.label,
    //         amount: { 
    //             value: `${Number(item.amount).toFixed(2)}`,
    //             currency: currencyCode
    //         }
    //     }
    // }),
    total: {
      label: 'Donation Amount',
      amount: {
        value: (void 0).props.donationAmount * 100,
        currency: 'SGD'
      }
    }
  };
};
const applePayMethod = {
  supportedMethods: "https://apple.com/apple-pay",
  data: {
    version: _appleWorldPayConfig.APPLE_PAY_VERSION_NUMBER,
    merchantIdentifier: _appleWorldPayConfig.merchantIdentifier,
    merchantCapabilities: ["supports3DS", "supportsCredit", "supportsDebit"],
    supportedNetworks: ["masterCard", "visa"],
    countryCode: "SG"
  }
};
const paymentOptions = {
  requestPayerName: false,
  requestPayerEmail: false,
  requestPayerPhone: false,
  requestShipping: false,
  shippingType: "shipping"
};
const paymentRequestValidateMerchant = event => {
  const sessionPromise = (0, _ApplePayRestClient.performValidation)(event.validationURL, _appleWorldPayConfig.merchantIdentifier, _appleWorldPayConfig.merchantDisplay, window.location.hostname);
  event.complete(sessionPromise);
};
const paymentRequestComplete = (resolve, reject, instrument, isError) => {
  const resolveStatus = !isError ? _constant.PaymentStatus.SUCCESS : _constant.PaymentStatus.FAILURE;
  const completeStatus = !isError ? "success" : "failure";
  instrument.complete(completeStatus).then(() => {
    resolve(resolveStatus);
  }).catch(err => {
    console.log("Complete error:", err);
    reject(err);
  });
};
const paymentRequestPerformPayment = (resolve, reject, showPromise, currencyCode, amount) => {
  showPromise.then(instrument => {
    // amount must be provided in cents
    (0, _ApplePayRestClient.performApplePayDebit)(amount * 100, currencyCode, instrument.details.token.paymentData).then(response => {
      if (response.code === 100) {
        console.log("Payment done!");
        paymentRequestComplete(resolve, reject, instrument);
      } else {
        console.log("Payment error in response ", JSON.stringify(response));
        paymentRequestComplete(resolve, reject, instrument, true);
      }
    }).catch(err => {
      console.log("Payment error ", JSON.stringify(err));
      paymentRequestComplete(resolve, reject, instrument, true);
    });
  }, failure => {
    resolve(failure.name === 'AbortError' ? _constant.PaymentStatus.CANCEL : _constant.PaymentStatus.FAILURE);
  });
};
const performApplePayPayment = (currencyCode, items, label, amount) => {
  return new Promise((resolve, reject) => {
    try {
      const paymentDetails = getPaymentDetails(currencyCode, items, label, amount);
      const paymentRequest = new window.PaymentRequest([applePayMethod], paymentDetails, paymentOptions);
      paymentRequest.onmerchantvalidation = paymentRequestValidateMerchant;
      const showPromise = paymentRequest.show();
      paymentRequestPerformPayment(resolve, reject, showPromise, currencyCode, amount);
    } catch (err) {
      reject(err);
    }
  });
};
exports.performApplePayPayment = performApplePayPayment;