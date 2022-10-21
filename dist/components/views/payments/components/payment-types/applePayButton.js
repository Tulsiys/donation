"use strict";

require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _applePaymentAPI = require("./applePaymentAPI");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const ApplePayButtonStatus = {
  UNKNOWN: 0,
  AVAILABLE: 1,
  NOT_AVAILABLE: 2
};
class ApplePayButton extends _react.Component {
  constructor(props) {
    super(props);
    this.state = {
      applePayButtonStatus: ApplePayButtonStatus.UNKNOWN
    };
  }
  componentWillMount() {
    (0, _applePaymentAPI.isApplePayAvailable)().then(canMakePayments => {
      console.log('Apple Pay Button status');
      this.setState({
        applePayButtonStatus: canMakePayments ? ApplePayButtonStatus.AVAILABLE : ApplePayButtonStatus.NOT_AVAILABLE
      });
    }).catch(err => {
      console.log(err);
      this.setState({
        applePayButtonStatus: ApplePayButtonStatus.NOT_AVAILABLE
      });
    });
  }
  render() {
    let getButton = () => {
      switch (this.state.applePayButtonStatus) {
        case ApplePayButtonStatus.UNKNOWN:
          return /*#__PURE__*/_react.default.createElement("div", {
            className: "text-muted text-center"
          }, " Checking Apple Pay... ");
        case ApplePayButtonStatus.AVAILABLE:
          return /*#__PURE__*/_react.default.createElement("div", {
            className: "text-center"
          }, /*#__PURE__*/_react.default.createElement("div", {
            className: "apple-pay-button apple-pay-button-black",
            id: "apple-pay",
            onClick: this.props.onClick
          }));
        case ApplePayButtonStatus.NOT_AVAILABLE:
          return /*#__PURE__*/_react.default.createElement("div", {
            className: "text-muted text-center",
            id: "apple-pay-activation"
          }, "Apple Pay inactive on your device.");
        default:
          return /*#__PURE__*/_react.default.createElement("div", null, " Invalid status!!! ");
      }
    };
    return /*#__PURE__*/_react.default.createElement("div", {
      className: "row",
      id: "apple-pay-row"
    }, getButton());
  }
}
ApplePayButton.propTypes = {
  merchantIdentifier: _propTypes.default.string.isRequired,
  onClick: _propTypes.default.func.isRequired
};
var _default = ApplePayButton;
exports.default = _default;