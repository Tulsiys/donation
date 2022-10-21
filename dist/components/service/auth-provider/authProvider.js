"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactRouterDom = require("react-router-dom");
var _auth0React = require("@auth0/auth0-react");
var _constant = require("../../common/constant");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// src/auth/auth0-provider-with-history.js

const AuthProvider = _ref => {
  let {
    children
  } = _ref;
  const domain = _constant.REACT_APP_AUTH0_DOMAIN;
  const clientId = _constant.REACT_APP_AUTH0_CLIENT_ID;

  // const domain = "test-business.us.auth0.com";  
  // const clientId = "7580LbTiCevcCavFsfux90TlYtZKprnX";

  const history = (0, _reactRouterDom.useHistory)();
  const onRedirectCallback = appState => {
    // console.log(appState, "app");
    // history.push(appState?.returnTo || window.location.pathname);
    history.push((appState === null || appState === void 0 ? void 0 : appState.returnTo) || window.location.pathname);
  };
  return /*#__PURE__*/_react.default.createElement(_auth0React.Auth0Provider, {
    domain: domain,
    clientId: clientId,
    redirectUri: window.location.origin,
    buildLogoutUrl: window.location.origin,
    onRedirectCallback: onRedirectCallback
  }, children);
};
var _default = AuthProvider;
exports.default = _default;