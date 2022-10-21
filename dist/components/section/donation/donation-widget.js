"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.string.replace.js");
require("core-js/modules/es.parse-float.js");
require("core-js/modules/es.string.match.js");
require("core-js/modules/es.array.includes.js");
require("core-js/modules/es.string.includes.js");
require("core-js/modules/es.regexp.to-string.js");
require("core-js/modules/es.number.to-fixed.js");
require("core-js/modules/es.parse-int.js");
require("core-js/modules/es.string.trim.js");
var _react = _interopRequireDefault(require("react"));
var _context = _interopRequireDefault(require("../../context"));
var _common = require("../../common");
var _common2 = require("../../common/common");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
class DonationWidget extends _react.default.Component {
  constructor(props) {
    var _this$props, _this$props$name, _this$props2, _this$props2$name, _this$props3, _this$props3$name, _this$props4, _this$props4$name, _this$props5, _this$props5$name, _this$porps, _this$porps$name, _this$props6, _this$props6$name, _this$props7, _this$props7$name;
    super(props);
    console.log('344343', this.props.name);
    this.state = {
      donationWidget: true,
      latestDontaionText: '',
      donationFrequency: [],
      taxDedutionText: this === null || this === void 0 ? void 0 : (_this$props = this.props) === null || _this$props === void 0 ? void 0 : (_this$props$name = _this$props.name) === null || _this$props$name === void 0 ? void 0 : _this$props$name.taxDedutionText,
      isldtVisible: false,
      isDonationFrequency: false,
      isTaxText: true,
      amoutOptions: this === null || this === void 0 ? void 0 : (_this$props2 = this.props) === null || _this$props2 === void 0 ? void 0 : (_this$props2$name = _this$props2.name) === null || _this$props2$name === void 0 ? void 0 : _this$props2$name.amoutOptions,
      regularFrequencyOptions: this === null || this === void 0 ? void 0 : (_this$props3 = this.props) === null || _this$props3 === void 0 ? void 0 : (_this$props3$name = _this$props3.name) === null || _this$props3$name === void 0 ? void 0 : _this$props3$name.regularFrequencyOptions,
      donationFrequencyOptions: this === null || this === void 0 ? void 0 : (_this$props4 = this.props) === null || _this$props4 === void 0 ? void 0 : (_this$props4$name = _this$props4.name) === null || _this$props4$name === void 0 ? void 0 : _this$props4$name.donationFrequencyOptions,
      donationTypeOptions: this === null || this === void 0 ? void 0 : (_this$props5 = this.props) === null || _this$props5 === void 0 ? void 0 : (_this$props5$name = _this$props5.name) === null || _this$props5$name === void 0 ? void 0 : _this$props5$name.donationTypeOptions,
      donationAmount: 0,
      frequency: 1,
      regularFrequency: 0,
      donationType: 1,
      blockTitle: this === null || this === void 0 ? void 0 : (_this$porps = this.porps) === null || _this$porps === void 0 ? void 0 : (_this$porps$name = _this$porps.name) === null || _this$porps$name === void 0 ? void 0 : _this$porps$name.blockTitle,
      blockSubTitle: this === null || this === void 0 ? void 0 : (_this$props6 = this.props) === null || _this$props6 === void 0 ? void 0 : (_this$props6$name = _this$props6.name) === null || _this$props6$name === void 0 ? void 0 : _this$props6$name.blockSubTitle,
      decimalval: false,
      isDonateBtnEnabled: false,
      pageName: this === null || this === void 0 ? void 0 : (_this$props7 = this.props) === null || _this$props7 === void 0 ? void 0 : (_this$props7$name = _this$props7.name) === null || _this$props7$name === void 0 ? void 0 : _this$props7$name.pageName
    };
    this.refDonationAmount = /*#__PURE__*/_react.default.createRef();
    this.refFixedDonationAmount = /*#__PURE__*/_react.default.createRef();
    this.refFrequency = /*#__PURE__*/_react.default.createRef();
    this.refRegularFrequencyOptions = /*#__PURE__*/_react.default.createRef();
    this.refType = /*#__PURE__*/_react.default.createRef();
    this.refDonateNowBtn = /*#__PURE__*/_react.default.createRef();
    this.onFocusDonationAmount = this.onFocusDonationAmount.bind(this);
    this.onChangeDonationAmount = this.onChangeDonationAmount.bind(this);
    this.onBlurDonationAmount = this.onBlurDonationAmount.bind(this);
    this.setDonationAmountWidth = this.setDonationAmountWidth.bind(this);
    this.onClickFixedDonationAmount = this.onClickFixedDonationAmount.bind(this);
    this.onClickDonationFrequency = this.onClickDonationFrequency.bind(this);
    this.onClickRegularFrequencyOptions = this.onClickRegularFrequencyOptions.bind(this);
    this.onClickDonationType = this.onClickDonationType.bind(this);
    this.onClickDonateNow = this.onClickDonateNow.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }
  onFocusDonationAmount(e) {
    let ele = e.target;
    let val = ele.value.replace('$', '');
    if (!val) {
      ele.value = '$';
      this.refDonateNowBtn.current.setAttribute('disabled', 'disabled');
    } else {
      ele.classList.remove('is-invalid');
      ele.value = '$' + (val.indexOf(',') !== -1 ? val.replace(',', '') : val);
    }
  }
  onChangeDonationAmount(e) {
    var _ele$value$replace$ma, _ele$value$replace$ma2;
    let ele = e.target;
    // console.log("ele.value : " + parseFloat(ele.value.replace('$', '').match(/[0-9]*\.[0-9][0-9]/g)?.join('')) ? ele.value : parseInt(ele.value.replace('$', '').match(/[0-9]*\.[0-9][0-9]/g)?.join('')));
    let val = parseFloat((_ele$value$replace$ma = ele.value.replace('$', '').match(/^[0-9]$/g)) === null || _ele$value$replace$ma === void 0 ? void 0 : _ele$value$replace$ma.join(''));
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
    let context = this.context.PaymentContext;
    let eleFixedDonationAmount = this.refFixedDonationAmount.current;
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
    if (val >= context[context.donationMethod].default.minAmount) {
      // console.log("val : " , val);
      ele.value = this.refDonationAmount.current.value.replace(/[A-Za-z ~`!,@#%^&()_={}[\]:;<>+\/?-]/g, "");
      // let newval = commaSeperatedAmount(CURRENCY_SYMBOL, val);
      // console.log("ref value : " , commaSeperatedAmount(CURRENCY_SYMBOL, this.refDonationAmount.current.value.replace('$','')));
      // console.log("ele.value : " , ele.value);
      // console.log("newval : " , newval);
      // ele.value = commaSeperatedAmount(CURRENCY_SYMBOL, val.toString().replace('$',''))
      this.setDonationAmountWidth(ele);
      this.state.frequency === 2 && this.state.regularFrequency === 0 ? this.setState({
        isDonateBtnEnabled: true
      }) : this.setState({
        isDonateBtnEnabled: false
      });
      // this.refDonateNowBtn.current.removeAttribute('disabled');

      eleFixedDonationAmount.childNodes.forEach(item => {
        if (parseFloat(item.innerText.trim().replace('$', '')) === val) {
          item.classList.add('selected');
        } else {
          item.classList.remove('selected');
        }
      });
      ele.value = (0, _common.commaSeperatedAmount)(_common.CURRENCY_SYMBOL, this.refDonationAmount.current.value.replace('$', ''));
    } else {
      ele.value = '$' + (val && val.toString() !== 'NaN' ? val : '');
      eleFixedDonationAmount.childNodes.forEach(item => {
        item.classList.remove('selected');
      });
      this.refDonateNowBtn.current.setAttribute('disabled', 'disabled');
    }
  }
  onBlurDonationAmount(e) {
    let ele = e.target;
    let val = ele.value.replace('$', '');
    ele.value = (0, _common.commaSeperatedAmount)('$', val);
  }
  setDonationAmountWidth(ele) {
    ele.style.width = ele.value.length * 25 + 'px';
  }
  onClickFixedDonationAmount(e) {
    let ele = e.target;
    let val = ele.innerText.trim();
    ele.parentNode.childNodes.forEach(ele => ele.classList.remove('selected'));
    ele.classList.add('selected');
    ele.classList.remove('is-invalid');
    this.refDonationAmount.current.value = val;
    if (this.refDonationAmount.current.value !== '$') {
      this.state.frequency === 2 && this.state.regularFrequency === 0 ? this.setState({
        isDonateBtnEnabled: true
      }) : this.setState({
        isDonateBtnEnabled: false
      });
    } else {
      this.setState({
        isDonateBtnEnabled: true
      });
    }
    this.setDonationAmountWidth(this.refDonationAmount.current);
    // this.refDonateNowBtn.current.removeAttribute('disabled');
    this.setState({
      donationAmount: parseFloat(val.substr(1))
    });
  }
  onClickDonationFrequency(e) {
    let ele = e.target;
    let dataType = parseInt(ele.getAttribute('data-type'));
    let context = this.context.PaymentContext;
    ele.parentNode.childNodes.forEach(ele => ele.classList.remove('selected'));
    if (dataType !== 2) {
      if (this.refDonationAmount.current.value === '$' || this.refDonationAmount.current.value.replace('$', '') < context[context.donationMethod].default.minAmount) {
        this.setState({
          isDonateBtnEnabled: true
        });
      } else {
        this.refDonationAmount.current.value.replace('$', '') < context[context.donationMethod].default.minAmount ? this.setState({
          isDonateBtnEnabled: true
        }) : this.setState({
          isDonateBtnEnabled: false
        });
      }
      this.refRegularFrequencyOptions.current.childNodes.forEach(ele => ele.classList.remove('selected'));
    } else {
      let isRegularSelected = false;
      this.refRegularFrequencyOptions.current.childNodes.forEach(item => {
        if (item.classList.contains('selected')) {
          isRegularSelected = true;
        }
      });
      isRegularSelected ? this.setState({
        isDonateBtnEnabled: false
      }) : this.setState({
        isDonateBtnEnabled: true
      });
    }
    this.setState({
      frequency: dataType,
      regularFrequency: dataType !== 2 ? 0 : this.state.regularFrequency
    }); //ele.target.innerText
    ele.classList.add('selected');
  }
  onClickRegularFrequencyOptions(e) {
    let ele = e.target;
    let dataType = parseInt(ele.getAttribute('data-type'));
    let context = this.context.PaymentContext;
    ele.parentNode.childNodes.forEach(ele => ele.classList.remove('selected'));
    if (dataType !== 0 && this.refDonationAmount.current.value !== '$' && this.refDonationAmount.current.value.replace(/[^\w\s]/gi, '') >= context[context.donationMethod].default.minAmount) {
      this.setState({
        isDonateBtnEnabled: false
      });
    } else {
      this.setState({
        isDonateBtnEnabled: true
      });
    }
    this.setState({
      regularFrequency: dataType
    }); //ele.target.innerText
    ele.classList.add('selected');
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
  onClickDonateNow(e) {
    var _this$context2;
    let eleDonationAmount = this.refDonationAmount.current;
    let val = eleDonationAmount.value.trim().substr(1);
    val = val.indexOf(',') !== -1 ? val.replace(',', '') : val;
    let PaymentContext = (_this$context2 = this.context) === null || _this$context2 === void 0 ? void 0 : _this$context2.PaymentContext;
    let method = PaymentContext.donationMethod;
    if (eleDonationAmount.value.trim() && val) {
      //eleDonationAmount.classList.remove('is-invalid');
      //this.setState({ donationAmount: parseFloat(val) });
      PaymentContext[method].donationAmount = parseFloat(val);
      this.refFrequency.current.childNodes.forEach(item => {
        if (item.classList.contains('selected')) {
          PaymentContext[method].frequency = item.innerText.trim().toLowerCase();
          return;
        }
      });
      this.refRegularFrequencyOptions.current.childNodes.forEach(item => {
        if (item.classList.contains('selected')) {
          PaymentContext[method].partPayment = item.innerText.trim();
          return;
        }
      });
      this.refType.current.childNodes.forEach(item => {
        if (item.classList.contains('selected')) {
          PaymentContext[method].entity = item.innerText.trim().toLowerCase();
          return;
        }
      });
      console.log('909090', PaymentContext);
      // alert(PaymentContext);
      // this.props.history.push('/payments', true)
      // this.props.history.push(this.state.pageName, data={PaymentContext})
      this.props.name.pageName(PaymentContext);
    } else {
      //eleDonationAmount.classList.add('is-invalid');
      eleDonationAmount.value = '';
      return false;
    }

    // change to default if moving from charity
    PaymentContext.cause.name = PaymentContext.cause.default.name;
  }
  render() {
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, this.state.amoutOptions.length ? /*#__PURE__*/_react.default.createElement("div", {
      className: "landing-page"
    }, /*#__PURE__*/_react.default.createElement("div", {
      id: "HOME",
      className: "sec-banner pos-rel"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "container pos-rel"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "c-donation-widget"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "sec-donation form"
    }, this.state.isldtVisible && _common2.Common.isValidField(this.state.latestDontaionText) ? /*#__PURE__*/_react.default.createElement("div", {
      className: "donation-to-user",
      title: this.state.latestDontaionText
    }, (0, _common.TEXT_TRIM)(this.state.latestDontaionText, 95)) : '', /*#__PURE__*/_react.default.createElement("div", {
      className: "question"
    }, this.state.blockTitle), /*#__PURE__*/_react.default.createElement("div", {
      className: "question"
    }, this.state.blockSubTitle), /*#__PURE__*/_react.default.createElement("div", {
      className: "solution"
    }, "Please enter donation amount below"), /*#__PURE__*/_react.default.createElement("div", {
      className: "input-solution"
    }, /*#__PURE__*/_react.default.createElement("input", {
      type: "text",
      maxLength: "8",
      ref: this.refDonationAmount,
      placeholder: "$0",
      onKeyPress: this.handleKeyPress,
      defaultValue: this.state.donationAmount ? (0, _common.commaSeperatedAmount)(_common.CURRENCY_SYMBOL, this.state.donationAmount) : '',
      onChange: this.onChangeDonationAmount /* onFocus={this.onFocusDonationAmount} */ /* onBlur={this.onBlurDonationAmount} */,
      className: "donation-value form-control"
    }), /*#__PURE__*/_react.default.createElement("div", {
      className: "line"
    })), /*#__PURE__*/_react.default.createElement("div", {
      ref: this.refFixedDonationAmount,
      className: "c-amount-options"
    }, this.state.amoutOptions.length ? this.state.amoutOptions.map((item, index) => {
      return /*#__PURE__*/_react.default.createElement("button", {
        type: "button",
        onClick: this.onClickFixedDonationAmount,
        className: "btn btn-light",
        key: index
      }, (0, _common.commaSeperatedAmount)(_common.CURRENCY_SYMBOL, item));
    }) : null), this.state.regularFrequencyOptions.length <= 0 ? /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, " ") : /*#__PURE__*/_react.default.createElement("div", {
      className: "frequency"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "title"
    }, "Donation Frequency"), /*#__PURE__*/_react.default.createElement("div", {
      ref: this.refFrequency,
      className: "type"
    }, this.state.donationFrequencyOptions.map((item, index) => {
      return /*#__PURE__*/_react.default.createElement("button", {
        type: "button",
        "data-type": item.id,
        onClick: this.onClickDonationFrequency,
        className: "btn btn-light " + (parseInt(item.id) === 1 ? 'selected' : ''),
        key: index
      }, item.value);
    })), /*#__PURE__*/_react.default.createElement("div", {
      className: "type-regular-options"
    }, /*#__PURE__*/_react.default.createElement("div", {
      ref: this.refRegularFrequencyOptions
    }, this.state.regularFrequencyOptions.map((item, index) => {
      return /*#__PURE__*/_react.default.createElement("button", {
        type: "button",
        "data-type": item.id,
        onClick: this.onClickRegularFrequencyOptions,
        className: "btn btn-light",
        key: index,
        disabled: this.state.frequency !== 2 ? true : false
      }, item.title);
    })))), /*#__PURE__*/_react.default.createElement("div", {
      className: "donation-type"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "title"
    }, "Donation Type"), /*#__PURE__*/_react.default.createElement("div", {
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
      disabled: this.state.isDonateBtnEnabled,
      onClick: this.onClickDonateNow,
      className: "btn btn-dark h-45"
    }, "Donate Now")), this.state.isTaxText ? /*#__PURE__*/_react.default.createElement("div", {
      className: "note"
    }, this.state.taxDedutionText) : null))))) : null);
  }
}
_defineProperty(DonationWidget, "contextType", _context.default);
var _default = DonationWidget;
exports.default = _default;