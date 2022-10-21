"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/es.promise.js");
require("core-js/modules/es.parse-float.js");
require("core-js/modules/es.parse-int.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.string.replace.js");
require("core-js/modules/es.string.match.js");
require("core-js/modules/es.array.includes.js");
require("core-js/modules/es.string.includes.js");
require("core-js/modules/es.regexp.to-string.js");
require("core-js/modules/es.number.to-fixed.js");
require("core-js/modules/es.string.trim.js");
require("core-js/modules/web.dom-collections.iterator.js");
var _react = _interopRequireWildcard(require("react"));
var _reactRouterDom = require("react-router-dom");
var _constant = require("../../common/constant");
var _common = require("../../common");
var _context = _interopRequireDefault(require("../../context"));
require("../../section/donation/css/donation-widget.css");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const ImageLoader = /*#__PURE__*/(0, _react.lazy)(() => Promise.resolve().then(() => _interopRequireWildcard(require('../../common/image-loader'))));
class AdoptDonationWidget extends _react.default.Component {
  constructor(props) {
    var _this$props$donationW;
    super(props);
    this.state = {
      blockTitle: this.props.blockTitle ? this.props.blockTitle : 'Adoption Amount',
      blockSubTitle: this.props.blockSubTitle ? this.props.blockSubTitle : 'Please enter adoption amount below',
      amoutOptions: this.props.donationWidgetData ? this.props.donationWidgetData.donationAmounts.slice(0, 6) : [50, 100, 200, 500, 1000, 2000],
      donationTypeOptions: [{
        id: 1,
        value: 'Individual'
      }, {
        id: 2,
        value: 'Corporate'
      }],
      donationAmount: this.props.donationWidgetData ? parseFloat(this.props.donationWidgetData.donationAmounts[(_this$props$donationW = this.props.donationWidgetData.defaultAmountPosition) !== null && _this$props$donationW !== void 0 ? _this$props$donationW : 0]) : 0,
      artworkPrivilege: this.props.artworkPrivilege,
      artworkTitle: this.props.artworkTitle,
      frequency: 1,
      regularFrequency: 0,
      donateBtnTxt: 'DONATE NOW',
      donationType: 1,
      latestDonationText: this.props.donationWidgetData ? this.props.donationWidgetData.latestDonationText : '',
      taxDedutionText: this.props.donationWidgetData ? this.props.donationWidgetData.taxDeductibleText : '',
      regularFrequencyOptions: this.props.donationWidgetData ? this.props.donationWidgetData.recurringTypes : [],
      isDecrementBtn: false,
      isIncrementBtn: false,
      isDonateBtnEnabled: false
    };
    this.refDonationAmount = /*#__PURE__*/_react.default.createRef();
    this.refFixedDonationAmount = /*#__PURE__*/_react.default.createRef();
    this.refFrequency = /*#__PURE__*/_react.default.createRef();
    this.refRegularFrequencyOptions = /*#__PURE__*/_react.default.createRef();
    this.refType = /*#__PURE__*/_react.default.createRef();
    this.refDonateNowBtn = /*#__PURE__*/_react.default.createRef();
    this.onChangeDonationAmount = this.onChangeDonationAmount.bind(this);
    this.onBlurDonationAmount = this.onBlurDonationAmount.bind(this);
    this.setDonationAmountWidth = this.setDonationAmountWidth.bind(this);
    this.onClickFixedDonationAmount = this.onClickFixedDonationAmount.bind(this);
    this.onClickDonationType = this.onClickDonationType.bind(this);
    this.onClickDonateNow = this.onClickDonateNow.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.Increment = this.Increment.bind(this);
    this.Decrement = this.Decrement.bind(this);
  }
  handleKeyPress(e) {
    var _this$context;
    let PaymentContext = (_this$context = this.context) === null || _this$context === void 0 ? void 0 : _this$context.PaymentContext;
    let val = e.target.value;
    val = parseInt(val.replace(/[$,]/gi, ''));
    if (val !== PaymentContext[PaymentContext.donationMethod].default.maxAmount && e.key === '.') {
      this.setState({
        decimalval: true
      });
      e.target.setAttribute('maxlength', 11);
    }
  }
  onChangeDonationAmount(e) {
    var _ele$value$replace$ma, _ele$value$replace$ma2;
    let ele = e.target;
    let val = parseFloat((_ele$value$replace$ma = ele.value.replace(/[$,]/gi, '').match(/[0-9]/g)) === null || _ele$value$replace$ma === void 0 ? void 0 : _ele$value$replace$ma.join(''));
    let context = this.context.PaymentContext;
    let eleFixedDonationAmount = this.refFixedDonationAmount.current;
    let eleDonationAmount = this.refDonationAmount.current;
    if (ele.value.includes('.')) {
      if (ele.value.split('.').length > 2) {
        // Remove . if more than 1 was found
        ele.value = ele.value.replace(/\.+$/, '');
      } else {
        // Restrict more than 2 digits after finding .
        if (ele.value.indexOf(".") > -1 && ele.value.split('.')[1].length > 1) {
          ele.value = ele.value.indexOf(".") >= 0 ? ele.value.substr(0, ele.value.indexOf(".")) + ele.value.substr(ele.value.indexOf("."), 3) : ele.value;
        }
      }
    }
    if (ele.value.length > 8) {
      this.state.decimalval ? ele.setAttribute('maxlength', 11) : ele.setAttribute('maxlength', 8);
    } else {
      ele.setAttribute('maxlength', 8);
    }
    ele.value.toString().includes('.') ? ele.setAttribute('maxlength', 11) : ele.setAttribute('maxlength', 8);
    if (parseFloat((_ele$value$replace$ma2 = ele.value.replace('$', '').match(/[0-9]*\.[0-9][0-9]/g)) === null || _ele$value$replace$ma2 === void 0 ? void 0 : _ele$value$replace$ma2.join(''))) {
      var _ele$value$replace$ma3;
      val = parseFloat((_ele$value$replace$ma3 = ele.value.replace(/[$,]/gi, '').match(/[0-9]*\.[0-9][0-9]/g)) === null || _ele$value$replace$ma3 === void 0 ? void 0 : _ele$value$replace$ma3.join('')).toFixed(2);
    } else {
      var _ele$value$replace$ma4;
      if (parseFloat((_ele$value$replace$ma4 = ele.value.replace('$', '').match(/[0-9]*\.[0-9]/g)) === null || _ele$value$replace$ma4 === void 0 ? void 0 : _ele$value$replace$ma4.join(''))) {
        var _ele$value$replace$ma5;
        val = parseFloat((_ele$value$replace$ma5 = ele.value.replace(/[$,]/gi, '').match(/[0-9]*\.[0-9]/g)) === null || _ele$value$replace$ma5 === void 0 ? void 0 : _ele$value$replace$ma5.join(''));
      } else {
        var _ele$value$replace$ma6;
        val = parseInt((_ele$value$replace$ma6 = ele.value.replace(/[$,]/gi, '').match(/[0-9]/g)) === null || _ele$value$replace$ma6 === void 0 ? void 0 : _ele$value$replace$ma6.join(''));
      }
    }
    if (this.refDonationAmount.current.value !== '$' && this.state.isDonateBtnEnabled === true) {
      this.refDonationAmount.current.value.replace('$', '') < context[context.donationMethod].default.minAmount ? this.setState({
        isDonateBtnEnabled: true
      }) : this.setState({
        isDonateBtnEnabled: false
      });
    } else {
      this.setState({
        isDonateBtnEnabled: true
      });
    }

    // this.props.setAdoptProgram(val, e);
    if (val >= _constant.ADOPT_MIN_AMOUNT) {
      /* if (val >= context[context.donationMethod].default.minAmount) { */
      // if((((val % 100) >= 0) && ((val % 100) <= 24))){
      //     var newVal =  Math.floor(val / 50) * 50;
      // }else if(((val % 100) >= 51) && ((val % 100) <= 74)){
      //     let num = val.toString();
      //     var newVal =  Math.floor(val / 50) * 50;
      // }else{
      //     var newVal =  Math.ceil(val / 50) * 50;
      // }
      ele.value = this.refDonationAmount.current.value.replace(/[A-Za-z ~`!,@#%^&()_={}[\]:;<>+\/?-]/g, "");
      this.setDonationAmountWidth(ele);
      this.setState({
        isDonateBtnEnabled: false
      });
      // this.refDonateNowBtn.current.removeAttribute('disabled');

      eleFixedDonationAmount.childNodes.forEach(item => {
        if (parseFloat(item.innerText.trim().replace(/[$,]/gi, '')) === val) {
          item.classList.add('selected');
        } else {
          item.classList.remove('selected');
        }
      });
      ele.value = (0, _common.commaSeperatedAmount)(_common.CURRENCY_SYMBOL, this.refDonationAmount.current.value.replace('$', ''));
      // setTimeout(() => ele.value = commaSeperatedAmount(CURRENCY_SYMBOL, newVal),5);
    } else {
      // let newVal =  Math.ceil(val / 50) * 50;
      ele.value = '$' + (val && val.toString() !== 'NaN' ? val : '');
      eleFixedDonationAmount.childNodes.forEach(item => {
        item.classList.remove('selected');
      });
      // this.refDonateNowBtn.current.setAttribute('disabled', 'disabled');
      this.setState({
        isDonateBtnEnabled: true,
        donateBtnTxt: "Donate Now"
      });
    }
    if (this.props.isArtworkDetails) {
      this.setState({
        donateBtnTxt: "Donate ".concat(ele.value, " Now"),
        detail: this.state.artworkPrivilege,
        artworkPrivilege: this.props.artworkPrivilege
      });
      // return this.props.getPatronOffers(val)
    }

    val > _constant.ADOPT_MAX_AMOUNT ? this.setState({
      isDonateBtnEnabled: true
    }) : this.setState({
      isDonateBtnEnabled: false
    });
    this.setDonationAmountWidth(eleDonationAmount);
  }
  Increment() {
    let eleDonationAmount = this.refDonationAmount.current;
    let val = eleDonationAmount.value.trim().replace(/[$,]/gi, '');
    if (val === '') {
      val = 0;
    }
    if (val <= _constant.ADOPT_MAX_AMOUNT) {
      val = parseInt(val);
      val += 50;
      this.refFixedDonationAmount.current.childNodes.forEach(item => {
        if (parseFloat(item.innerText.trim().replace(/[$,]/gi, '')) === val) {
          item.classList.add('selected');
        } else {
          item.classList.remove('selected');
        }
      });
      this.props.setAdoptProgram(val);
      val >= _constant.ADOPT_MIN_AMOUNT ? this.setState({
        isDonateBtnEnabled: false
      }) : this.setState({
        isDonateBtnEnabled: true
      });
      this.setState({
        isDecrementBtn: false
      });
      if (val > _constant.ADOPT_MAX_AMOUNT) {
        this.setState({
          isIncrementBtn: true
        });
        return;
      }
    } else {
      this.setState({
        isIncrementBtn: true
      });
    }
    this.refDonationAmount.current.value = (0, _common.commaSeperatedAmount)(_common.CURRENCY_SYMBOL, val);
    this.setDonationAmountWidth(eleDonationAmount);
    this.setState({
      donationAmount: val,
      donateBtnTxt: "Donate $".concat(val, " Now"),
      detail: this.state.artworkPrivilege,
      artworkPrivilege: this.props.artworkPrivilege
    });
  }
  Decrement() {
    let eleDonationAmount = this.refDonationAmount.current;
    let val = eleDonationAmount.value.trim().replace(/[$,]/gi, '');
    if (val === '') {
      val = 0;
    }
    if (val != _constant.ADOPT_MIN_AMOUNT) {
      val = parseInt(val);
      val -= 50;
      this.refFixedDonationAmount.current.childNodes.forEach(item => {
        if (parseFloat(item.innerText.trim().replace(/[$,]/gi, '')) === val) {
          item.classList.add('selected');
        } else {
          item.classList.remove('selected');
        }
      });
      // this.props.setAdoptProgram(val);
      val < _constant.ADOPT_MIN_AMOUNT ? this.setState({
        isJoinBtn: true
      }) : this.setState({
        isJoinBtn: false
      });
      this.setState({
        isIncrementBtn: false
      });
      if (val === 0) {
        this.setState({
          isDecrementBtn: true
        });
      }
    } else {
      this.setState({
        isDecrementBtn: true
      });
    }
    this.refDonationAmount.current.value = (0, _common.commaSeperatedAmount)(_common.CURRENCY_SYMBOL, val);
    this.setDonationAmountWidth(eleDonationAmount);
    this.setState({
      donationAmount: val,
      donateBtnTxt: "Donate $".concat(val, " Now"),
      detail: this.state.artworkPrivilege,
      artworkPrivilege: this.props.artworkPrivilege
    });
  }
  onFocusDonationAmount(e) {
    let ele = e.target;
    let val = ele.value.replace(/[$,]/gi, '');
    if (!val) {
      ele.value = '$';
      // this.refDonateNowBtn.current.setAttribute('disabled', 'disabled');
    } else {
      ele.classList.remove('is-invalid');
      ele.value = '$' + (val.indexOf(',') !== -1 ? val.replace(',', '') : val);
    }
  }
  onBlurDonationAmount(e) {
    let ele = e.target;
    let val = ele.value.replace(/[$,]/gi, '');
    let eleFixedDonationAmount = this.refFixedDonationAmount.current;
    if (val !== '' && val <= _constant.ADOPT_MAX_AMOUNT) {
      let newVal = 0;
      let amount = parseInt(val);
      newVal = Math.round(amount / 50) * 50;
      ele.value = (0, _common.commaSeperatedAmount)(_common.CURRENCY_SYMBOL, newVal.toString());
      eleFixedDonationAmount.childNodes.forEach(item => {
        if (parseFloat(item.innerText.trim().replace(/[$,]/gi, '')) == newVal) {
          item.classList.add('selected');
        } else {
          item.classList.remove('selected');
        }
      });
      this.setState({
        donateBtnTxt: "Donate ".concat((0, _common.commaSeperatedAmount)(_common.CURRENCY_SYMBOL, newVal.toString()), " Now")
      });
    } else {
      ele.value = (0, _common.commaSeperatedAmount)(_common.CURRENCY_SYMBOL, _constant.ADOPT_MIN_AMOUNT);
      eleFixedDonationAmount.childNodes.forEach(item => {
        if (parseFloat(item.innerText.trim().replace(/[$,]/gi, '')) == ele.value.replace(/[$,]/gi, '')) {
          item.classList.add('selected');
        } else {
          item.classList.remove('selected');
        }
      });
      this.setState({
        donateBtnTxt: "Donate ".concat((0, _common.commaSeperatedAmount)(_common.CURRENCY_SYMBOL, ele.value.replace(/[$,]/gi, '')), " Now"),
        isDonateBtnEnabled: false
      });
    }
  }
  setDonationAmountWidth(ele) {
    ele.style.width = ele.value.length * 25 + 'px';
  }
  onClickFixedDonationAmount(e) {
    let ele = e.target;
    let val = ele.innerText.trim();
    let amount = parseInt(val.replace(/[$,]/gi, ''));
    // this.props.setAdoptProgram(amount);
    ele.parentNode.childNodes.forEach(ele => ele.classList.remove('selected'));
    ele.classList.add('selected');
    ele.classList.remove('is-invalid');
    this.refDonationAmount.current.value = val;
    this.setDonationAmountWidth(this.refDonationAmount.current);
    this.refDonateNowBtn.current.removeAttribute('disabled');
    this.setState({
      donationAmount: parseFloat(val.substr(1)),
      detail: this.state.artworkPrivilege,
      donateBtnTxt: "Donate ".concat(val, " Now"),
      artworkPrivilege: this.props.artworkPrivilege
    });
    if (amount > _constant.ADOPT_MIN_AMOUNT && amount < _constant.ADOPT_MAX_AMOUNT) {
      this.setState({
        isDecrementBtn: false,
        isIncrementBtn: false
      });
    } else if (amount === _constant.ADOPT_MIN_AMOUNT) {
      this.setState({
        isDecrementBtn: true,
        isIncrementBtn: false
      });
    }
  }
  onClickDonationType(e) {
    let ele = e.target;
    let dataType = parseInt(ele.getAttribute('data-type'));
    ele.parentNode.childNodes.forEach(ele => ele.classList.remove('selected'));
    this.setState({
      donationType: dataType
    }); //ele.target.innerText
    ele.classList.add('selected');
  }
  onClickDonateNow(e) {
    var _this$context2;
    let eleDonationAmount = this.refDonationAmount.current;
    let val = eleDonationAmount.value.trim().substr(1);
    val = val.indexOf(',') !== -1 ? val.replace(',', '') : val;
    let PaymentContext = (_this$context2 = this.context) === null || _this$context2 === void 0 ? void 0 : _this$context2.PaymentContext;
    let method = PaymentContext.donationMethod;
    this.props.setAdoptProgram(parseInt(eleDonationAmount.value.replace(/[$,]/gi, '')));
    PaymentContext.adoptartwork.donationAmount = parseFloat(eleDonationAmount.value.replace(/[$,]/gi, ''));
    if (eleDonationAmount.value.trim() && val) {
      this.refType.current.childNodes.forEach(item => {
        if (item.classList.contains('selected')) {
          PaymentContext[method].entity = item.innerText.trim();
          return;
        }
      });
      if (this.props.isNavigate) {
        var artworkPrivilege = this.state.artworkPrivilege;
        var artworkTitle = this.state.artworkTitle;
        this.props.history.push({
          pathname: this.props.isNavigate,
          state: {
            detail: artworkPrivilege,
            artworkTitleDetail: artworkTitle
          }
        });
      } else {
        this.props.updateWidget(parseInt(eleDonationAmount.value.replace(/[$,]/gi, '')));
        this.props.close('DonationWidget');
      }
    } else {
      eleDonationAmount.value = '';
      return false;
    }
  }
  componentDidMount() {
    // this.props.onRef(this);
    const context = this.context;
    // const PaymentContext = context?.PaymentContext;

    const donationBlockDetails = context.blockDetails.filter(details => details.blockId === _constant.DONATION_WIDGET__BLOCK_ID);
    let PaymentContext = this.context.PaymentContext;
    this.setState({
      donationAmount: PaymentContext[PaymentContext.donationMethod].donationAmount,
      blockTitle: donationBlockDetails[0].blockTitle,
      detail: this.state.artworkPrivilege
    }, () => {
      this.refFixedDonationAmount.current.childNodes.forEach(item => {
        if (this.state.donationAmount == item.innerText.replace(/[$,]/gi, '')) {
          item.classList.add('selected');
          //item.click();
          this.setDonationAmountWidth(this.refDonationAmount.current);
        } else {
          item.classList.remove('selected');
        }
      });
      this.refType.current.childNodes.forEach(item => {
        PaymentContext[PaymentContext.donationMethod].entity === item.innerText.trim() ? item.classList.add('selected') : item.classList.remove('selected');
      });
      this.setState({
        donateBtnTxt: "Donate ".concat((0, _common.commaSeperatedAmount)(_common.CURRENCY_SYMBOL, this.state.donationBlockDetails), " Now"),
        isDonateBtnEnabled: false
      });
    });
    setTimeout(() => {
      this.setDonationAmountWidth(this.refDonationAmount.current);
    }, 1);
  }

  // componentDidUpdate(){
  //     if(this.props.adoptImg.image !== this.state.artworkImg)
  //     {
  //         this.setState({ artworkImg: this.props.adoptImg.image })
  //     }

  //     if(this.props.artworkPrivilege !== this.state.artworkPrivilege)
  //     {
  //         this.setState({ artworkPrivilege: this.props.artworkPrivilege});
  //     }
  // }

  render() {
    return /*#__PURE__*/_react.default.createElement("div", {
      className: "sec-donation-style-2 form"
    }, /*#__PURE__*/_react.default.createElement("button", {
      className: "btn btn-light btn-close",
      onClick: () => this.props.close('DonationWidget')
    }, /*#__PURE__*/_react.default.createElement(_react.Suspense, {
      fallback: null
    }, /*#__PURE__*/_react.default.createElement(ImageLoader, {
      type: "image",
      src: "/images/popup-close.svg"
    }))), /*#__PURE__*/_react.default.createElement("div", {
      className: "question"
    }, this.state.blockTitle), /*#__PURE__*/_react.default.createElement("div", {
      className: "solution"
    }, this.state.blockSubTitle), /*#__PURE__*/_react.default.createElement("div", {
      className: "input-solution"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "input-solution plus-minus"
    }, /*#__PURE__*/_react.default.createElement("button", {
      onClick: this.Decrement,
      disabled: this.state.isDecrementBtn,
      className: "btn btn-light minus"
    }, /*#__PURE__*/_react.default.createElement(_react.Suspense, {
      fallback: null
    }, /*#__PURE__*/_react.default.createElement(ImageLoader, {
      type: "image",
      src: "/images/sign-minus.svg"
    }))), /*#__PURE__*/_react.default.createElement("div", {
      className: "line"
    }), /*#__PURE__*/_react.default.createElement("input", {
      type: "text",
      maxLength: "8",
      ref: this.refDonationAmount,
      placeholder: "$0",
      onKeyPress: this.handleKeyPress,
      onBlur: this.onBlurDonationAmount,
      defaultValue: this.state.donationAmount ? (0, _common.commaSeperatedAmount)(_common.CURRENCY_SYMBOL, this.state.donationAmount) : '',
      onChange: this.onChangeDonationAmount,
      className: "donation-value form-control"
    }), /*#__PURE__*/_react.default.createElement("div", {
      className: "line"
    }), /*#__PURE__*/_react.default.createElement("button", {
      onClick: this.Increment,
      disabled: this.state.isIncrementBtn,
      className: "btn btn-light plus"
    }, /*#__PURE__*/_react.default.createElement(_react.Suspense, {
      fallback: null
    }, /*#__PURE__*/_react.default.createElement(ImageLoader, {
      type: "image",
      src: "/images/sign-plus.svg"
    }))))), /*#__PURE__*/_react.default.createElement("div", {
      ref: this.refFixedDonationAmount,
      className: "c-amount-options"
    }, this.state.amoutOptions.map((item, index) => {
      return /*#__PURE__*/_react.default.createElement("button", {
        type: "button",
        onClick: this.onClickFixedDonationAmount,
        className: "btn btn-light",
        key: index
      }, (0, _common.commaSeperatedAmount)(_common.CURRENCY_SYMBOL, item));
    })), /*#__PURE__*/_react.default.createElement("div", {
      className: "donation-type"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "title"
    }, "Adoption Type"), /*#__PURE__*/_react.default.createElement("div", {
      ref: this.refType,
      className: "type"
    }, this.state.donationTypeOptions.map((item, index) => {
      return /*#__PURE__*/_react.default.createElement("button", {
        type: "button",
        "data-type": item.id,
        onClick: this.onClickDonationType,
        className: "btn btn-light " + (parseInt(item.id) === 1 ? 'selected' : ''),
        key: index
      }, item.value);
    }))), /*#__PURE__*/_react.default.createElement("div", {
      className: "c-btn-donate"
    }, /*#__PURE__*/_react.default.createElement("button", {
      type: "button",
      ref: this.refDonateNowBtn,
      onClick: this.onClickDonateNow,
      artworkPrivilege: this.state.artworkPrivilege,
      className: "btn btn-dark h-45",
      disabled: this.state.isDonateBtnEnabled
    }, "UPDATE")), /*#__PURE__*/_react.default.createElement("div", {
      className: "note"
    }));
  }
}
_defineProperty(AdoptDonationWidget, "contextType", _context.default);
var _default = (0, _reactRouterDom.withRouter)(AdoptDonationWidget);
exports.default = _default;