"use strict";

require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/es.promise.js");
require("core-js/modules/es.json.stringify.js");
var _reactRouterDom = require("react-router-dom");
var _react = _interopRequireWildcard(require("react"));
var _reactStripeJs = require("@stripe/react-stripe-js");
var _imageLoader = _interopRequireDefault(require("../../../../common/image-loader"));
var _cardService = require("../../../../service/cardService");
var _authContext = require("../../../../data/authContext");
var _context = require("../../../../data/context");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const GrabPay = props => {
  const stripe = (0, _reactStripeJs.useStripe)();
  const handleGrabPay = async e => {
    localStorage.setItem('amount', props.grabDonatepayload.amount);
    localStorage.setItem('grbobj', JSON.stringify(props.grabDonatepayload));
    let page = localStorage.getItem("CurrPage");
    let context = localStorage.getItem('context');
    if (page === null) {
      localStorage.setItem("CurrPage", [_context.PaymentContext.donationMethod]);
    }
    if (context === null) {
      localStorage.setItem("context", JSON.stringify(_context.PaymentContext === null || _context.PaymentContext === void 0 ? void 0 : _context.PaymentContext[_context.PaymentContext.donationMethod]));
    }
    // handle patron specific case
    if (page === 'patron' && context !== null) {
      localStorage.setItem("context", JSON.stringify(_context.PaymentContext.patron));
    }
    props.showGrabPayProcessingDialog('');
    _cardService.cardService.donateNowGrabPayment(props.grabDonatepayload).then(response => {
      if (response.status == 1) {
        localStorage.setItem("isGrabPay", true);
        localStorage.setItem("txnNo", response.txnNo);
        localStorage.setItem("paymentIntentId", response.paymentIntentId);
        setAuthContextData();
        // Confirm payment intent on the client
        if (response.clientSecret !== '') {
          props.hideGrabPayProcessingDialog('');
          const {
            error: stripeError,
            paymentIntent
          } = stripe.confirmGrabPayPayment(response.clientSecret, {
            return_url: props.redirectPage
          });
        }
      } else {
        props.showTransactionFailedDialog('');
      }
    });
  };
  function setAuthContextData() {
    if (localStorage.getItem("isAuthenticated") === 'true') {
      localStorage.setItem('guid', _authContext.authContext.guid);
      localStorage.setItem('userName', _authContext.authContext.userName);
      localStorage.setItem('userEmail', _authContext.authContext.userEmail);
    } else {
      localStorage.setItem('guid', '');
      localStorage.setItem('userName', '');
      localStorage.setItem('userEmail', '');
    }
  }
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("button", {
    type: "button",
    id: "grabpay-button",
    className: "btn btn-light btn-grabpay",
    onClick: handleGrabPay
  }, /*#__PURE__*/_react.default.createElement(_react.Suspense, {
    fallback: null
  }, /*#__PURE__*/_react.default.createElement(_imageLoader.default, {
    type: "image",
    src: "/images/cards/grab-pay.svg"
  }))));
};
var _default = (0, _reactRouterDom.withRouter)(GrabPay);
exports.default = _default;