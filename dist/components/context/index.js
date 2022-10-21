"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.ContextProvider = exports.ContetxtConsumer = void 0;
var _react = _interopRequireDefault(require("react"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const PageContext = /*#__PURE__*/_react.default.createContext();
const ContextProvider = PageContext.Provider;
exports.ContextProvider = ContextProvider;
const ContetxtConsumer = PageContext.Consumer;
exports.ContetxtConsumer = ContetxtConsumer;
var _default = PageContext;
exports.default = _default;