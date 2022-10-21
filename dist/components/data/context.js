"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PaymentContext = void 0;
require("core-js/modules/es.string.trim.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.string.replace.js");
//import { createContext } from 'react';

const PaymentContext = {
  secondaryUserData: {},
  cause: {
    donationAmount: 0.00,
    frequency: 'one time',
    partPayment: '',
    entity: 'individual',
    causes: "Kidney Dialysis Foundation Singapore (KDF)",
    // selected cause name(s)
    id: 0,
    // selected campaign id(s)
    default: {
      donationAmount: 0.00,
      // default donation amount
      frequency: 'one time',
      // one time | recurrent
      partPayment: '',
      // monthly | quarterly | annually
      entity: 'individual',
      // individual | corporate
      causes: "Kidney Dialysis Foundation Singapore (KDF)",
      // default cause name
      id: '',
      // default campaign name(s)
      minAmount: 5.00,
      // minimum donation amount
      maxAmount: 999999.00 // maximum donation amount
    }
  },

  campaign: {
    donationAmount: 0.00,
    frequency: 'one time',
    partPayment: '',
    entity: 'individual',
    name: "Campaign Name",
    // selected cause name(s)
    id: '',
    // selected campaign id(s)
    causes: ["The Gallery's Vision"],
    default: {
      donationAmount: 0.00,
      // default donation amount
      frequency: 'one time',
      // one time | recurrent
      partPayment: '',
      // monthly | quarterly | annually
      entity: 'individual',
      // individual | corporate
      name: 'Campaign Name',
      // default campaign name
      id: '',
      // default campaign name(s)
      minAmount: 5.00,
      // minimum donation amount
      maxAmount: 999999.00,
      // maximum donation amount
      causes: ["The Gallery's Vision"] // default cause(s)
    }
  },

  patron: {
    donationAmount: 0.00,
    frequency: 'one time',
    partPayment: '',
    entity: 'individual',
    name: "Patron Name",
    // selected cause name(s)
    id: 0,
    // selected campaign id(s)
    causes: "The Gallery's Vision",
    default: {
      donationAmount: 0.00,
      // default donation amount
      frequency: 'one time',
      // one time | recurrent
      partPayment: '',
      // monthly | quarterly | annually
      entity: 'individual',
      // individual | corporate
      name: 'Patron Name',
      // default cause name
      id: 0,
      // default campaign name(s)
      minAmount: 2000.00,
      // minimum donation amount
      maxAmount: 999999.00,
      // maximum donation amount
      causes: "The Gallery's Vision" // default cause name(s)
    }
  },

  adoptartwork: {
    donationAmount: 50.00,
    frequency: 'one time',
    partPayment: '',
    entity: 'individual',
    artworkName: "Artwork Name",
    // selected cause name(s)
    programName: "",
    id: 0,
    // selected campaign id(s)
    privilegeid: 0,
    causes: ["The Gallery's Vision"],
    default: {
      donationAmount: 50.00,
      // default donation amount
      frequency: 'one time',
      // one time | recurrent
      partPayment: '',
      // monthly | quarterly | annually
      entity: 'individual',
      // individual | corporate
      name: 'Artwork Name',
      // default cause name
      id: 0,
      // default campaign name(s)
      minAmount: 50.00,
      // minimum donation amount
      maxAmount: 200000.00,
      // maximum donation amount
      causes: ["The Gallery's Vision"] // default cause name(s)
    }
  },

  paymentDetails: {
    transactionNo: '',
    cardTokenId: '',
    cardId: '',
    fingerprint: '',
    isUserRegistered: '',
    isPatronMember: ''
  },
  donationMethod: 'cause',
  // cause | campaign | adoptartwork | patron
  navLinkRef: null,
  referrer: '',
  isScrolling: false,
  isLearnMore: false,
  setNavActiveInactive: function setNavActiveInactive(exception) {
    var _this$navLinkRef;
    let children = (_this$navLinkRef = this.navLinkRef) !== null && _this$navLinkRef !== void 0 && _this$navLinkRef.current ? this.navLinkRef.current.childNodes : null;
    if (children) {
      children.forEach(item => {
        if (!exception) {
          item.classList.remove('active');
        } else {
          if (item.innerText.trim().toUpperCase() === exception.replace('-', ' ').toUpperCase()) {
            item.classList.add('active');
          } else {
            item.classList.remove('active');
          }
        }
      });
    }
  },
  resetValues: function resetValues(method) {
    let donationMethod = this[method];
    let objDefault = donationMethod['default'];
    for (let key in objDefault) {
      donationMethod[key] = objDefault[key];
    }
  },
  scrollTo: function scrollTo(param, top) {
    let offset = true;
    let ele = document.getElementById(param);
    if (ele) {
      if (document.body.offsetWidth <= 1024) {
        offset = false;
      }
      document.body.scrollTop = param.toUpperCase() === 'HOME' ? 0 : typeof top === 'number' ? top : ele.offsetTop - (offset ? this.navLinkRef.current.offsetHeight : 100);
      this.setNavActiveInactive(param.toUpperCase());
    } else if (typeof param === 'number') {
      document.body.scrollTop = param;
    } else {
      document.body.scrollTop = 0;
      if (param) {
        this.setNavActiveInactive(param);
      } else {
        this.setNavActiveInactive();
      }
    }
    this.referrer = '';
  }
};
exports.PaymentContext = PaymentContext;