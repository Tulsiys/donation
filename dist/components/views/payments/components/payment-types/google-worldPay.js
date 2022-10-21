"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = GoogleWorldPay;
require("core-js/modules/web.dom-collections.iterator.js");
require("core-js/modules/es.regexp.to-string.js");
var _react = _interopRequireWildcard(require("react"));
var _constant = require("../../../../common/constant");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
const baseCardPaymentMethod = {
  type: "CARD",
  parameters: {
    allowedCardNetworks: ["VISA", "MASTERCARD"],
    allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
    billingAddressRequired: true,
    billingAddressParameters: {
      format: "FULL",
      phoneNumberRequired: true
    }
  }
};
const googlePayBaseConfiguration = {
  apiVersion: 2,
  apiVersionMinor: 0,
  allowedPaymentMethods: [baseCardPaymentMethod]
};
function GoogleWorldPay(props) {
  const {
    googlePayClient
  } = window;
  const [gPayBtn, setGPayBtn] = (0, _react.useState)(null);
  const [loaded, setLoaded] = (0, _react.useState)(false);
  function onGooglePayLoaded() {
    const google = window.google;
    window.googlePayClient = new google.payments.api.PaymentsClient({
      environment: "TEST"
    });
  }
  function createAndAddButton() {
    if (googlePayClient) {
      const googlePayButton = googlePayClient.createButton({
        buttonColor: "white",
        buttonType: "short",
        className: "",
        onClick: processPayment
      });
      setGPayBtn(googlePayButton);
    }
  }
  function processPayment() {
    const tokenizationSpecification = {
      type: "PAYMENT_GATEWAY",
      parameters: {
        gateway: 'worldpay',
        gatewayMerchantId: /*props.isRecurring ? GPAY_RECSGD :*/props.donationAmount.toString() > _constant.DONATION_AMOUNT ? _constant.GPAY_3DSGD : _constant.GPAY_NO3DSGD
      }
    };
    const cardPaymentMethod = {
      type: "CARD",
      tokenizationSpecification: tokenizationSpecification,
      parameters: {
        allowedCardNetworks: ["VISA", "MASTERCARD"],
        allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"]
      }
    };
    const transactionInfo = {
      totalPriceStatus: "FINAL",
      // totalPrice: "123.45",
      totalPrice: props.donationAmount.toString(),
      currencyCode: "SGD"
    };
    const merchantInfo = {
      // merchantId: '01234567890123456789', Only in PRODUCTION
      merchantName: "Example Merchant Name"
    };
    const paymentDataRequest = _objectSpread(_objectSpread({}, googlePayBaseConfiguration), {
      allowedPaymentMethods: [cardPaymentMethod],
      transactionInfo,
      merchantInfo
    });
    googlePayClient.loadPaymentData(paymentDataRequest).then(function (response) {
      // let token = JSON.parse(response.paymentMethodData.tokenizationData.token).id
      let googlePayData = JSON.parse(response.paymentMethodData.tokenizationData.token);
      props.sendCardToken(googlePayData, 2, '', 1);
    });
  }
  (0, _react.useEffect)(() => {
    const script = document.createElement('script');
    document.body.appendChild(script);
    script.onload = function () {
      onGooglePayLoaded();
    };
    script.src = "https://pay.google.com/gp/p/js/pay.js";
    script.addEventListener('load', () => setLoaded(true));
    script.async = true;
    return () => {
      document.body.removeChild(script);
    };
  }, []);
  (0, _react.useEffect)(() => {
    if (!loaded) return;
    createButton();
  }, [loaded]);
  function createButton() {
    googlePayClient.isReadyToPay(googlePayBaseConfiguration).then(function (response) {
      if (response.result) {
        createAndAddButton();
      } else {
        alert("Unable to pay using Google Pay");
      }
    }).catch(function (err) {
      console.error("Error determining readiness to use Google Pay: ", err);
    });
  }
  return (
    /*#__PURE__*/
    /* <div className="App"> */
    _react.default.createElement("div", {
      className: "btn btn-light g-pay",
      style: {
        background: '#ffffff url(/images/payment/g-pay.svg) center center no-repeat!important'
      },
      onClick: processPayment,
      dangerouslySetInnerHTML: {
        __html: gPayBtn && gPayBtn.innerHTML
      }
    })
    /* </div>*/
  );
}