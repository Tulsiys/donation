"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Common = void 0;
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.string.replace.js");
require("core-js/modules/es.regexp.test.js");
require("core-js/modules/es.string.trim.js");
var _react = _interopRequireDefault(require("react"));
var _moment = _interopRequireDefault(require("moment"));
var _reactCurrencyFormat = _interopRequireDefault(require("react-currency-format"));
var _constant = require("./constant");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const Common = {
  getReadableDateFormat,
  navigateToLink,
  standardDateFormat,
  disableFutureDt,
  copyURL,
  isValidField,
  mobileFormatter,
  formatNumber,
  dateFormatterLeftBlock,
  stringTitleCase,
  convertToLowerCase
};
exports.Common = Common;
function stringTitleCase(value) {
  return value.toLowerCase().replace(_constant.REGEX.TITLECASE, s => s.toUpperCase());
}
function isValidField(value) {
  if (value === "" || value === null || value === 'null' || value === 'NA' || value === " " || value === undefined || value === "NULL" || value === []) {
    return false;
  } else {
    return true;
  }
}
function convertToLowerCase(value) {
  if (value === "" || value === null || value === 'NA' || value === " " || value === undefined) {
    return value;
  } else {
    return value.toLowerCase();
  }
}
function getReadableDateFormat(value) {
  var given = (0, _moment.default)("2021-06-28 17:00:00", "YYYY-MM-DD hh:mm:ss");
  var current = (0, _moment.default)();
  var diff = _moment.default.duration(given.diff(current));
}
function formatNumber(e) {
  if (!/[0-9]/.test(e.clipboardData.getData('text/plain'))) {
    e.preventDefault();
  } else {
    var val = e.clipboardData.getData('text/plain').replace(/[^\d]/g, '').replace(/(.{4})/g, '$1 ').trim();
    setTimeout(() => {
      e.target.value = '';
      e.target.value = val;
      e.preventDefault();
    }, 4);
    // 2223003122003222
  }
}

function navigateToLink(navlink) {
  window.open(navlink, '_blank');
}
function standardDateFormat(cell) {
  if (!cell) {
    return "";
  }
  if (typeof cell === 'string') {
    return "".concat((0, _moment.default)(cell).format('D MMM YYYY'));
  }
}
function disableFutureDt(current) {
  const today = (0, _moment.default)();
  return current.isBefore(today);
}
function copyURL() {
  const elem = document.createElement('input');
  elem.value = document.URL;
  // elem.hidden = true;
  document.body.appendChild(elem);
  elem.select();
  document.execCommand('copy');
  document.body.removeChild(elem);
}
function mobileFormatter(cell, row) {
  if (Common.isValidField(cell)) {
    return /*#__PURE__*/_react.default.createElement(_reactCurrencyFormat.default, {
      displayType: 'text',
      format: "+## #### ######",
      mask: "",
      value: cell
    });
  } else {
    return '-'; //<span className="d-block text-center no-value">-</span>
  }
}

function dateFormatterLeftBlock(cell) {
  if (!cell) {
    return "";
  }
  let dateTime;
  if (typeof cell === 'string') {
    dateTime = cell.trim().split(' ');
  }
  if (typeof cell === 'string' && dateTime.length > 1) {
    return "".concat((0, _moment.default)(new Date(dateTime[0].replace(/-/g, "/"))).format(_constant.DATE_FORMAT), " | ").concat((0, _moment.default)(dateTime[1] + ' ' + dateTime[2], [_constant.HOUR_MINS]).format(_constant.HOUR_MINS));
  } else {
    return "".concat((0, _moment.default)(cell).format(_constant.DATE_FORMAT), " | ").concat((0, _moment.default)(cell).format(_constant.HOUR_MINS));
  }
}