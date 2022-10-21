"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
require("./css/donation-offer.css");
var _common = require("../../common");
var _reactRouterDom = require("react-router-dom");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class DonationOfferStyle1 extends _react.default.Component {
  constructor(props) {
    var _this$props$associate;
    super(props);
    this.state = {
      associateAmount: (_this$props$associate = this.props.associateAmount) !== null && _this$props$associate !== void 0 ? _this$props$associate : 0
    };
    this.onClickProgramDetails = this.onClickProgramDetails.bind(this);
  }
  onClickProgramDetails() {
    this.props.history.push({
      pathname: '/patrons',
      state: {
        selectedPatronId: this.props.patronId
      }
    });
  }
  render() {
    return /*#__PURE__*/_react.default.createElement("div", {
      className: "donation-offer"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "offer"
    }, this.props.patronNewOfferName !== this.props.patronNextOfferName && this.props.associateAmount < this.props.minAmount ? /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, " Donate ", /*#__PURE__*/_react.default.createElement("span", null, (0, _common.commaSeperatedAmount)(_common.CURRENCY_SYMBOL, this.props.diffAmount)), " more", /*#__PURE__*/_react.default.createElement("br", null), "and you will be eligible for ") :
    /*#__PURE__*/
    // <> Great! You are now eligible <br /> for {this.props.patronNewOfferName} Patron Program </>
    _react.default.createElement(_react.default.Fragment, null, " Great! You are now eligible for ")), /*#__PURE__*/_react.default.createElement("div", {
      className: "offer-box"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "c-head"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "head"
    }, this.props.patronNewOfferName), /*#__PURE__*/_react.default.createElement("div", {
      className: "program"
    }, "Patron Programme")), /*#__PURE__*/_react.default.createElement("button", {
      className: "btn btn-light",
      onClick: this.onClickProgramDetails
    }, "Learn More")), /*#__PURE__*/_react.default.createElement("div", {
      className: "offer new"
    }, this.props.associateAmount < this.props.minAmount || this.props.patronNewOfferName === this.props.patronNextOfferName ? "" : /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, " Donate ", /*#__PURE__*/_react.default.createElement("span", null, (0, _common.commaSeperatedAmount)(_common.CURRENCY_SYMBOL, this.props.newDiffAmount), " "), "more", /*#__PURE__*/_react.default.createElement("br", null), "and you will be eligible for ", /*#__PURE__*/_react.default.createElement("span", null, this.props.patronNextOfferName), " Patron Program ")));
  }
}
var _default = (0, _reactRouterDom.withRouter)(DonationOfferStyle1);
exports.default = _default;