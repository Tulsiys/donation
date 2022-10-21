// export const BASE_URL = "https://edonation-dev-api.givepls.com/api/eDonation"; //DEV Server
// export const BASE_URL = "https://edonation-uat-api.givepls.com/api/eDonation"; // UAT Server commented not AUTH
// export const BASE_URL = "https://x59secw1jf.execute-api.ap-southeast-1.amazonaws.com/Stage/api/eDonation"; // DEV with AUTH
//export const BASE_URL = "https://kv0hdmvonc.execute-api.ap-southeast-1.amazonaws.com/Stage/api/eDonation"; // UAT new with AUTH
// export const BASE_URL =  "https://edonation-uat-api.givepls.com/api/eDonation";
// export const NGS_SINGPASS_URL = "https://app.givepls.com/"; // UAT singpass url change as per suyoug suggetions
export const NGS_SINGPASS_URL = "https://staging.givepls.com/"; // NGS singpass url for QR code generation 
//DEV - https://staging.givepls.com //UAT, PROD - https://app.givepls.com
export const NGS_SINGPASS_ENV = 'DEV' // DEV, UAT, PROD
// export const BASE_URL =  "https://edonation-uat-api.givepls.com/api/eDonation";
export const BASE_URL= "https://edonation-versionupgrade3-api.givepls.com/api/eDonation"

//--------------------AUTH0 DETAILS ----------------------
export const REACT_APP_AUTH0_DOMAIN = "ngs-development.au.auth0.com";
export const REACT_APP_AUTH0_CLIENT_ID = "POfErXPM6V4LXXUxQCXnXheZ6oUbhHQa";
export const CONNECTION_TYPE = "Username-Password-Authentication";

//-------------------- STRIPE DETAILS --------------------
export const STRIPE_KEY = "pk_test_0i0Up5UNkTgfCwiQPOkM6LoD001AjQYhUq";
export const STRIPE_SECRCT = "sk_test_N5W3Gv2iyvAlAspk0xTBlAl700Y4BjSMfI";

// -------------------- KDF DETAILS ----------------------- 
export const ENROLL_MANULLY_ID = 1;
export const ENROLL_CORPORATE_ID = 2;
export const NGS_CHARITY_ID = 20;
export const DONATION_AMOUNT = 1000000000000000; 
export const GPAY_3DSGD = '82a241a3fc6385b';
export const GPAY_NO3DSGD = 'babe3c969688efc';
export const GPAY_RECSGD = 'bba2334d23fb4f5';
export const PAYMENT_METHOD = 'WorldPay';

export const DEFAULT_API_ERROR = `Our server is down, we'll back to normal soon`

export const CARD_TYPES = {
    VISA : 'VISA',
    MASTERCARD : 'Mastercard',
    AMEX : 'Amex',
    AMERICANEXPRESS : 'AMERICANEXPRESS',
    ECMC : 'ECMC'
}

export const PAYMENT_PARTNER = {
    WORLDPAY : 'WorldPay',
}

export const RESPONSE_CODES = {
    SUCCESS : 1,
    FAILURE : 0
}

export const REGEX = {
    TITLECASE : /\b(\w)/g
}

export const MODAL_MESSAGE = {
    ERROR : 'Oops! Something went wrong'
}

export const DEFAULT_ORDER = 1
export const DEFAULT_CARD_NAME = 'Card Holder Name'
export const WORLD_PAY_BASE_URL = "https://l81c6bg7gf.execute-api.ap-southeast-1.amazonaws.com/Stage/api/eDonation"
export const WORLDPAY_PUBLIC_KEY = '1#10001#be68bfb3aca26ef4f99df83edf415261131adbbb3a'
+ 'bfd056f5dac7bc9a30e5243734f4e614ccea04e72193bed5e8'
+ '219c06b16f902644e0d554220e07eb66da3b1f33b355daeef2'
+ '059bc9f9ad5dca3035846c872f8ca3c5df8f9b8dc466bfacde'
+ '0c047ca1ab66f498c71b24c54b2ce5e844c052bf1cffc21574'
+ 'a3efc3f33a5188f2df75d7f7f0318d0e1e5d6881220fe4acbb'
+ '0a5e29886e1fa47410a2186dd6ce9a34b796dddf06afb15800'
+ '446a967fd4d817def1c46ccde89684ae7cf71547daa5ff3df9'
+ '90edcc91c49ca9e25003753ce0494bff67b6704857cec658e1'
+ '2a3b3d6ad18f3443d4d5cd21a28e8123084c32d6a6f9ca6c2b'
+ 'da6fac58d7e67f0b8939'

//----------------- HOMEPAGE BLOCK IDS ------------------- 
export const NEWS_LETTER_BLOCK_ID = 13;
export const GALLARY_EXPLORE_BLOCK_ID = 14;
export const CONTACT_US_BLOCK_ID = 15;
export const SOCIAL_MEDIA_BLOCK_ID = 16;
export const DONATION_BLOCK_ID = 5;
export const ADOPT_ART_WORK_BLOCK_ID = 6;
export const CORE_PRIVILEDGE_BLOCK_ID = 9;
export const PATRON_HEADING_BLOCK_ID = 8;
export const PATRON_PROGRAM_BLOCK_ID = 10;
export const DONOR_WALL_BLOCK_ID = 12;
export const ACHIEVEMENTS_BLOCK_ID = 7;
export const DONATION_WIDGET__BLOCK_ID = 4;

//--------------------------------------------------
export const DONOR_WALL_DONOTE_NOW_SETTING_ID = 16;
export const DONOR_WALL_SEE_WALL_SETTING_ID = 15;
export const DATE_FORMAT_DAYS = 'DD MMM';
export const DATE_FORMAT_YEARS = 'DD MMM YYYY'

//------------------------------------------------------
export const DONATION_MIN_AMOUNT = 5;
export const DONATION_MAX_AMOUNT = 999999;

export const CONTACT_US = "/"
export const SUPPORT = "/"
export const SITE_MAP = "/"
export const TERMS_OF_USE = "https://www.kdf.org.sg/governance"
export const PRIVACY_POLICY = "https://www.kdf.org.sg/privacy"
export const TERMS_CONDITION = "https://www.kdf.org.sg/governance"

//------------------------------------------------------

export const PATRON_MIN_AMOUNT = 2000;
export const PATRON_MAX_AMOUNT = 999999;

export const ADOPT_MIN_AMOUNT = 50;
export const ADOPT_MAX_AMOUNT = 200000;
export const DATE_FORMAT = 'D MMM YYYY'; // 04 Jan 2019
export const HOUR_MINS = 'h:mm A';  // Hour and minute with AM/PM

export const PAYMENT_TYPES = {
    CARD_PAYMENT: 1,
    GOOGLE_PAY: 2,
    APPLE_PAY: 3
    
}

export const PAYMENT_ORDER = 1;
export const PAYMENT_METHODS = {
    GRAB_PAY : 'grabpay'
}

export const PaymentStatus = { SUCCESS: 0, FAILURE: 1, CANCEL: 2 };