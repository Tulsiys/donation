"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = GooglePayPayment;
require("core-js/modules/web.dom-collections.iterator.js");
require("core-js/modules/es.promise.js");
var _react = _interopRequireWildcard(require("react"));
var _reactStripeJs = require("@stripe/react-stripe-js");
var _StatusMessages = require("./StatusMessages");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function GooglePayPayment(props) {
  const stripe = (0, _reactStripeJs.useStripe)();
  const elements = (0, _reactStripeJs.useElements)();
  const [paymentRequest, setPaymentRequest] = (0, _react.useState)();
  const [messages, addMessage] = (0, _StatusMessages.useMessages)();
  (0, _react.useEffect)(() => {
    if (!stripe || !elements) {
      return;
    }
    const pr = stripe.paymentRequest({
      country: 'SG',
      currency: 'sgd',
      total: {
        label: 'Donation Amount',
        amount: props.donationAmount * 100
      },
      requestPayerName: true,
      requestPayerEmail: true,
      wallets: ['googlePay']
    });

    // Check the availability of the Payment Request API.
    pr.canMakePayment().then(result => {
      if (result) {
        setPaymentRequest(pr);
        let button = document.getElementById('payment-request-button');
        button.addEventListener('click', pr.show);
      } else {
        document.getElementById('gpaydiv').style.display = 'none';
      }
    });
    pr.on('token', async e => {
      if (e.token) {
        e.complete('success');
        props.sendCardToken(e.token.id, 2, '');
      } else {
        e.complete('fail');
      }
    });
  }, [stripe, elements, addMessage]);
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
    className: "btn btn-light g-pay",
    id: "gpaydiv"
  }, /*#__PURE__*/_react.default.createElement("button", {
    id: "payment-request-button",
    style: {
      backgroundImage: "url(/images/payment/g-pay.svg)",
      backgroundPosition: 'center',
      backgroundSize: '100%',
      backgroundRepeat: 'no-repeat',
      height: "35.75px",
      width: "70.73px"
    }
  })));
}
;