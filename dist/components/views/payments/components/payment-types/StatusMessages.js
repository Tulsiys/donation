"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useMessages = exports.default = void 0;
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.string.replace.js");
require("core-js/modules/web.dom-collections.iterator.js");
var _react = _interopRequireWildcard(require("react"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
// A small set of helpers for displaying messages while in development.

// `StatusMessages` is a helper component for displaying messages while in
// development. This has no impact on your integration and can be deleted.
const StatusMessages = _ref => {
  let {
    messages
  } = _ref;
  return messages.length ? /*#__PURE__*/_react.default.createElement("div", {
    id: "messages",
    role: "alert"
  }, messages.map((m, i) => /*#__PURE__*/_react.default.createElement("div", {
    key: i
  }, maybeLink(m)))) : '';
};
const maybeLink = m => {
  const piDashboardBase = 'https://dashboard.stripe.com/test/payments';
  return /*#__PURE__*/_react.default.createElement("span", {
    dangerouslySetInnerHTML: {
      __html: m.replace(/(pi_(\S*)\b)/g, "<a href=\"".concat(piDashboardBase, "/$1\" target=\"_blank\">$1</a>"))
    }
  });
};

// Small hook for adding a message to a list of messages.
const useMessages = () => {
  // helper for displaying status messages.
  return (0, _react.useReducer)((messages, message) => {
    // Embed link
    return [...messages, message];
  }, []);
};
exports.useMessages = useMessages;
var _default = StatusMessages;
exports.default = _default;