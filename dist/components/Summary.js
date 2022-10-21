"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/es.promise.js");
require("core-js/modules/es.string.trim.js");
require("core-js/modules/es.parse-int.js");
require("core-js/modules/web.dom-collections.iterator.js");
require("core-js/modules/es.parse-float.js");
require("core-js/modules/es.number.to-fixed.js");
var _react = _interopRequireWildcard(require("react"));
var _context = _interopRequireDefault(require("./context"));
var _common = require("./common");
var _donationWidgetPopup = _interopRequireDefault(require("./views/payments/components/donation-widget-popup-2"));
var _homePageService = require("./jwt/_services/home-page-service");
var _programmeService = require("./jwt/_services/programme-service");
var _appealService = require("./jwt/_services/appeal-service");
var _constant = require("./common/constant");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const ImageLoader = /*#__PURE__*/(0, _react.lazy)(() => Promise.resolve().then(() => _interopRequireWildcard(require('./common/image-loader'))));
class CauseSummary extends _react.default.Component {
  constructor(props) {
    super(props);
    console.log('3243424324', this.props);
    console.log('212121221', this.props.popupDonationWidget);
    this.state = {
      donationAmount: 0,
      causesData: [],
      note: '',
      isCauses: true,
      popupDonationWidget: this.props.popupDonationWidget,
      donationWidgetData: {},
      isPatronProgrammesData: false,
      isDonationWidgetData: false,
      patronProgrammesData: [],
      patronNewOfferName: '',
      patronNextOfferName: '',
      patronDiffAmount: 0,
      minAmount: 0
    };
    this.closePopup = this.closePopup.bind(this);
    this.newDonationAmount = this.newDonationAmount.bind(this);
    this.onClickSelect = this.onClickSelect.bind(this);
    console.log('1212-------', this.newDonationAmount);
    this.setdata = this.setdata.bind(this);
    this.getPatronOffers = this.getPatronOffers.bind(this);
  }
  closePopup(name) {
    this.setState({
      ['popup' + name]: false
    });
  }
  newDonationAmount() {
    var _this$context;
    let PaymentContext = (_this$context = this.context) === null || _this$context === void 0 ? void 0 : _this$context.PaymentContext;
    console.log('234343244------', PaymentContext);
    this.setState({
      donationAmount: PaymentContext === null || PaymentContext === void 0 ? void 0 : PaymentContext[PaymentContext.donationMethod].donationAmount,
      popupDonationWidget: false
    });
  }
  onClickSelect(e) {
    e.preventDefault();
    let ele = e.target;
    let aNode = (0, _common.GET_PARENT)(ele, 'A');
    let paymentContext = this.context.PaymentContext;
    let donationMethod = paymentContext.donationMethod;
    let id = ele.querySelector("div > img");
    let val = aNode.innerText.trim();
    paymentContext.cause.causes = val;
    let causeid = this.state.causesData.filter(item => item.brief.trim() === paymentContext.cause.causes.trim());
    paymentContext.cause.id = parseInt(causeid[0].id);
    [...aNode.parentNode.childNodes].map(item => item.classList.remove('selected'));
    aNode.classList.add('selected');
  }
  getPatronOffers(amount) {
    console.log('AMount---------', amount);
    let amountRaised = Number.isInteger(amount) ? parseInt(amount) : parseFloat(amount);
    let offers = this.state.patronProgrammesData.length - 1;
    let firstProgramme = this.state.patronProgrammesData[0];
    const currentOffer = this.state.patronProgrammesData.find(function (item, index) {
      return amountRaised >= item.minAmount && index != offers ? amountRaised <= item.maxAmount : true;
    });
    if (currentOffer != undefined) {
      if (amountRaised >= 0 && amountRaised < currentOffer.minAmount) {
        var diffAmount = Number(currentOffer.minAmount) - amountRaised;
        diffAmount = Number.isInteger(diffAmount) ? parseInt(diffAmount) : parseFloat(diffAmount).toFixed(2);
        this.setState({
          patronNewOfferName: firstProgramme.patronName,
          patronId: firstProgramme.id,
          patronDiffAmount: diffAmount,
          patronAmount: amountRaised,
          minAmount: firstProgramme.minAmount
        });
      } else {
        var diffAmount = currentOffer.maxAmount - amountRaised;
        diffAmount = Number.isInteger(diffAmount) ? parseInt(diffAmount) : parseFloat(diffAmount).toFixed(2);
        const newOffer = this.state.patronProgrammesData.find(function (item, index) {
          return currentOffer.maxAmount + 1 >= item.minAmount && (index != offers ? currentOffer.maxAmount + 1 <= item.maxAmount : true);
        });
        if (newOffer !== undefined) {
          var newDiffAmount = newOffer.minAmount - amountRaised;
          newDiffAmount = Number.isInteger(newDiffAmount) ? parseInt(newDiffAmount) : parseFloat(newDiffAmount).toFixed(2);
          this.setState({
            patronNewOfferName: currentOffer.patronName,
            patronId: currentOffer.id,
            patronDiffAmount: diffAmount,
            patronAmount: amountRaised,
            patronNextOfferName: newOffer.patronName,
            newDiffAmount: newDiffAmount
          });
        } else {
          this.setState({
            patronNewOfferName: currentOffer.patronName,
            patronId: currentOffer.id,
            patronDiffAmount: '',
            patronAmount: '',
            patronNextOfferName: currentOffer.patronName,
            newDiffAmount: ''
          });
        }
      }
    }
  }
  setdata(response) {
    console.log('21221', response);
    this.setState(prevState => ({
      note: response.taxDeductibleText,
      isDonationWidgetData: true,
      donationWidgetData: _objectSpread(_objectSpread({}, prevState.donationWidgetData), {}, {
        amoutOptions: [...response.donationAmounts],
        recurringTypes: [...response.recurringTypes],
        latestDonationText: response.latestDonationText,
        taxDeductibleText: response.taxDeductibleText,
        donationAmounts: response.donationAmounts,
        defaultAmountPosition: response.defaultAmountPosition,
        selectedAmount: this.state.donationAmount
      })
    }));
    this.setState({
      note: response.taxDeductibleText
    });
  }
  componentDidMount() {
    var _this$context2;
    let method = localStorage.getItem('isMyInfo');
    if (method) {
      window.location.href = '/';
    }
    let PaymentContext = (_this$context2 = this.context) === null || _this$context2 === void 0 ? void 0 : _this$context2.PaymentContext;
    let amt = '';
    let data = JSON.parse(localStorage.getItem('context'));
    if (data) {
      amt = data.donationAmount;
      PaymentContext.cause.entity = data.entity;
      PaymentContext.cause.id = data.id;
      PaymentContext.cause.name = data.name;
      PaymentContext.cause.causes = data.causes;
    }
    if (amt) {
      PaymentContext.cause.donationAmount = amt;
      this.setState({
        donationAmount: amt
      });
    } else {
      var _PaymentContext$Payme;
      this.setState({
        donationAmount: (_PaymentContext$Payme = PaymentContext === null || PaymentContext === void 0 ? void 0 : PaymentContext[PaymentContext.donationMethod].donationAmount) !== null && _PaymentContext$Payme !== void 0 ? _PaymentContext$Payme : '',
        beAssociateAmount: 2000 - (PaymentContext === null || PaymentContext === void 0 ? void 0 : PaymentContext[PaymentContext.donationMethod].donationAmount)
      });
    }
    const appealID = 0;
    _homePageService.homePageService.getDonationWidgetData(appealID).then(response => {
      this.setdata(response);
    });
    _programmeService.programmeService.getPatronProgrammes(0, 0).then(response => {
      this.setState({
        patronProgrammesData: [...response.patronProgrammes],
        isPatronProgrammesData: true
      });
    }).then(() => {
      this.getPatronOffers(this.state.donationAmount);
    });
    let payload = {
      "charityId": _constant.NGS_CHARITY_ID,
      "search": "",
      "type": 2,
      "pageNumber": 0,
      "pageSize": 0
    };
    _appealService.appeal.getAppealList(payload).then(response => {
      var _response$pillarDetai, _response$pillarDetai2;
      let data = (_response$pillarDetai = response.pillarDetails) === null || _response$pillarDetai === void 0 ? void 0 : _response$pillarDetai.map(item => {
        let obj = {
          id: item.id,
          brief: item.name.trim(),
          imgSrc: item.imagePath
        };
        return obj;
      });
      let gallery = data.filter(item => item.brief === "The Gallery's Vision");
      let others = data.filter(item => item.brief !== "The Gallery's Vision");
      let causes = [...gallery, ...others];
      this.setState({
        causesData: causes
      });
      let causeName = PaymentContext.cause.causes;
      (_response$pillarDetai2 = response.pillarDetails) === null || _response$pillarDetai2 === void 0 ? void 0 : _response$pillarDetai2.map(item => {
        if (item.name.trim() === causeName.trim()) {
          PaymentContext.cause.id = item.id;
        }
      });
    });
  }
  componentDidUpdate() {
    var _this$context3;
    let PaymentContext = (_this$context3 = this.context) === null || _this$context3 === void 0 ? void 0 : _this$context3.PaymentContext;
    if ((PaymentContext === null || PaymentContext === void 0 ? void 0 : PaymentContext[PaymentContext.donationMethod].donationAmount) !== this.state.donationAmount) {
      this.getPatronOffers(this.state.donationAmount);
    }
  }
  render() {
    let paymentContext = this.context.PaymentContext;
    let donationMethod = paymentContext.donationMethod;
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
      className: "donation-details"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "c-amount"
    }, /*#__PURE__*/_react.default.createElement("span", {
      className: "amt"
    }, (0, _common.commaSeperatedAmount)(_common.CURRENCY_SYMBOL, this.state.donationAmount)), /*#__PURE__*/_react.default.createElement("button", {
      className: "btn btn-light c-edit",
      onClick: () => this.setState({
        popupDonationWidget: true
      })
    }, /*#__PURE__*/_react.default.createElement(_react.Suspense, {
      fallback: null
    }, /*#__PURE__*/_react.default.createElement(ImageLoader, {
      type: "image",
      src: "/images/edit.svg"
    }), /*#__PURE__*/_react.default.createElement("p", null, "Click me")))), /*#__PURE__*/_react.default.createElement("div", {
      className: "entity"
    }, /*#__PURE__*/_react.default.createElement("span", null, paymentContext.cause.entity.charAt(0).toUpperCase() + paymentContext.cause.entity.substring(1)))), console.log('222---------', this.state.donationWidgetData), this.state.popupDonationWidget ? /*#__PURE__*/_react.default.createElement(_donationWidgetPopup.default, {
      updateDonationAmount: this.newDonationAmount,
      close: this.closePopup,
      donationWidgetData: this.state.donationWidgetData,
      getPatronOffers: this.getPatronOffers
    }) :
    // null
    alert('fsdfsdfsdf'));
  }
}
_defineProperty(CauseSummary, "contextType", _context.default);
var _default = CauseSummary;
exports.default = _default;