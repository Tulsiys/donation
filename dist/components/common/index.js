"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.commaSeperatedAmount = exports.USER_NAME_AWS_COGNITO = exports.TEXT_TRIM = exports.PAYMENT_OPTIONS = exports.PASSWORD_AWS_COGNITO = exports.IMG_LOGO = exports.GET_PARENT = exports.EMAIL_AWS_COGNITO = exports.DEFAULT_IMAGE_PATH = exports.CURRENCY_SYMBOL = exports.CREDIT_CARD = exports.COMPANY_NAME_SHORT = exports.COMPANY_NAME_FULL = void 0;
require("core-js/modules/es.string.trim.js");
require("core-js/modules/es.regexp.to-string.js");
const IMG_LOGO = '/logo-big.png';
exports.IMG_LOGO = IMG_LOGO;
const COMPANY_NAME_FULL = 'Kidney Dialysis Foundation Singapore (KDF)';
exports.COMPANY_NAME_FULL = COMPANY_NAME_FULL;
const COMPANY_NAME_SHORT = 'KDF';
exports.COMPANY_NAME_SHORT = COMPANY_NAME_SHORT;
const CURRENCY_SYMBOL = '$';
exports.CURRENCY_SYMBOL = CURRENCY_SYMBOL;
const USER_NAME_AWS_COGNITO = 'ngs';
exports.USER_NAME_AWS_COGNITO = USER_NAME_AWS_COGNITO;
const PASSWORD_AWS_COGNITO = 'Admin@123';
// export const EMAIL_AWS_COGNITO = 'mayank.kumar@ideaqu.com'; //DEV Email
exports.PASSWORD_AWS_COGNITO = PASSWORD_AWS_COGNITO;
const EMAIL_AWS_COGNITO = 'ngs@givepls.com'; // UAT email
exports.EMAIL_AWS_COGNITO = EMAIL_AWS_COGNITO;
const CREDIT_CARD = {
  monthOptions: [{
    "value": "01",
    "label": "01"
  }, {
    "value": "02",
    "label": "02"
  }, {
    "value": "03",
    "label": "03"
  }, {
    "value": "04",
    "label": "04"
  }, {
    "value": "05",
    "label": "05"
  }, {
    "value": "06",
    "label": "06"
  }, {
    "value": "07",
    "label": "07"
  }, {
    "value": "08",
    "label": "08"
  }, {
    "value": "09",
    "label": "09"
  }, {
    "value": "10",
    "label": "10"
  }, {
    "value": "11",
    "label": "11"
  }, {
    "value": "12",
    "label": "12"
  }],
  cardImages: {
    AmericanExpress: '/images/cards/american-express-195x125.png',
    DefaultCard: '/images/cards/default-195x125.png',
    DinersClub: '/images/cards/diners-club-195x125.png',
    JCB: '/images/cards/jcb-195x125.png',
    Mastercard: '/images/cards/master-card-195x125.png',
    UnionPay: '/images/cards/union-pay-195x125.png',
    Visa: '/images/cards/visa-195x125.png'
  },
  getCardExpiryYearList() {
    var yearList = [];
    var year = new Date().getFullYear();
    for (let i = 0; i < 21; i++) {
      const obj = {
        value: year + i,
        label: year + i
      };
      yearList.push(obj);
    }
    return yearList;
  }
};
exports.CREDIT_CARD = CREDIT_CARD;
const PAYMENT_OPTIONS = {
  cardImages: {
    googlepay: '/images/cards/googlepay.svg',
    applepay: '/images/cards/applepay.svg',
    alipay: '/images/cards/alipay.svg',
    grabpay: '/images/cards/grab-pay.svg',
    googlepayPNG: '/images/cards/googlepay.png',
    applepayPNG: '/images/cards/applepay.png',
    alipayPNG: '/images/cards/alipay.png',
    grabpayPNG: '/images/cards/grab-pay.png'
  }
};
exports.PAYMENT_OPTIONS = PAYMENT_OPTIONS;
const DEFAULT_IMAGE_PATH = "/images/campaigns/default-image/default-image.png";
exports.DEFAULT_IMAGE_PATH = DEFAULT_IMAGE_PATH;
const GET_PARENT = (e, nodename, classname) => {
  let ele = e;
  //console.log(ele, nodename, classname);
  try {
    do {
      //console.log('node', ele.nodeName);
      if (nodename && ele.nodeName === nodename || classname && ele.classList.contains(classname)) {
        return ele;
      } else {
        ele = ele.parentNode;
      }
    } while (ele.parentNode);
  } catch (ex) {
    //throw ex;
  }
};
exports.GET_PARENT = GET_PARENT;
const TEXT_TRIM = (text, characters) => {
  try {
    if (text.length > characters) {
      return text.substr(0, characters).trim() + '...';
    } else {
      return text;
    }
  } catch (ex) {
    return text;
  }
};
exports.TEXT_TRIM = TEXT_TRIM;
const commaSeperatedAmount = (sign, value) => {
  if (value === undefined || value === null) return '';
  let val = value.toString();
  let str = [];
  let decimalval = val.split('.');
  if (decimalval.length === 2) {
    val = decimalval[0];
  }
  if (val && val.length > 3) {
    for (let ind = val.length - 1; ind >= 0; ind--) {
      if (!(ind % 3) && ind !== 0) {
        str.push(val[val.length - 1 - ind]);
        str.push(',');
      } else {
        str.push(val[val.length - 1 - ind]);
      }
    }
    val = str.join('');
  }
  if (decimalval.length === 2) {
    return sign + val + '.' + decimalval[1];
  } else {
    return sign + val;
  }
};
exports.commaSeperatedAmount = commaSeperatedAmount;