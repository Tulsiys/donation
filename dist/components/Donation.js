"use strict";

require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactRouterDom = require("react-router-dom");
var _context = require("./data/context");
var _context2 = require("./context");
var _homePageService = require("./jwt/_services/home-page-service");
require("./assets/css/style.css");
var _amazonCognitoIdentityJs = require("amazon-cognito-identity-js");
var _common = require("./common");
var _authAws = _interopRequireDefault(require("./aws-pool/auth-aws"));
var _loader = _interopRequireDefault(require("./views/KDF/loader"));
var _donationWidget = _interopRequireDefault(require("./section/donation/donation-widget"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
class Donation extends _react.default.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDataLoaded: true,
      settingsData: [],
      isAuthorised: false
    };
  }
  getHomePageData() {
    _homePageService.homePageService.getHomePageSettings().then(response => {
      if (response) {
        response.PaymentContext = _context.PaymentContext;
        this.setState({
          settingsData: response !== null && response !== void 0 ? response : [],
          isDataLoaded: true
        });
      } else {
        this.setState({
          isOnline: false,
          isDataLoading: true,
          settingsData: []
        });
      }
    });
  }

  //isLoadHomePage allow to load homepage data boolian flag
  getAuthorisedHomePage(isLoadHomePage) {
    const user = new _amazonCognitoIdentityJs.CognitoUser({
      Username: _common.USER_NAME_AWS_COGNITO,
      Pool: _authAws.default
    });
    const authDetails = new _amazonCognitoIdentityJs.AuthenticationDetails({
      Username: _common.USER_NAME_AWS_COGNITO,
      Password: _common.PASSWORD_AWS_COGNITO
    });
    user.authenticateUser(authDetails, {
      onSuccess: data => {
        this.getHomePageData();
        this.setState({
          isAuthorised: true
        });
      }
    });
  }
  componentDidMount() {
    this.getAuthorisedHomePage(true);
  }
  render() {
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_context2.ContextProvider, {
      value: this.state.settingsData
    }, /*#__PURE__*/_react.default.createElement(_reactRouterDom.BrowserRouter, null, /*#__PURE__*/_react.default.createElement(_react.Suspense, {
      fallback: /*#__PURE__*/_react.default.createElement(_loader.default, null)
    }, /*#__PURE__*/_react.default.createElement(_reactRouterDom.Route, {
      path: "/",
      component: () => /*#__PURE__*/_react.default.createElement(_donationWidget.default, {
        name: this.props
      })
    })))));
  }
}
var _default = Donation;
exports.default = _default;