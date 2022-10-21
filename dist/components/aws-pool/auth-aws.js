"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _amazonCognitoIdentityJs = require("amazon-cognito-identity-js");
//DEV Detais
// const awsAuthPool = {
//     UserPoolId: "ap-southeast-1_e3Vf2hVfB",
//     ClientId: "117p6d2oeohsfgm5sbmberkotr"
// }

//UAT Details
const awsAuthPool = {
  UserPoolId: "ap-southeast-1_IwFKdYOeP",
  ClientId: "7ulb67p4gmmgmi2a7b1oqr9mmg"
};

//PROD Details
// const awsAuthPool = {
//     UserPoolId: "ap-southeast-1_RsSbWnzFe",
//     ClientId: "ck3laqkeujv91arphm4foutv8"
// }
var _default = new _amazonCognitoIdentityJs.CognitoUserPool(awsAuthPool);
exports.default = _default;