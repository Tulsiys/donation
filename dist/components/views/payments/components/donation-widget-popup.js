"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _donationWidgetStyle = _interopRequireDefault(require("../../../section/donation/donation-widget-style-2"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class DonationWidgetPopup extends _react.default.Component {
  componentWillMount() {
    document.body.style.overflow = 'hidden';
  }
  componentWillUnmount() {
    document.body.style.overflow = 'hidden auto';
  }
  render() {
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
      className: "popup"
    }, /*#__PURE__*/_react.default.createElement(_donationWidgetStyle.default, {
      updateDonationAmount: this.props.updateDonationAmount,
      close: this.props.close,
      isNavigate: '/campaigns/payments',
      donationWidgetData: this.props.donationWidgetData,
      getPatronOffers: this.props.getPatronOffers,
      isUpdate: true
    })), /*#__PURE__*/_react.default.createElement("div", {
      className: "popup-backdrop"
    }));
  }
}
var _default = DonationWidgetPopup;
exports.default = _default;