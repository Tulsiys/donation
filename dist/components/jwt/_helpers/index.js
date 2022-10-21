"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _handleResponse = require("./handle-response");
Object.keys(_handleResponse).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _handleResponse[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _handleResponse[key];
    }
  });
});