"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("core-js/modules/es.promise.js");
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
require("core-js/modules/web.dom-collections.iterator.js");
var _react = _interopRequireWildcard(require("react"));
var _context = _interopRequireDefault(require("../../context"));
var _common = require("../../common");
require("./css/donation-widget.css");
var _reactRouterDom = require("react-router-dom");
var _constant = require("../../common/constant");
var _homePageService = require("../../jwt/_services/home-page-service");
var _common2 = require("../../common/common");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const ImageLoader = /*#__PURE__*/(0, _react.lazy)(() => Promise.resolve().then(() => _interopRequireWildcard(require('../../common/image-loader'))));
class DonationWidgetStyle2 extends _react.default.Component {
  constructor(props) {
    var _this$props$donationW;
    super(props);
    // return false;
    this.state = {
      heading: '',
      blockTitle: this.props.blockTitle ? this.props.blockTitle : '',
      blockSubTitle: this.props.blockSubTitle ? this.props.blockSubTitle : '',
      // amoutOptions: [], //[5, 10, 20, 50, 100, 200],
      donationFrequencyOptions: [{
        id: 1,
        value: 'One Time'
      }, {
        id: 2,
        value: 'Recurrent'
      }],
      // regularFrequencyOptions: [], //[{ id: 1, value: 'Monthly' }, { id: 2, value: 'Quarterly' }, { id: 3, value: 'Annually' }],
      donationTypeOptions: [{
        id: 1,
        value: 'Individual'
      }, {
        id: 2,
        value: 'Corporate'
      }],
      frequency: 1,
      regularFrequency: 0,
      donateBtnTxt: '',
      donationType: 1,
      latestDonationText: this.props.donationWidgetData ? this.props.donationWidgetData.latestDonationText : '',
      taxDedutionText: this.props.donationWidgetData ? this.props.donationWidgetData.taxDeductibleText : '',
      regularFrequencyOptions: _common2.Common.isValidField(this.props.donationWidgetData.recurringTypes) ? this.props.donationWidgetData.recurringTypes : [],
      amoutOptions: _common2.Common.isValidField(this.props.donationWidgetData.donationAmounts) ? (_this$props$donationW = this.props.donationWidgetData.donationAmounts) === null || _this$props$donationW === void 0 ? void 0 : _this$props$donationW.slice(0, 6) : [],
      defaultAmountPosition: _common2.Common.isValidField(this.props.donationWidgetData.defaultAmountPosition) ? this.props.donationWidgetData.defaultAmountPosition : 0,
      donationAmount: 0,
      contextAmount: 0,
      contextType: '',
      decimalval: false,
      isDonateBtnEnabled: false,
      appealId: this.props.donationWidgetData ? this.props.donationWidgetData.appealId : 0
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
      this.setState({
        isDonateBtnEnabled: true
      });
      // this.refDonateNowBtn.current.setAttribute('disabled', 'disabled');
    }

    if (this.props.isCampainDetails) {
      if (val.toString() === 'NaN' || val === '') {
        this.setState({
          donateBtnTxt: 'Donate Now'
        });
        return this.props.getPatronOffers(0);
      }
      this.setState({
        donateBtnTxt: "Donate ".concat(ele.value, " Now")
      });
      return this.props.getPatronOffers(val);
    } else if (this.props.isCauses) {
      if (val.toString() === 'NaN' || val === '') {
        this.setState({
          donateBtnTxt: 'Donate Now'
        });
        return true;
      }
      this.setState({
        donateBtnTxt: "Donate ".concat(ele.value, " Now")
      });
    } else if (this.props.isDonor) {
      if (val.toString() === 'NaN' || val === '') {
        this.setState({
          donateBtnTxt: 'Donate Now'
        });
        return true;
      }
      this.setState({
        donateBtnTxt: "Donate ".concat(ele.value, " Now")
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
  //         this.setState({ isDonateBtnEnabled: true })
  //         // this.refDonateNowBtn.current.setAttribute('disabled', 'disabled');
  //     }

  //     if (this.props.isCampainDetails) {
  //         if (val.toString() === 'NaN' || val == '') {
  //             this.setState({ donateBtnTxt: 'Donate Now' })
  //             return this.props.getPatronOffers(0)
  //         }
  //         this.setState({ donateBtnTxt: `Donate ${ele.value} Now` })
  //         return this.props.getPatronOffers(val)
  //     } else if (this.props.isCauses) {
  //         if (val.toString() === 'NaN' || val == '') {
  //             this.setState({ donateBtnTxt: 'Donate Now' })
  //             return true;
  //         }
  //         this.setState({ donateBtnTxt: `Donate ${ele.value} Now` })
  //     } else if (this.props.isDonor) {
  //         if (val.toString() === 'NaN' || val == '') {
  //             this.setState({ donateBtnTxt: 'Donate Now' })
  //             return true;
  //         }
  //         this.setState({ donateBtnTxt: `Donate ${ele.value} Now` })
  //     }

  // }

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
    let PaymentContext = this.context.PaymentContext;
    ele.parentNode.childNodes.forEach(ele => ele.classList.remove('selected'));
    ele.classList.add('selected');
    ele.classList.remove('is-invalid');
    this.refDonationAmount.current.value = val;
    // this.refDonationAmount.current.value !== '$' ? this.setState({ isDonateBtnEnabled : false }) : this.setState({ isDonateBtnEnabled : true })
    this.setDonationAmountWidth(this.refDonationAmount.current);
    // this.refDonateNowBtn.current.removeAttribute('disabled');
    this.setState({
      donationAmount: parseFloat(val.substr(1)),
      donateBtnTxt: "Donate ".concat(val, " Now")
    });
    if (this.refDonationAmount.current.value !== '$') {
      this.state.frequency === 2 && this.state.regularFrequency === undefined ? this.setState({
        isDonateBtnEnabled: true
      }) : this.setState({
        isDonateBtnEnabled: false
      });
    } else {
      this.setState({
        isDonateBtnEnabled: true
      });
    }
    if (this.props.isCampainDetails) {
      var _val$replace$match;
      this.props.getPatronOffers(parseFloat((_val$replace$match = val.replace('$', '').match(/[0-9]/g)) === null || _val$replace$match === void 0 ? void 0 : _val$replace$match.join('')));
    }
    // this.props.updateDonationAmount()

    // Patch for UPDATE button is disabled when type is recurring on summary
    if (PaymentContext[PaymentContext.donationMethod].partPayment !== '') {
      this.setState({
        isDonateBtnEnabled: false
      });
    }
  }
  onClickDonationFrequency(e) {
    let ele = e.target;
    let dataType = parseInt(ele.getAttribute('data-type'));
    let PaymentContext = this.context.PaymentContext;
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
    this.refFrequency.current.childNodes.forEach(item => {
      if (item.classList.contains('selected')) {
        PaymentContext[PaymentContext.donationMethod].frequency = item.innerText.trim();
        return;
      }
    });
    this.setState({
      frequency: dataType,
      regularFrequency: dataType !== 2 ? 0 : PaymentContext.frequency /*this.state.regularFrequency*/
    }); //ele.target.innerText
    ele.classList.add('selected');
  }
  onClickRegularFrequencyOptions(e) {
    var _this$context;
    let ele = e.target;
    let dataType = parseInt(ele.getAttribute('data-type'));
    let PaymentContext = (_this$context = this.context) === null || _this$context === void 0 ? void 0 : _this$context.PaymentContext;
    ele.parentNode.childNodes.forEach(ele => ele.classList.remove('selected'));
    // PaymentContext[PaymentContext.donationMethod].frequency = dataType;
    // if (dataType !== 0 &&
    //     (this.refDonationAmount.current.value !== '$' &&
    //         this.refDonationAmount.current.value.replace('$', '')
    //         >= PaymentContext[PaymentContext.donationMethod].default.minAmount)) {
    //     this.setState({ isDonateBtnEnabled: false })
    // }
    // else {
    //     this.setState({ isDonateBtnEnabled: true })
    // }

    if (dataType !== 0) {
      let val = parseInt(this.refDonationAmount.current.value.replace(/[^\w\s]/gi, ''));
      if (val >= _constant.DONATION_MIN_AMOUNT) {
        this.setState({
          isDonateBtnEnabled: false,
          regularFrequency: PaymentContext.partPayment
        });
      } else {
        this.setState({
          isDonateBtnEnabled: true
        });
      }
    } else {
      this.setState({
        isDonateBtnEnabled: true
      });
    }
    this.refRegularFrequencyOptions.current.childNodes.forEach(item => {
      if (item.classList.contains('selected')) {
        PaymentContext[PaymentContext.donationMethod].partPayment = item.innerText.trim();
        return;
      }
    });
    if (dataType !== 0 && this.refDonationAmount.current.value !== '$' && this.refDonationAmount.current.value.replace(/[^\w\s]/gi, '') >= PaymentContext[PaymentContext.donationMethod].default.minAmount) {
      this.setState({
        isDonateBtnEnabled: false
      });
    } else {
      this.setState({
        isDonateBtnEnabled: true
      });
    }

    // if(dataType !== 0) 
    // {
    //     this.refDonationAmount.current.value !== "$" && (this.refDonationAmount.current.value.replace(/[^\w\s]/gi, '') >= DONATION_MIN_AMOUNT) ? this.setState({ isDonateBtnEnabled : false }) : this.setState({ isDonateBtnEnabled : true });
    // }
    // else
    // {
    //     this.refDonationAmount.current.value !== "$" ? this.setState({ isDonateBtnEnabled : true }) : this.setState({ isDonateBtnEnabled : false })
    // }

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
    var _this$context2;
    let eleDonationAmount = this.refDonationAmount.current;
    let val = eleDonationAmount.value.trim().substr(1);
    val = val.indexOf(',') !== -1 ? val.replace(',', '') : val;
    let PaymentContext = (_this$context2 = this.context) === null || _this$context2 === void 0 ? void 0 : _this$context2.PaymentContext;
    localStorage.removeItem('context');
    let method = PaymentContext.donationMethod;
    if (eleDonationAmount.value.trim() && val) {
      //eleDonationAmount.classList.remove('is-invalid');
      //this.setState({ donationAmount: parseFloat(val) });
      PaymentContext[method].donationAmount = parseFloat(val);
      this.refFrequency.current.childNodes.forEach(item => {
        if (item.classList.contains('selected')) {
          PaymentContext[method].frequency = item.innerText.trim();
          return;
        }
      });
      this.refRegularFrequencyOptions.current.childNodes.forEach(item => {
        if (item.classList.contains('selected')) {
          PaymentContext[method].partPayment = item.innerText.trim();
          return;
        }
      });
      if (PaymentContext[method].frequency === 'One Time') {
        PaymentContext[method].partPayment = '';
      }
      this.refType.current.childNodes.forEach(item => {
        if (item.classList.contains('selected')) {
          PaymentContext[method].entity = item.innerText.trim();
          return;
        }
      });
      // this.props.getPatronOffers(parseFloat(val.replace('$', '').match(/[0-9]/g)?.join('')))
      if (this.props.isNavigate) {
        this.props.updateDonationAmount();
        this.props.history.push(this.props.isNavigate);
      } else {
        this.props.updateDonationAmount();
        this.props.close('DonationWidget');
      }
    } else {
      eleDonationAmount.value = '';
      return false;
    }
    if (!this.props.isCauses && !this.props.isDonor) {
      this.props.history.push({
        pathname: '/campaign/payment',
        appealId: this.state.appealId
      });
    } else {
      this.props.history.push({
        pathname: '/payments',
        appealId: this.state.appealId
      });
    }
  }
  componentDidMount() {
    var _this$context3;
    let PaymentContext = (_this$context3 = this.context) === null || _this$context3 === void 0 ? void 0 : _this$context3.PaymentContext;
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
    if (this.state.regularFrequencyOptions.length === 0) {
      let data = JSON.parse(localStorage.getItem('context'));
      if (data !== null) {
        _homePageService.homePageService.getDonationWidgetData(data.id).then(response => {
          this.setState({
            donationAmount: data.donationAmount,
            amoutOptions: [...response.donationAmounts],
            regularFrequencyOptions: [...response.recurringTypes]
          }, () => {
            PaymentContext.campaign.frequency = PaymentContext.campaign.frequency.toLowerCase().replace(/\b(\w)/g, s => s.toUpperCase());
            this.refFrequency.current.childNodes.forEach(item => {
              if (PaymentContext.campaign.frequency === item.innerText.trim()) {
                item.classList.add('selected');
                return;
              } else {
                item.classList.remove('selected');
              }
            });
            this.refRegularFrequencyOptions.current.childNodes.forEach(item => {
              if (PaymentContext.campaign.frequency !== 'One Time') {
                if (PaymentContext.campaign.partPayment === item.innerText.trim()) {
                  item.classList.add('selected');
                } else {
                  item.classList.remove('selected');
                }
                return;
              }
            });
            this.refType.current.childNodes.forEach(item => {
              if (PaymentContext.campaign.entity === item.innerText.trim()) {
                item.classList.add('selected');
                return;
              }
            });
            this.refFixedDonationAmount.current.childNodes.forEach(item => {
              if (item.innerText.trim() === (0, _common.commaSeperatedAmount)(_common.CURRENCY_SYMBOL, this.state.donationAmount)) {
                item.classList.add('selected');
              }
            });
          });
        });
      } else {
        _homePageService.homePageService.getDonationWidgetData(PaymentContext.campaign.id).then(response => {
          this.setState({
            donationAmount: PaymentContext.campaign.donationAmount,
            amoutOptions: [...response.donationAmounts],
            regularFrequencyOptions: [...response.recurringTypes]
          }, () => {
            PaymentContext.campaign.frequency = PaymentContext.campaign.frequency.toLowerCase().replace(/\b(\w)/g, s => s.toUpperCase());
            this.refFrequency.current.childNodes.forEach(item => {
              if (PaymentContext.campaign.frequency === item.innerText.trim()) {
                item.classList.add('selected');
                return;
              } else {
                item.classList.remove('selected');
              }
            });
            this.refRegularFrequencyOptions.current.childNodes.forEach(item => {
              if (PaymentContext.campaign.frequency !== 'One Time') {
                if (PaymentContext.campaign.partPayment === item.innerText.trim()) {
                  item.classList.add('selected');
                } else {
                  item.classList.remove('selected');
                }
                return;
              }
            });
            this.refType.current.childNodes.forEach(item => {
              if (PaymentContext.campaign.entity === item.innerText.trim()) {
                item.classList.add('selected');
                return;
              }
            });
            this.refFixedDonationAmount.current.childNodes.forEach(item => {
              if (item.innerText.trim() === (0, _common.commaSeperatedAmount)(_common.CURRENCY_SYMBOL, this.state.donationAmount)) {
                item.classList.add('selected');
              }
            });
          });
        });
      }

      // End
    }

    if (this.state.donationAmount === 0 && this.props.donationWidgetData.donationAmounts !== undefined) {
      if (this.props.isUpdate) {
        if (this.props.donationWidgetData && this.props.donationWidgetData.donationAmounts.findIndex(v => v === this.props.donationWidgetData.selectedAmount) > 0) {
          var _this$props$donationW2;
          this.setState({
            donationAmount: parseFloat(this.props.donationWidgetData.donationAmounts[(_this$props$donationW2 = this.props.donationWidgetData.donationAmounts.findIndex(v => v === this.props.donationWidgetData.selectedAmount)) !== null && _this$props$donationW2 !== void 0 ? _this$props$donationW2 : 0])
          });
        } else {
          this.setState({
            donationAmount: this.props.donationWidgetData.selectedAmount
          });
        }
      } else {
        var _this$props$donationW3;
        this.setState({
          donationAmount: parseFloat(this.props.donationWidgetData.donationAmounts[(_this$props$donationW3 = this.props.donationWidgetData.defaultAmountPosition) !== null && _this$props$donationW3 !== void 0 ? _this$props$donationW3 : 0])
        });
      }
    }
    setTimeout(() => {
      if (this.state.donationAmount !== 0) {
        this.setDonationAmountWidth(this.refDonationAmount.current);
        this.refFixedDonationAmount.current.childNodes.forEach(item => {
          if (item.innerText.trim() === (0, _common.commaSeperatedAmount)(_common.CURRENCY_SYMBOL, this.state.donationAmount)) {
            item.click();
          }
        });
      }
    }, 250);
    if (this.props.donationWidgetData.selectedAmount !== undefined && this.props.donationWidgetData.donationAmounts !== undefined) {
      var _this$props$donationW4;
      let index = this.props.donationWidgetData.donationAmounts.findIndex(v => v === this.props.donationWidgetData.selectedAmount);
      let donationAmount = this.props.isUpdate ? this.props.donationWidgetData && index > 0 ? parseFloat(this.props.donationWidgetData.donationAmounts[index !== null && index !== void 0 ? index : 0]) : this.props.donationWidgetData.selectedAmount : parseFloat(this.props.donationWidgetData.donationAmounts[(_this$props$donationW4 = this.props.donationWidgetData.defaultAmountPosition) !== null && _this$props$donationW4 !== void 0 ? _this$props$donationW4 : 0]);
      this.refFixedDonationAmount.current.childNodes.forEach(item => {
        if (_common.CURRENCY_SYMBOL + donationAmount === item.innerText) {
          item.classList.add('selected');
          this.refDonateNowBtn.current.removeAttribute('disabled');
          this.setState({
            donateBtnTxt: "Donate ".concat(item.innerText, " Now")
          });
          if (this.props.isCampainDetails) {
            var _item$innerText$repla;
            this.props.getPatronOffers(parseFloat((_item$innerText$repla = item.innerText.replace('$', '').match(/[0-9]/g)) === null || _item$innerText$repla === void 0 ? void 0 : _item$innerText$repla.join('')));
          }
        } else {
          item.classList.remove('selected');
        }
      });
    } else {
      this.refFixedDonationAmount.current.childNodes.forEach(item => {
        var _parseFloat, _this$props$donationW5;
        if (_common.CURRENCY_SYMBOL + ((_parseFloat = parseFloat(this.props.donationWidgetData.donationAmounts[(_this$props$donationW5 = this.props.donationWidgetData.defaultAmountPosition) !== null && _this$props$donationW5 !== void 0 ? _this$props$donationW5 : 0])) !== null && _parseFloat !== void 0 ? _parseFloat : 0) === item.innerText) {
          item.classList.add('selected');
          this.refDonateNowBtn.current.removeAttribute('disabled');
          this.setState({
            donateBtnTxt: "Donate ".concat(item.innerText, " Now")
          });
          if (this.props.isCampainDetails) {
            var _item$innerText$repla2;
            this.props.getPatronOffers(parseFloat((_item$innerText$repla2 = item.innerText.replace('$', '').match(/[0-9]/g)) === null || _item$innerText$repla2 === void 0 ? void 0 : _item$innerText$repla2.join('')));
          }
        } else {
          item.classList.remove('selected');
        }
      });
    }
    if (this.props.isUpdate) {
      this.setData(PaymentContext);
    }
  }
  handleKeyPress(e) {
    var _this$context4;
    let PaymentContext = (_this$context4 = this.context) === null || _this$context4 === void 0 ? void 0 : _this$context4.PaymentContext;
    let val = e.target.value;
    val = parseInt(val.replace(/[$,]/gi, ''));
    if (val !== PaymentContext[PaymentContext.donationMethod].default.maxAmount && e.key === '.') {
      this.setState({
        decimalval: true
      });
      e.target.setAttribute('maxlength', 11);
    }
  }
  setData(PaymentContext) {
    let partPayment = PaymentContext[PaymentContext.donationMethod].partPayment;
    let frequency = PaymentContext[PaymentContext.donationMethod].frequency;
    let donationType = PaymentContext[PaymentContext.donationMethod].entity;
    this.refFrequency.current.childNodes.forEach(item => {
      if (frequency === item.innerText) {
        item.classList.add('selected');
      } else {
        item.classList.remove('selected');
      }
    });
    this.refType.current.childNodes.forEach(ele => {
      if (donationType === ele.innerText) {
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
    let dataType = 1;
    if (frequency === 'Recurrent') {
      dataType = 2;
      PaymentContext[PaymentContext.donationMethod].frequency = 2;
    }
    if (dataType !== 2) {
      this.setState({
        isDonateBtnEnabled: false,
        frequency: 1
      });
      this.refRegularFrequencyOptions.current.childNodes.forEach(ele => ele.classList.remove('selected'));
    } else {
      this.setState({
        isDonateBtnEnabled: true,
        frequency: 2
      });
      this.refRegularFrequencyOptions.current.childNodes.forEach(item => {
        if (partPayment === item.innerText) {
          item.classList.add('selected');
          this.setState({
            isDonateBtnEnabled: false
          });
        } else {
          item.classList.remove('selected');
        }
      });
    }
    PaymentContext[PaymentContext.donationMethod].frequency = frequency;
    if (frequency === 'One Time') {
      PaymentContext[PaymentContext.donationMethod].partPayment = '';
    }
    this.setState({
      frequency: dataType,
      regularFrequency: dataType !== 2 ? 0 : PaymentContext.frequency /*this.state.regularFrequency*/
    }); //ele.target.innerText
  }

  componentDidUpdate(prevProps, prevState) {
    var _this$context5;
    const donation = this.props.donationWidgetData;
    let PaymentContext = (_this$context5 = this.context) === null || _this$context5 === void 0 ? void 0 : _this$context5.PaymentContext;
    if (prevProps.donationWidgetData !== donation) {
      var _donation$defaultAmou;
      const amount = donation ? parseFloat(donation.donationAmounts[(_donation$defaultAmou = donation.defaultAmountPosition) !== null && _donation$defaultAmou !== void 0 ? _donation$defaultAmou : 0]) : 0;
      this.setState({
        latestDonationText: donation ? donation.latestDonationText : '',
        taxDedutionText: donation ? donation.taxDeductibleText : '',
        regularFrequencyOptions: donation ? donation.recurringTypes : [],
        amoutOptions: donation ? donation.donationAmounts.slice(0, 6) : [],
        defaultAmountPosition: donation ? donation.defaultAmountPosition : 0,
        donationAmount: amount,
        donateBtnTxt: "Donate $".concat(amount, " Now")
      }, () => {
        this.refFixedDonationAmount.current.childNodes.forEach(item => {
          var _ref, _donation$defaultAmou2;
          if (((_ref = _common.CURRENCY_SYMBOL + donation.donationAmounts[(_donation$defaultAmou2 = donation.defaultAmountPosition) !== null && _donation$defaultAmou2 !== void 0 ? _donation$defaultAmou2 : 0]) !== null && _ref !== void 0 ? _ref : 0) === item.innerText) {
            item.classList.add('selected');
            this.refDonateNowBtn.current.removeAttribute('disabled');
            this.setState({
              donateBtnTxt: "Donate ".concat(item.innerText, " Now")
            });
          } else {
            item.classList.remove('selected');
          }
        });
      });
      this.refDonationAmount.current.value = '$' + amount;
      this.props.getPatronOffers(amount);
      PaymentContext[PaymentContext.donationMethod].donationAmount = amount;
    }
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
      className: "input-solution"
    }, /*#__PURE__*/_react.default.createElement("input", {
      type: "text",
      maxLength: "8",
      ref: this.refDonationAmount,
      onKeyPress: this.handleKeyPress,
      placeholder: "$0",
      defaultValue: this.state.donationAmount ? (0, _common.commaSeperatedAmount)(_common.CURRENCY_SYMBOL, this.state.donationAmount) : '',
      onChange: this.onChangeDonationAmount,
      onFocus: this.onFocusDonationAmount /* onBlur={this.onBlurDonationAmount} */,
      className: "donation-value form-control"
    }), /*#__PURE__*/_react.default.createElement("div", {
      className: "line"
    })), /*#__PURE__*/_react.default.createElement("div", {
      ref: this.refFixedDonationAmount,
      className: "c-amount-options"
    }, this.state.amoutOptions.map((item, index) => {
      return /*#__PURE__*/_react.default.createElement("button", {
        type: "button",
        onClick: this.onClickFixedDonationAmount,
        className: "btn btn-light",
        key: index
      }, "$", item);
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
    })), /*#__PURE__*/_react.default.createElement("div", {
      className: "type-regular-options"
    }, /*#__PURE__*/_react.default.createElement("div", {
      ref: this.refRegularFrequencyOptions /* className={parseInt(this.state.frequency) !== 2 ? 'hide' : ''} */
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
    }, this.props.isUpdate ? 'UPDATE' : this.state.donateBtnTxt)), /*#__PURE__*/_react.default.createElement("div", {
      className: "note"
    }, this.state.taxDedutionText));
  }
}
_defineProperty(DonationWidgetStyle2, "contextType", _context.default);
var _default = (0, _reactRouterDom.withRouter)(DonationWidgetStyle2);
exports.default = _default;