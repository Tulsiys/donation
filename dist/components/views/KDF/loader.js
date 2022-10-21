"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class Loader extends _react.default.Component {
  render() {
    return /*#__PURE__*/_react.default.createElement("div", {
      className: "site-loader loader"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "dot dot1"
    }), /*#__PURE__*/_react.default.createElement("div", {
      className: "dot dot2"
    }), /*#__PURE__*/_react.default.createElement("div", {
      className: "dot dot3"
    }), /*#__PURE__*/_react.default.createElement("div", {
      className: "dot dot4"
    }));
  }
}
var _default = Loader;
exports.default = _default;