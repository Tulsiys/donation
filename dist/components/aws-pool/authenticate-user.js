"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _amazonCognitoIdentityJs = require("amazon-cognito-identity-js");
var _react = require("react");
var _common = require("../common");
var _authAws = _interopRequireDefault(require("./auth-aws"));
var _authContext = require("../data/authContext");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// import 

const AuthenticateUser = () => {
  const user = new _amazonCognitoIdentityJs.CognitoUser({
    Username: _common.USER_NAME_AWS_COGNITO,
    Pool: _authAws.default
  });
  const authDetails = new _amazonCognitoIdentityJs.AuthenticationDetails({
    Username: _common.USER_NAME_AWS_COGNITO,
    Password: _common.PASSWORD_AWS_COGNITO
  });
  const userName = user.getUsername();
  user.authenticateUser(authDetails, {
    onSuccess: data => {
      console.log("accessToken: ", data);
      // localStorage.setItem("accessToken", data.)AccessToken, IdToken, RefreshToken, TokenType=Bearer
      _authContext.authContext.AccessToken = data.accessToken.jwtToken;
      _authContext.authContext.IdToken = data.idToken.jwtToken;
      _authContext.authContext.RefreshToken = data.refreshToken.token;
      _authContext.authContext.TokenType = data.refreshToken.token;
      console.log(_authContext.authContext);
    },
    onFailure: error => {
      console.error("onFailure: ", error);
    },
    newPasswordRequired: response => {
      const userAttributes = {
        'email': _common.EMAIL_AWS_COGNITO
      };
      console.log("newPasswordRequired: ", userAttributes, response);
      user.completeNewPasswordChallenge(_common.PASSWORD_AWS_COGNITO, userAttributes, {
        onSuccess: result => {
          console.log("NEW PASSWORD COMPLETED: New Password Set");
          // console.log(result);
        },

        onFailure: err => {
          // console.log(err);
        }
      });
    }
  });

  // user.completeNewPasswordChallenge("Admin123@", '', {
  //     onSuccess: (data) => {
  //         console.log("onSuccess: ", data);
  //     },
  //     onFailure: (err) => {
  //         console.error("onFailure: ", err);
  //     },
  //     newPasswordRequired: (data) => {
  //         console.log("newPasswordRequired: ", data);
  //     },
  // });

  // authAwsPool.signUp("sudhir.wani@ideaqu.com", "Admin@123", [{
  //     Name: 'email',
  //     Value: 'sudhir111.wani@ideaqu.com',
  // }], null, (err, data) => {
  //     if (err) {
  //         console.error(err);
  //     }
  //     console.log(data, "new account");
  // });

  // user.changePassword("Admin@123", "NG$U$@}P}0>~", (err, result) => {
  //     if (err) {
  //         console.error(err);
  //     } else {
  //         console.log("CREATE PASS RESULT : " , result);
  //     }
  // })

  // user.authenticateUser(authDetails, {
  //     onSuccess: (data) => {
  //         console.log("onSuccess: ", data);
  //     },
  //     onFailure: (err) => {
  //         console.error("onFailure: ", err);
  //     },
  //     newPasswordRequired: (data) => {
  //         console.log("newPasswordRequired: ", data);
  //     },
  // });

  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "container sec-header-2"
  }, /*#__PURE__*/React.createElement("h1", null, "Auth Test")));
};
var _default = AuthenticateUser;
exports.default = _default;