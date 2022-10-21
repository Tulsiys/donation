"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/es.promise.js");
require("core-js/modules/web.dom-collections.iterator.js");
var _react = _interopRequireWildcard(require("react"));
var _reactCurrencyFormat = _interopRequireDefault(require("react-currency-format"));
var _reactRouterDom = require("react-router-dom");
var _common = require("../../../common/common");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const ImageLoader = /*#__PURE__*/(0, _react.lazy)(() => Promise.resolve().then(() => _interopRequireWildcard(require('../../../common/image-loader'))));
class DonationEReceipt extends _react.default.Component {
  render() {
    const _props = this.props;
    return /*#__PURE__*/_react.default.createElement("div", {
      className: "c-donation-e-receipt"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "c-img"
    }, /*#__PURE__*/_react.default.createElement(_react.Suspense, {
      fallback: null
    }, /*#__PURE__*/_react.default.createElement(ImageLoader, {
      type: "image",
      src: '/images/receipt.svg'
    }))), /*#__PURE__*/_react.default.createElement("h3", null, "Donor Enrolled & Donation e-Receipt sent to"), /*#__PURE__*/_react.default.createElement("div", {
      className: "user-details"
    }, /*#__PURE__*/_react.default.createElement("span", null, _props.data.userEmail), _common.Common.isValidField(_props.data.userMobile) ? /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, " & ", /*#__PURE__*/_react.default.createElement("span", null, _props.data.userMobile)) : ''), /*#__PURE__*/_react.default.createElement("p", null, "Thank you for your generosity. You will receive an email and sms with a web link to your donation receipt"), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
      to: "/",
      className: "btn btn-light"
    }, "GO TO HOME"));
  }
}
var _default = DonationEReceipt;
exports.default = _default;