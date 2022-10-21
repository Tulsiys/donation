"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.paymentRequestApi = exports.merchantIdentifier = exports.merchantDisplay = exports.APPLE_PAY_VERSION_NUMBER = void 0;
const merchantIdentifier = process.env.REACT_APP_MERCHANT_ID;
exports.merchantIdentifier = merchantIdentifier;
const merchantDisplay = process.env.REACT_APP_MERCHANT_DISPLAY;
exports.merchantDisplay = merchantDisplay;
const paymentRequestApi = process.env.REACT_APP_PAYMENT_REQUEST_API === "yes";
exports.paymentRequestApi = paymentRequestApi;
const APPLE_PAY_VERSION_NUMBER = 3;
exports.APPLE_PAY_VERSION_NUMBER = APPLE_PAY_VERSION_NUMBER;