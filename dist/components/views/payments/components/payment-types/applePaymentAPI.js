"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "PaymentStatus", {
  enumerable: true,
  get: function get() {
    return _constant.PaymentStatus;
  }
});
exports.performPayment = exports.isApplePayAvailable = void 0;
var _applePayJsHandler = require("./applePayJsHandler");
var _applePayHandler = require("./applePayHandler");
var _appleWorldPayConfig = require("./appleWorldPayConfig");
var _constant = require("../../../../common/constant");
console.log("Using ".concat(_appleWorldPayConfig.paymentRequestApi ? "Payment Request" : "Apple Pay JS", " API!"));
const isApplePayAvailable = () => {
  return _appleWorldPayConfig.paymentRequestApi ? (0, _applePayHandler.isPaymentRequestAvailable)() : (0, _applePayJsHandler.isApplePayJsAvailable)();
};
exports.isApplePayAvailable = isApplePayAvailable;
const performPayment = (currencyCode, items, label, amount) => {
  return _appleWorldPayConfig.paymentRequestApi ? (0, _applePayHandler.performApplePayPayment)(currencyCode, items, label, amount) : (0, _applePayJsHandler.performApplePayPayment)(currencyCode, items, label, amount);
};
exports.performPayment = performPayment;