"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/es.promise.js");
require("core-js/modules/web.dom-collections.iterator.js");
var _react = _interopRequireWildcard(require("react"));
var _donationWidgetPatronPopup = _interopRequireDefault(require("../../../section/donation/donation-widget-patron-popup"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const ImageLoader = /*#__PURE__*/(0, _react.lazy)(() => Promise.resolve().then(() => _interopRequireWildcard(require('../../../common/image-loader'))));
class DonationWidgetPopup3 extends _react.default.Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    document.body.style.overflow = 'hidden';
  }
  componentWillUnmount() {
    document.body.style.overflow = 'hidden auto';
  }
  render() {
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
      className: "popup"
    }, /*#__PURE__*/_react.default.createElement(_donationWidgetPatronPopup.default, {
      note: this.props.note,
      isUpdate: true,
      updateDonationAmount: this.props.updateDonationAmount,
      close: this.props.close,
      getPatronOffers: this.props.getPatronOffers,
      donationWidgetData: this.props.donationWidgetData
    })), /*#__PURE__*/_react.default.createElement("div", {
      className: "popup-backdrop"
    }));
  }
}
var _default = DonationWidgetPopup3;
exports.default = _default;