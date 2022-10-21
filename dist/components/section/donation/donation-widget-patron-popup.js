"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/es.promise.js");
require("core-js/modules/es.parse-float.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.string.replace.js");
require("core-js/modules/es.string.trim.js");
require("core-js/modules/es.number.to-fixed.js");
require("core-js/modules/es.parse-int.js");
require("core-js/modules/es.string.match.js");
require("core-js/modules/es.array.includes.js");
require("core-js/modules/es.string.includes.js");
require("core-js/modules/es.regexp.to-string.js");
require("core-js/modules/web.dom-collections.iterator.js");
var _react = _interopRequireWildcard(require("react"));
var _context = _interopRequireDefault(require("../../context"));
var _common = require("../../common");
require("./css/donation-widget.css");
var _reactRouterDom = require("react-router-dom");
var _homePageService = require("../../jwt/_services/home-page-service");
var _constant = require("../../common/constant");
var _common2 = require("../../common/common");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const ImageLoader = /*#__PURE__*/(0, _react.lazy)(() => Promise.resolve().then(() => _interopRequireWildcard(require('../../common/image-loader'))));
class DonationWidgetPatronPopup extends _react.default.Component {
  constructor(props) {
    var _this$props$donationW;
    super(props);
    this.state = {
      heading: '',
      blockTitle: this.props.blockTitle ? this.props.blockTitle : '',
      blockSubTitle: this.props.blockSubTitle ? this.props.blockSubTitle : '',
      donationFrequencyOptions: [{
        id: 1,
        value: 'One Time'
      }, {
        id: 2,
        value: 'Annual'
      }],
      donationTypeOptions: [{
        id: 1,
        value: 'Individual'
      }, {
        id: 2,
        value: 'Corporate'
      }],
      donationAmount: 0,
      frequency: 1,
      regularFrequency: 0,
      donateBtnTxt: '',
      donationType: 1,
      latestDonationText: this.props.donationWidgetData ? this.props.donationWidgetData.latestDonationText : '',
      taxDedutionText: this.props.donationWidgetData ? this.props.donationWidgetData.taxDeductibleText : 'Donate $50 & above, you are entitled to a 250% tax deduction',
      amoutOptions: _common2.Common.isValidField(this.props.location.state) ? this.props.location.state.detail : [],
      donationAmounts: this.props.donationWidgetData ? parseFloat(this.props.donationWidgetData.donationAmounts[(_this$props$donationW = this.props.donationWidgetData.defaultAmountPosition) !== null && _this$props$donationW !== void 0 ? _this$props$donationW : 0]) : 0,
      isDonateBtnEnabled: false,
      isIncrementBtn: false,
      isDecrementBtn: false,
      decimalval: false
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
    this.setData = this.setData.bind(this);
    this.highlightFixAmount = this.highlightFixAmount.bind(this);
    this.Increment = this.Increment.bind(this);
    this.Decrement = this.Decrement.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }
  highlightFixAmount(amt) {
    this.refFixedDonationAmount.current.childNodes.forEach(item => {
      if ((0, _common.commaSeperatedAmount)(_common.CURRENCY_SYMBOL, amt) === item.innerText) {
        item.classList.add('selected');
        item.click();
      } else {
        item.classList.remove('selected');
      }
    });
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
  Increment() {
    let eleDonationAmount = this.refDonationAmount.current;
    let val = eleDonationAmount.value.trim().replace(/[$,]/gi, '');
    if (val === '') {
      val = 0;
    }
    val = parseFloat(val);
    if (val !== _constant.PATRON_MAX_AMOUNT) {
      val += 500.00;
      val = val.toFixed(2);
      this.refFixedDonationAmount.current.childNodes.forEach(item => {
        if (parseInt(item.innerText.trim().replace(/[$,]/gi, '')) === parseInt(val)) {
          item.classList.add('selected');
        } else {
          item.classList.remove('selected');
        }
      });
      if (val >= _constant.PATRON_MIN_AMOUNT) {
        this.setState({
          isDonateBtnEnabled: false
        });
      } else {
        this.setState({
          isDonateBtnEnabled: true
        });
      }
      this.setState({
        isDecrementBtn: false
      });
      if (val >= _constant.PATRON_MAX_AMOUNT) {
        this.refDonationAmount.current.value = (0, _common.commaSeperatedAmount)(_common.CURRENCY_SYMBOL, _constant.PATRON_MAX_AMOUNT);
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
  }
  Decrement() {
    let eleDonationAmount = this.refDonationAmount.current;
    let val = eleDonationAmount.value.trim().replace(/[$,]/gi, '');
    if (val !== '') {
      val = parseFloat(val);
      if (val !== 0 && val > _constant.PATRON_MIN_AMOUNT) {
        val -= 500.00;
        val = val.toFixed(2);
        this.refFixedDonationAmount.current.childNodes.forEach(item => {
          if (parseInt(item.innerText.trim().replace(/[$,]/gi, '')) === parseInt(val)) {
            item.classList.add('selected');
          } else {
            item.classList.remove('selected');
          }
        });
        // this.props.setPatronProgram(val);
        val < _constant.PATRON_MIN_AMOUNT ? this.setState({
          isDonateBtnEnabled: true
        }) : this.setState({
          isDonateBtnEnabled: false
        });
        this.setState({
          isIncrementBtn: false
        });
      } else if (val <= _constant.PATRON_MIN_AMOUNT) {
        this.setState({
          isDecrementBtn: true
        });
      } else {
        val >= _constant.PATRON_MIN_AMOUNT ? this.setState({
          isDonateBtnEnabled: false,
          isDecrementBtn: false
        }) : this.setState({
          isDonateBtnEnabled: true,
          isDecrementBtn: true
        });
      }
      // else
      // {
      //     if(val >= PATRON_MIN_AMOUNT) {
      //         this.setState({ isDonateBtnEnabled : false, isDecrementBtn : false})
      //     } else { this.setState({ isDonateBtnEnabled : true, isDecrementBtn : true });
      //     }
      // }
    } else {
      this.setState({
        isDecrementBtn: true
      });
    }
    this.refDonationAmount.current.value = (0, _common.commaSeperatedAmount)(_common.CURRENCY_SYMBOL, val);
    this.setDonationAmountWidth(eleDonationAmount);
  }
  onChangeDonationAmount(e) {
    var _ele$value$replace$ma, _ele$value$replace$ma2;
    let ele = e.target;
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
      val < context[context.donationMethod].default.minAmount ? this.setState({
        isDonateBtnEnabled: true
      }) : this.setState({
        isDonateBtnEnabled: false
      });
    }
    // else
    // {
    //     this.setState({ isDonateBtnEnabled : true })
    // }

    if (val >= context.patron.default.minAmount) {
      ele.value = this.refDonationAmount.current.value.replace(/[A-Za-z ~`!,@#%^&()_={}[\]:;<>+\/?-]/g, "");
      // let newval = commaSeperatedAmount(CURRENCY_SYMBOL, val);
      // ele.value = commaSeperatedAmount(CURRENCY_SYMBOL, val.toString().replace('$',''))
      this.setDonationAmountWidth(ele);
      // this.state.frequency === 2 && this.state.regularFrequency === 0 ? this.setState({ isDonateBtnEnabled: true }) : this.setState({ isDonateBtnEnabled : false});
      // this.refDonateNowBtn.current.removeAttribute('disabled');

      eleFixedDonationAmount.childNodes.forEach(item => {
        if (parseInt(item.innerText.trim().replace(/[$,]/gi, '')) === parseInt(val)) {
          item.classList.add('selected');
        } else {
          item.classList.remove('selected');
        }
      });
      ele.value = (0, _common.commaSeperatedAmount)(_common.CURRENCY_SYMBOL, this.refDonationAmount.current.value.replace('$', ''));
      this.refFixedDonationAmount.current.childNodes.forEach(item => {
        if (parseInt(ele.value.replace(/[$,]/gi, '')) == item.innerText.replace(/[$,]/gi, '')) {
          item.classList.add('selected');
          //item.click();
          this.setDonationAmountWidth(this.refDonationAmount.current);
        } else {
          item.classList.remove('selected');
        }
      });
      this.setState({
        isDonateBtnEnabled: false
      });
    } else {
      ele.value = '$' + (val && val.toString() !== 'NaN' ? val : '');
      eleFixedDonationAmount.childNodes.forEach(item => {
        item.classList.remove('selected');
      });
      this.setState({
        isDonateBtnEnabled: true
      });
    }
  }

  // onChangeDonationAmount(e) {
  //     let ele = e.target;
  //     let val = parseFloat(ele.value.replace('$', '').match(/[0-9]/g)?.join(''));
  //     let context = this.context.PaymentContext;
  //     let eleFixedDonationAmount = this.refFixedDonationAmount.current;

  //     if(this.refDonationAmount.current.value !== '$' && this.state.isDonateBtnEnabled === true)
  //     {
  //         this.refDonationAmount.current.value.replace('$','') < context[context.donationMethod].default.minAmount ? this.setState({ isDonateBtnEnabled : true }) : this.setState({ isDonateBtnEnabled : false }) ;
  //     }
  //     else
  //     {
  //         this.setState({ isDonateBtnEnabled : true })
  //     }

  //     if (val >= context[context.donationMethod].default.minAmount) {
  //         ele.value = commaSeperatedAmount(CURRENCY_SYMBOL, val);
  //         this.setDonationAmountWidth(ele);

  //         this.state.frequency === 2 && this.state.regularFrequency === 0 ? this.setState({ isDonateBtnEnabled: true }) : this.setState({ isDonateBtnEnabled : false});
  //         // this.refDonateNowBtn.current.removeAttribute('disabled');

  //         eleFixedDonationAmount.childNodes.forEach((item) => {
  //             if (parseFloat(item.innerText.trim().replace('$', '')) === val) {
  //                 item.classList.add('selected');
  //             } else {
  //                 item.classList.remove('selected');
  //             }
  //         });
  //     }
  //     else {
  //         ele.value = '$' + (val && val.toString() !== 'NaN' ? val : '');
  //         eleFixedDonationAmount.childNodes.forEach((item) => {
  //             item.classList.remove('selected');
  //         });
  //         this.refDonateNowBtn.current.setAttribute('disabled', 'disabled');
  //     }
  // }

  onBlurDonationAmount(e) {
    let ele = e.target;
    let val = ele.value.replace('$', '');
    // ele.value = commaSeperatedAmount('$', val);
    let eleFixedDonationAmount = this.refFixedDonationAmount.current;
    if (val < _constant.PATRON_MIN_AMOUNT) {
      this.refDonationAmount.current.value = (0, _common.commaSeperatedAmount)('$', _constant.PATRON_MIN_AMOUNT);
      eleFixedDonationAmount.childNodes.forEach(item => {
        if (parseFloat(item.innerText.trim().replace(/[$,]/gi, '')) === _constant.PATRON_MIN_AMOUNT) {
          item.classList.add('selected');
        } else {
          item.classList.remove('selected');
        }
      });
      // this.props.setPatronProgram(PATRON_MIN_AMOUNT);
      this.setState({
        isDonateBtnEnabled: false
      });
    }
  }
  setDonationAmountWidth(ele) {
    ele.style.width = ele.value.length * 25 + 'px';
  }
  onClickFixedDonationAmount(e) {
    var _val$replace$match;
    let ele = e.target;
    let val = ele.innerText.trim();
    ele.parentNode.childNodes.forEach(ele => ele.classList.remove('selected'));
    ele.classList.add('selected');
    ele.classList.remove('is-invalid');
    this.refDonationAmount.current.value = val;
    if (val.replace(/[$,]/gi, '') == _constant.PATRON_MIN_AMOUNT) {
      this.setState({
        isDecrementBtn: true,
        isIncrementBtn: false
      });
    } else {
      val.replace(/[$,]/gi, '') > _constant.PATRON_MIN_AMOUNT ? this.setState({
        isDecrementBtn: false,
        isIncrementBtn: false
      }) : this.setState({
        isDecrementBtn: false,
        isIncrementBtn: true
      });
    }
    this.setDonationAmountWidth(this.refDonationAmount.current);
    this.setState({
      isDonateBtnEnabled: false
    });
    this.refDonateNowBtn.current.removeAttribute('disabled');
    // this.setState({ donationAmount: parseFloat(val.substr(1)),donateBtnTxt:`Donate ${val} Now` });
    let newVal = parseFloat((_val$replace$match = val.replace(/[$,]/gi, '').match(/[0-9]/g)) === null || _val$replace$match === void 0 ? void 0 : _val$replace$match.join(''));
    // this.props.getPatronOffers(newVal)
  }

  onClickDonationFrequency(e) {
    let ele = e.target;
    let dataType = parseInt(ele.getAttribute('data-type'));
    // let PaymentContext = this.context.PaymentContext;

    ele.parentNode.childNodes.forEach(ele => ele.classList.remove('selected'));
    this.refDonationAmount.current.value !== '$' && this.refDonationAmount.current.value.replace(/[$,]/gi, '') >= _constant.PATRON_MIN_AMOUNT ? this.setState({
      isDonateBtnEnabled: false
    }) : this.setState({
      isDonateBtnEnabled: true
    });
    // else {
    //     this.setState({ isDonateBtnEnabled : true });
    // }

    // PaymentContext[PaymentContext.donationMethod].frequency = dataType;
    this.setState({
      frequency: dataType,
      regularFrequency: dataType !== 2 ? 0 : this.state.regularFrequency
    }); //ele.target.innerText
    ele.classList.add('selected');
  }
  onClickRegularFrequencyOptions(e) {
    let ele = e.target;
    let dataType = parseInt(ele.getAttribute('data-type'));
    // let PaymentContext = this.context?.PaymentContext;

    ele.parentNode.childNodes.forEach(ele => ele.classList.remove('selected'));
    // PaymentContext[PaymentContext.donationMethod].frequency = dataType;

    // dataType !== 0 ? this.setState({ isDonateBtnEnabled : false }) : this.setState({ isDonateBtnEnabled : true })

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
  onClickDonateNow(e) {
    var _this$context;
    let eleDonationAmount = this.refDonationAmount.current;
    let val = eleDonationAmount.value.trim().replace(/[$,]/gi, '');
    val = val.indexOf(',') !== -1 ? val.replace(',', '') : val;
    let PaymentContext = (_this$context = this.context) === null || _this$context === void 0 ? void 0 : _this$context.PaymentContext;
    let method = PaymentContext.donationMethod;
    if (eleDonationAmount.value.trim() && val) {
      //eleDonationAmount.classList.remove('is-invalid');
      //this.setState({ donationAmount: parseFloat(val) });
      PaymentContext.patron.donationAmount = parseFloat(val);
      this.refFrequency.current.childNodes.forEach(item => {
        if (item.classList.contains('selected')) {
          PaymentContext.patron.frequency = item.innerText === 'Annual' ? 'Annually' : item.innerText.trim();
          return;
        }
      });
      this.refType.current.childNodes.forEach(item => {
        if (item.classList.contains('selected')) {
          PaymentContext.patron.entity = item.innerText.trim();
          return;
        }
      });
      if (this.props.isNavigate) {
        this.props.history.push(this.props.navLink);
      } else {
        this.props.updateDonationAmount();
        this.props.close('DonationWidget');
      }
    } else {
      eleDonationAmount.value = '';
      return false;
    }
    this.props.getPatronOffers(val);
  }
  handleKeyPress(e) {
    var _this$context2;
    let PaymentContext = (_this$context2 = this.context) === null || _this$context2 === void 0 ? void 0 : _this$context2.PaymentContext;
    let val = e.target.value;
    val = parseInt(val.replace(/[$,]/gi, ''));
    if (val !== PaymentContext[PaymentContext.donationMethod].default.maxAmount && e.key === '.') {
      this.setState({
        decimalval: true
      });
      e.target.setAttribute('maxlength', 11);
    }
  }
  componentDidMount() {
    var _this$context3;
    let PaymentContext = (_this$context3 = this.context) === null || _this$context3 === void 0 ? void 0 : _this$context3.PaymentContext;
    let frequency = PaymentContext.patron.frequency;
    const context = this.context;
    const donationBlockDetails = context.blockDetails.filter(details => details.blockId === _constant.DONATION_WIDGET__BLOCK_ID);
    if (this.state.blockTitle === '') {
      this.setState({
        blockTitle: donationBlockDetails[0].blockTitle
      });
    }
    if (this.state.blockSubTitle === '') {
      this.setState({
        blockSubTitle: donationBlockDetails[0].blockSubTitle
      });
    }
    if (this.props.note) {
      this.setState({
        taxDeductibleText: this.props.note
      });
    }
    if (this.state.amoutOptions.length === 0) {
      let data = context.blockDetails[9].settings[1].settingValue;
      data = Array.from(data.split(','));
      this.setState({
        amoutOptions: [...data]
      });
    }
    this.refFrequency.current.childNodes.forEach(item => {
      if (frequency === item.innerText) {
        item.classList.add('selected');
      } else {
        item.classList.remove('selected');
      }
      if (frequency === 'Annually' && item.innerText.trim() === 'Annual') {
        item.classList.add('selected');
      }
    });
    PaymentContext.patron.donationAmount === _constant.PATRON_MIN_AMOUNT ? this.setState({
      isDecrementBtn: true
    }) : this.setState({
      isDecrementBtn: false
    });
    setTimeout(() => {
      this.setDonationAmountWidth(this.refDonationAmount.current);
      this.refFixedDonationAmount.current.childNodes.forEach(item => {
        if (item.innerText.trim() === (0, _common.commaSeperatedAmount)(_common.CURRENCY_SYMBOL, this.state.donationAmount)) {
          item.click();
        }
      });
    }, 250);

    // Check When Amount is updated from Summary Popup
    if (PaymentContext.patron.donationAmount !== this.props.donationWidgetData.selectedAmount) {
      this.setState({
        donationAmount: PaymentContext.patron.donationAmount
      });
      this.refDonationAmount.current.value = (0, _common.commaSeperatedAmount)(_common.CURRENCY_SYMBOL, PaymentContext.patron.donationAmount);

      // this.refFixedDonationAmount.current.childNodes.forEach(item => {
      //     if ((CURRENCY_SYMBOL + (parseFloat(PaymentContext[PaymentContext.donationMethod].donationAmount)) == item.innerText.replace(/[$,]/gi, ''))) {
      //         item.classList.add('selected');
      //         this.refDonateNowBtn.current.removeAttribute('disabled');
      //             this.props.getNewPatronOffers(parseFloat(item.innerText.replace(/[$,]/gi, '').match(/[0-9]/g)?.join('')))
      //     }
      // })

      if (this.state.amoutOptions.length !== 0) {
        this.refFixedDonationAmount.current.childNodes.forEach(item => {
          if (parseFloat(item.innerText.trim().replace(/[$,]/gi, '')) == PaymentContext.patron.donationAmount) {
            item.classList.add('selected');
          } else {
            item.classList.remove('selected');
          }
        });
      }
    } else {
      this.refFixedDonationAmount.current.childNodes.forEach(item => {
        if (_common.CURRENCY_SYMBOL + parseFloat(this.props.donationWidgetData.selectedAmount) === item.innerText) {
          var _item$innerTextreplac;
          item.classList.add('selected');
          this.refDonateNowBtn.current.removeAttribute('disabled');
          this.props.getNewPatronOffers(parseFloat((_item$innerTextreplac = item.innerTextreplace(/[$,]/gi, '').match(/[0-9]/g)) === null || _item$innerTextreplac === void 0 ? void 0 : _item$innerTextreplac.join('')));
        } else {
          this.refDonationAmount.current.value = (0, _common.commaSeperatedAmount)(_common.CURRENCY_SYMBOL, this.props.donationWidgetData.selectedAmount);
          item.classList.remove('selected');
        }
      });
    }
    if (this.props.isUpdate) {
      this.setData(PaymentContext);
    }
    // this.refFixedDonationAmount.current.childNodes.forEach(item => {
    //     if ((CURRENCY_SYMBOL + (parseFloat(this.props.donationWidgetData.donationAmounts[this.props.donationWidgetData.defaultAmountPosition ?? 0]) ?? 0)) === item.innerText) {
    //         item.classList.add('selected');
    //         this.refDonateNowBtn.current.removeAttribute('disabled');
    //         this.setState({donateBtnTxt:`Donate ${item.innerText} Now`})
    //         // if(this.props.isCampainDetails){
    //         // this.props.getPatronOffers(parseFloat(item.innerText.replace('$', '').match(/[0-9]/g)?.join('')))
    //         // }
    //     } else {
    //         item.classList.remove('selected');
    //     }
    // })

    // this.refType.current.childNodes.forEach(item => {
    //     item.innerText === PaymentContext[PaymentContext.donationMethod].entity ? item.classList.add('selected') : item.classList.remove('selected')
    // })

    // if(PaymentContext[PaymentContext.donationMethod].frequency !== "One Time")
    // {
    //     this.refFrequency.current.childNodes.forEach(item => {
    //         item.innerText === PaymentContext[PaymentContext.donationMethod].frequency ? item.classList.add('selected') : item.classList.remove('selected')
    //     })
    // }
  }

  // componentDidUpdate(){
  //     const context = this.context;
  //     let PaymentContext = this.context?.PaymentContext;

  //     if(this.state.amoutOptions.length === 0)
  //     {
  //         let values = context.blockDetails[9].settings[1].settingValue.split(',');
  //         this.setState({amoutOptions : [...values]})
  //         let val = this.refDonationAmount.current.value;
  //         val = val.replace(/[$,]/gi, '');

  //         this.refFixedDonationAmount.current.childNodes.forEach((item) => {
  //             if (parseFloat(item.innerText.trim().replace(/[$,]/gi, '')) == PaymentContext[PaymentContext.donationMethod].donationAmount) {
  //                 item.classList.add('selected');
  //             } else {
  //                 item.classList.remove('selected');
  //             }
  //         });
  //     }
  // }

  setData(PaymentContext) {
    let frequency = PaymentContext.patron.frequency;
    let donationType = PaymentContext.patron.entity;
    const context = this.context;
    frequency = frequency.replace(/\b[a-z]/g, x => x.toUpperCase());
    donationType = donationType.replace(/\b[a-z]/g, x => x.toUpperCase());
    this.refFrequency.current.childNodes.forEach(item => {
      if (frequency === item.innerText) {
        item.classList.add('selected');
      } else {
        item.classList.remove('selected');
      }
      if (frequency === 'Annually' && item.innerText.trim() === 'Annual') {
        item.classList.add('selected');
      }
    });
    this.refType.current.childNodes.forEach(ele => {
      if (donationType == ele.innerText) {
        ele.classList.add('selected');
        this.setState({
          donationType: 2
        });
      } else {
        this.setState({
          donationType: 1
        });
        ele.classList.remove('selected');
      }
    });
    let dataType;
    frequency === 'Annual' ? dataType = 2 : dataType = 1;
    if (dataType !== 2) {
      this.setState({
        frequency: 1
      });
    } else {
      this.setState({
        frequency: 2
      });
    }
    PaymentContext.patron.frequency = frequency;
    this.setState({
      frequency: dataType,
      regularFrequency: dataType !== 2 ? 0 : PaymentContext.frequency /*this.state.regularFrequency*/
    }); //ele.target.innerText
  }

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
    }))), this.state.isldtVisible ? /*#__PURE__*/_react.default.createElement("div", {
      className: "donation-to-user"
    }, this.state.latestDonationText) : '', /*#__PURE__*/_react.default.createElement("div", {
      className: "question"
    }, this.state.blockTitle), /*#__PURE__*/_react.default.createElement("div", {
      className: "solution"
    }, this.state.blockSubTitle), /*#__PURE__*/_react.default.createElement("div", {
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
      defaultValue: this.state.donationAmount ? (0, _common.commaSeperatedAmount)(_common.CURRENCY_SYMBOL, this.state.donationAmount) : '',
      onChange: this.onChangeDonationAmount,
      onBlur: this.onBlurDonationAmount /* onFocus={this.onFocusDonationAmount} */ /* onBlur={this.onBlurDonationAmount} */,
      className: "donation-value form-control"
    }), /*#__PURE__*/_react.default.createElement("button", {
      onClick: this.Increment,
      disabled: this.state.isIncrementBtn,
      className: "btn btn-light plus"
    }, /*#__PURE__*/_react.default.createElement(_react.Suspense, {
      fallback: null
    }, /*#__PURE__*/_react.default.createElement(ImageLoader, {
      type: "image",
      src: "/images/sign-plus.svg"
    })))), /*#__PURE__*/_react.default.createElement("div", {
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
    }))), /*#__PURE__*/_react.default.createElement("div", {
      className: "donation-type"
    }, /*#__PURE__*/_react.default.createElement("div", {
      className: "title"
    }, "Contribution Type"), /*#__PURE__*/_react.default.createElement("div", {
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
    }, "Update")), /*#__PURE__*/_react.default.createElement("div", {
      className: "note"
    }, this.state.taxDeductibleText));
  }
}
_defineProperty(DonationWidgetPatronPopup, "contextType", _context.default);
var _default = (0, _reactRouterDom.withRouter)(DonationWidgetPatronPopup);
exports.default = _default;