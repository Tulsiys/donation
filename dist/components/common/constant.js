"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WORLD_PAY_BASE_URL = exports.WORLDPAY_PUBLIC_KEY = exports.TERMS_OF_USE = exports.TERMS_CONDITION = exports.SUPPORT = exports.STRIPE_SECRCT = exports.STRIPE_KEY = exports.SOCIAL_MEDIA_BLOCK_ID = exports.SITE_MAP = exports.RESPONSE_CODES = exports.REGEX = exports.REACT_APP_AUTH0_DOMAIN = exports.REACT_APP_AUTH0_CLIENT_ID = exports.PaymentStatus = exports.PRIVACY_POLICY = exports.PAYMENT_TYPES = exports.PAYMENT_PARTNER = exports.PAYMENT_ORDER = exports.PAYMENT_METHODS = exports.PAYMENT_METHOD = exports.PATRON_PROGRAM_BLOCK_ID = exports.PATRON_MIN_AMOUNT = exports.PATRON_MAX_AMOUNT = exports.PATRON_HEADING_BLOCK_ID = exports.NGS_SINGPASS_URL = exports.NGS_SINGPASS_ENV = exports.NGS_CHARITY_ID = exports.NEWS_LETTER_BLOCK_ID = exports.MODAL_MESSAGE = exports.HOUR_MINS = exports.GPAY_RECSGD = exports.GPAY_NO3DSGD = exports.GPAY_3DSGD = exports.GALLARY_EXPLORE_BLOCK_ID = exports.ENROLL_MANULLY_ID = exports.ENROLL_CORPORATE_ID = exports.DONOR_WALL_SEE_WALL_SETTING_ID = exports.DONOR_WALL_DONOTE_NOW_SETTING_ID = exports.DONOR_WALL_BLOCK_ID = exports.DONATION_WIDGET__BLOCK_ID = exports.DONATION_MIN_AMOUNT = exports.DONATION_MAX_AMOUNT = exports.DONATION_BLOCK_ID = exports.DONATION_AMOUNT = exports.DEFAULT_ORDER = exports.DEFAULT_CARD_NAME = exports.DEFAULT_API_ERROR = exports.DATE_FORMAT_YEARS = exports.DATE_FORMAT_DAYS = exports.DATE_FORMAT = exports.CORE_PRIVILEDGE_BLOCK_ID = exports.CONTACT_US_BLOCK_ID = exports.CONTACT_US = exports.CONNECTION_TYPE = exports.CARD_TYPES = exports.BASE_URL = exports.ADOPT_MIN_AMOUNT = exports.ADOPT_MAX_AMOUNT = exports.ADOPT_ART_WORK_BLOCK_ID = exports.ACHIEVEMENTS_BLOCK_ID = void 0;
// export const BASE_URL = "https://edonation-dev-api.givepls.com/api/eDonation"; //DEV Server
// export const BASE_URL = "https://edonation-uat-api.givepls.com/api/eDonation"; // UAT Server commented not AUTH
// export const BASE_URL = "https://x59secw1jf.execute-api.ap-southeast-1.amazonaws.com/Stage/api/eDonation"; // DEV with AUTH
//export const BASE_URL = "https://kv0hdmvonc.execute-api.ap-southeast-1.amazonaws.com/Stage/api/eDonation"; // UAT new with AUTH
// export const BASE_URL =  "https://edonation-uat-api.givepls.com/api/eDonation";
// export const NGS_SINGPASS_URL = "https://app.givepls.com/"; // UAT singpass url change as per suyoug suggetions
const NGS_SINGPASS_URL = "https://staging.givepls.com/"; // NGS singpass url for QR code generation 
//DEV - https://staging.givepls.com //UAT, PROD - https://app.givepls.com
exports.NGS_SINGPASS_URL = NGS_SINGPASS_URL;
const NGS_SINGPASS_ENV = 'DEV'; // DEV, UAT, PROD
// export const BASE_URL =  "https://edonation-uat-api.givepls.com/api/eDonation";
exports.NGS_SINGPASS_ENV = NGS_SINGPASS_ENV;
const BASE_URL = "https://edonation-versionupgrade3-api.givepls.com/api/eDonation";

//--------------------AUTH0 DETAILS ----------------------
exports.BASE_URL = BASE_URL;
const REACT_APP_AUTH0_DOMAIN = "ngs-development.au.auth0.com";
exports.REACT_APP_AUTH0_DOMAIN = REACT_APP_AUTH0_DOMAIN;
const REACT_APP_AUTH0_CLIENT_ID = "POfErXPM6V4LXXUxQCXnXheZ6oUbhHQa";
exports.REACT_APP_AUTH0_CLIENT_ID = REACT_APP_AUTH0_CLIENT_ID;
const CONNECTION_TYPE = "Username-Password-Authentication";

//-------------------- STRIPE DETAILS --------------------
exports.CONNECTION_TYPE = CONNECTION_TYPE;
const STRIPE_KEY = "pk_test_0i0Up5UNkTgfCwiQPOkM6LoD001AjQYhUq";
exports.STRIPE_KEY = STRIPE_KEY;
const STRIPE_SECRCT = "sk_test_N5W3Gv2iyvAlAspk0xTBlAl700Y4BjSMfI";

// -------------------- KDF DETAILS ----------------------- 
exports.STRIPE_SECRCT = STRIPE_SECRCT;
const ENROLL_MANULLY_ID = 1;
exports.ENROLL_MANULLY_ID = ENROLL_MANULLY_ID;
const ENROLL_CORPORATE_ID = 2;
exports.ENROLL_CORPORATE_ID = ENROLL_CORPORATE_ID;
const NGS_CHARITY_ID = 20;
exports.NGS_CHARITY_ID = NGS_CHARITY_ID;
const DONATION_AMOUNT = 1000000000000000;
exports.DONATION_AMOUNT = DONATION_AMOUNT;
const GPAY_3DSGD = '82a241a3fc6385b';
exports.GPAY_3DSGD = GPAY_3DSGD;
const GPAY_NO3DSGD = 'babe3c969688efc';
exports.GPAY_NO3DSGD = GPAY_NO3DSGD;
const GPAY_RECSGD = 'bba2334d23fb4f5';
exports.GPAY_RECSGD = GPAY_RECSGD;
const PAYMENT_METHOD = 'WorldPay';
exports.PAYMENT_METHOD = PAYMENT_METHOD;
const DEFAULT_API_ERROR = "Our server is down, we'll back to normal soon";
exports.DEFAULT_API_ERROR = DEFAULT_API_ERROR;
const CARD_TYPES = {
  VISA: 'VISA',
  MASTERCARD: 'Mastercard',
  AMEX: 'Amex',
  AMERICANEXPRESS: 'AMERICANEXPRESS',
  ECMC: 'ECMC'
};
exports.CARD_TYPES = CARD_TYPES;
const PAYMENT_PARTNER = {
  WORLDPAY: 'WorldPay'
};
exports.PAYMENT_PARTNER = PAYMENT_PARTNER;
const RESPONSE_CODES = {
  SUCCESS: 1,
  FAILURE: 0
};
exports.RESPONSE_CODES = RESPONSE_CODES;
const REGEX = {
  TITLECASE: /\b(\w)/g
};
exports.REGEX = REGEX;
const MODAL_MESSAGE = {
  ERROR: 'Oops! Something went wrong'
};
exports.MODAL_MESSAGE = MODAL_MESSAGE;
const DEFAULT_ORDER = 1;
exports.DEFAULT_ORDER = DEFAULT_ORDER;
const DEFAULT_CARD_NAME = 'Card Holder Name';
exports.DEFAULT_CARD_NAME = DEFAULT_CARD_NAME;
const WORLD_PAY_BASE_URL = "https://l81c6bg7gf.execute-api.ap-southeast-1.amazonaws.com/Stage/api/eDonation";
exports.WORLD_PAY_BASE_URL = WORLD_PAY_BASE_URL;
const WORLDPAY_PUBLIC_KEY = '1#10001#be68bfb3aca26ef4f99df83edf415261131adbbb3a' + 'bfd056f5dac7bc9a30e5243734f4e614ccea04e72193bed5e8' + '219c06b16f902644e0d554220e07eb66da3b1f33b355daeef2' + '059bc9f9ad5dca3035846c872f8ca3c5df8f9b8dc466bfacde' + '0c047ca1ab66f498c71b24c54b2ce5e844c052bf1cffc21574' + 'a3efc3f33a5188f2df75d7f7f0318d0e1e5d6881220fe4acbb' + '0a5e29886e1fa47410a2186dd6ce9a34b796dddf06afb15800' + '446a967fd4d817def1c46ccde89684ae7cf71547daa5ff3df9' + '90edcc91c49ca9e25003753ce0494bff67b6704857cec658e1' + '2a3b3d6ad18f3443d4d5cd21a28e8123084c32d6a6f9ca6c2b' + 'da6fac58d7e67f0b8939';

//----------------- HOMEPAGE BLOCK IDS ------------------- 
exports.WORLDPAY_PUBLIC_KEY = WORLDPAY_PUBLIC_KEY;
const NEWS_LETTER_BLOCK_ID = 13;
exports.NEWS_LETTER_BLOCK_ID = NEWS_LETTER_BLOCK_ID;
const GALLARY_EXPLORE_BLOCK_ID = 14;
exports.GALLARY_EXPLORE_BLOCK_ID = GALLARY_EXPLORE_BLOCK_ID;
const CONTACT_US_BLOCK_ID = 15;
exports.CONTACT_US_BLOCK_ID = CONTACT_US_BLOCK_ID;
const SOCIAL_MEDIA_BLOCK_ID = 16;
exports.SOCIAL_MEDIA_BLOCK_ID = SOCIAL_MEDIA_BLOCK_ID;
const DONATION_BLOCK_ID = 5;
exports.DONATION_BLOCK_ID = DONATION_BLOCK_ID;
const ADOPT_ART_WORK_BLOCK_ID = 6;
exports.ADOPT_ART_WORK_BLOCK_ID = ADOPT_ART_WORK_BLOCK_ID;
const CORE_PRIVILEDGE_BLOCK_ID = 9;
exports.CORE_PRIVILEDGE_BLOCK_ID = CORE_PRIVILEDGE_BLOCK_ID;
const PATRON_HEADING_BLOCK_ID = 8;
exports.PATRON_HEADING_BLOCK_ID = PATRON_HEADING_BLOCK_ID;
const PATRON_PROGRAM_BLOCK_ID = 10;
exports.PATRON_PROGRAM_BLOCK_ID = PATRON_PROGRAM_BLOCK_ID;
const DONOR_WALL_BLOCK_ID = 12;
exports.DONOR_WALL_BLOCK_ID = DONOR_WALL_BLOCK_ID;
const ACHIEVEMENTS_BLOCK_ID = 7;
exports.ACHIEVEMENTS_BLOCK_ID = ACHIEVEMENTS_BLOCK_ID;
const DONATION_WIDGET__BLOCK_ID = 4;

//--------------------------------------------------
exports.DONATION_WIDGET__BLOCK_ID = DONATION_WIDGET__BLOCK_ID;
const DONOR_WALL_DONOTE_NOW_SETTING_ID = 16;
exports.DONOR_WALL_DONOTE_NOW_SETTING_ID = DONOR_WALL_DONOTE_NOW_SETTING_ID;
const DONOR_WALL_SEE_WALL_SETTING_ID = 15;
exports.DONOR_WALL_SEE_WALL_SETTING_ID = DONOR_WALL_SEE_WALL_SETTING_ID;
const DATE_FORMAT_DAYS = 'DD MMM';
exports.DATE_FORMAT_DAYS = DATE_FORMAT_DAYS;
const DATE_FORMAT_YEARS = 'DD MMM YYYY';

//------------------------------------------------------
exports.DATE_FORMAT_YEARS = DATE_FORMAT_YEARS;
const DONATION_MIN_AMOUNT = 5;
exports.DONATION_MIN_AMOUNT = DONATION_MIN_AMOUNT;
const DONATION_MAX_AMOUNT = 999999;
exports.DONATION_MAX_AMOUNT = DONATION_MAX_AMOUNT;
const CONTACT_US = "/";
exports.CONTACT_US = CONTACT_US;
const SUPPORT = "/";
exports.SUPPORT = SUPPORT;
const SITE_MAP = "/";
exports.SITE_MAP = SITE_MAP;
const TERMS_OF_USE = "https://www.kdf.org.sg/governance";
exports.TERMS_OF_USE = TERMS_OF_USE;
const PRIVACY_POLICY = "https://www.kdf.org.sg/privacy";
exports.PRIVACY_POLICY = PRIVACY_POLICY;
const TERMS_CONDITION = "https://www.kdf.org.sg/governance";

//------------------------------------------------------
exports.TERMS_CONDITION = TERMS_CONDITION;
const PATRON_MIN_AMOUNT = 2000;
exports.PATRON_MIN_AMOUNT = PATRON_MIN_AMOUNT;
const PATRON_MAX_AMOUNT = 999999;
exports.PATRON_MAX_AMOUNT = PATRON_MAX_AMOUNT;
const ADOPT_MIN_AMOUNT = 50;
exports.ADOPT_MIN_AMOUNT = ADOPT_MIN_AMOUNT;
const ADOPT_MAX_AMOUNT = 200000;
exports.ADOPT_MAX_AMOUNT = ADOPT_MAX_AMOUNT;
const DATE_FORMAT = 'D MMM YYYY'; // 04 Jan 2019
exports.DATE_FORMAT = DATE_FORMAT;
const HOUR_MINS = 'h:mm A'; // Hour and minute with AM/PM
exports.HOUR_MINS = HOUR_MINS;
const PAYMENT_TYPES = {
  CARD_PAYMENT: 1,
  GOOGLE_PAY: 2,
  APPLE_PAY: 3
};
exports.PAYMENT_TYPES = PAYMENT_TYPES;
const PAYMENT_ORDER = 1;
exports.PAYMENT_ORDER = PAYMENT_ORDER;
const PAYMENT_METHODS = {
  GRAB_PAY: 'grabpay'
};
exports.PAYMENT_METHODS = PAYMENT_METHODS;
const PaymentStatus = {
  SUCCESS: 0,
  FAILURE: 1,
  CANCEL: 2
};
exports.PaymentStatus = PaymentStatus;