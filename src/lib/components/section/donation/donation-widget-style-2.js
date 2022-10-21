import React, { Suspense, lazy } from 'react';
import PageContext from '../../context';
import { commaSeperatedAmount, CURRENCY_SYMBOL } from '../../common';
import './css/donation-widget.css';
import { withRouter } from 'react-router-dom';
import { DONATION_MIN_AMOUNT, DONATION_WIDGET__BLOCK_ID } from '../../common/constant';
import { homePageService } from '../../jwt/_services/home-page-service';
import { Common } from '../../common/common';

const ImageLoader = lazy(() => import('../../common/image-loader'));

class DonationWidgetStyle2 extends React.Component {
    static contextType = PageContext;

    constructor(props) {        
        super(props);        
        // return false;
        this.state = {
            heading: '',
            blockTitle: this.props.blockTitle ? this.props.blockTitle : '',
            blockSubTitle: this.props.blockSubTitle ? this.props.blockSubTitle : '',
            // amoutOptions: [], //[5, 10, 20, 50, 100, 200],
            donationFrequencyOptions: [{ id: 1, value: 'One Time' }, { id: 2, value: 'Recurrent' }],
            // regularFrequencyOptions: [], //[{ id: 1, value: 'Monthly' }, { id: 2, value: 'Quarterly' }, { id: 3, value: 'Annually' }],
            donationTypeOptions: [{ id: 1, value: 'Individual' }, { id: 2, value: 'Corporate' }],            
            frequency: 1,
            regularFrequency: 0,
            donateBtnTxt: '',
            donationType: 1,
            latestDonationText: this.props.donationWidgetData ? this.props.donationWidgetData.latestDonationText : '',
            taxDedutionText: this.props.donationWidgetData ? this.props.donationWidgetData.taxDeductibleText : '',
            regularFrequencyOptions: Common.isValidField(this.props.donationWidgetData.recurringTypes) ? this.props.donationWidgetData.recurringTypes : [],
            amoutOptions: Common.isValidField(this.props.donationWidgetData.donationAmounts) ? this.props.donationWidgetData.donationAmounts?.slice(0, 6) : [],
            defaultAmountPosition: Common.isValidField(this.props.donationWidgetData.defaultAmountPosition) ? this.props.donationWidgetData.defaultAmountPosition : 0,
            donationAmount: 0,
            contextAmount: 0,
            contextType: '',
            decimalval: false,            
            isDonateBtnEnabled: false,
            appealId : this.props.donationWidgetData ? this.props.donationWidgetData.appealId : 0,
        }

        this.refDonationAmount = React.createRef();
        this.refFixedDonationAmount = React.createRef();
        this.refFrequency = React.createRef();
        this.refRegularFrequencyOptions = React.createRef();
        this.refType = React.createRef();
        this.refDonateNowBtn = React.createRef();

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
        let ele = e.target;
        // console.log("ele.value : " + parseFloat(ele.value.replace('$', '').match(/[0-9]*\.[0-9][0-9]/g)?.join('')) ? ele.value : parseInt(ele.value.replace('$', '').match(/[0-9]*\.[0-9][0-9]/g)?.join('')));
        let val = parseFloat(ele.value.replace('$', '').match(/^[0-9]$/g)?.join(''));
        if (ele.value.includes('.')) {
            if (ele.value.split('.').length > 2) {
                // Remove . if more than 1 was found
                ele.value = ele.value.replace(/\.+$/, '')
            }
            else {
                // Restrict more than 2 digits after finding .
                if (ele.value.indexOf(".") > -1 && (ele.value.split('.')[1].length > 1)) {
                    ele.value = (ele.value.indexOf(".") >= 0) ?
                        (ele.value.substr(0, ele.value.indexOf(".")) + ele.value.substr(ele.value.indexOf("."), 3)) : ele.value;
                }
            }
        }

        if (ele.value.length > 8) {
            this.state.decimalval ? ele.setAttribute('maxlength', 11) : ele.setAttribute('maxlength', 8);
        }
        else {
            ele.setAttribute('maxlength', 8)
        }

        ele.value.toString().includes('.') ? ele.setAttribute('maxlength', 11) : ele.setAttribute('maxlength', 8);

        if (parseFloat(ele.value.replace('$', '').match(/[0-9]*\.[0-9][0-9]/g)?.join(''))) {
            val = parseFloat(ele.value.replace(/[$,]/gi, '').match(/[0-9]*\.[0-9][0-9]/g)?.join('')).toFixed(2)
        }
        else {
            if (parseFloat(ele.value.replace('$', '').match(/[0-9]*\.[0-9]/g)?.join(''))) {
                val = parseFloat(ele.value.replace(/[$,]/gi, '').match(/[0-9]*\.[0-9]/g)?.join(''));
            } else {
                val = parseInt(ele.value.replace(/[$,]/gi, '').match(/[0-9]/g)?.join(''));
            }
        }

        let context = this.context.PaymentContext;
        let eleFixedDonationAmount = this.refFixedDonationAmount.current;

        if (this.refDonationAmount.current.value !== '$' && this.state.isDonateBtnEnabled === true) {
            this.refDonationAmount.current.value.replace('$', '') < context[context.donationMethod].default.minAmount ? this.setState({ isDonateBtnEnabled: true }) : this.setState({ isDonateBtnEnabled: false });
        }
        else {
            this.setState({ isDonateBtnEnabled: true })
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
            this.state.frequency === 2 && this.state.regularFrequency === 0 ? this.setState({ isDonateBtnEnabled: true }) : this.setState({ isDonateBtnEnabled: false });
            // this.refDonateNowBtn.current.removeAttribute('disabled');

            eleFixedDonationAmount.childNodes.forEach((item) => {
                if (parseFloat(item.innerText.trim().replace('$', '')) === val) {
                    item.classList.add('selected');
                } else {
                    item.classList.remove('selected');
                }
            });
            ele.value = commaSeperatedAmount(CURRENCY_SYMBOL, this.refDonationAmount.current.value.replace('$', ''));
        }
        else {
            ele.value = '$' + (val && val.toString() !== 'NaN' ? val : '');
            eleFixedDonationAmount.childNodes.forEach((item) => {
                item.classList.remove('selected');
            });
            this.setState({ isDonateBtnEnabled: true })
            // this.refDonateNowBtn.current.setAttribute('disabled', 'disabled');
        }

        if (this.props.isCampainDetails) {
            if (val.toString() === 'NaN' || val === '') {
                this.setState({ donateBtnTxt: 'Donate Now' })
                return this.props.getPatronOffers(0)
            }
            this.setState({ donateBtnTxt: `Donate ${ele.value} Now` })
            return this.props.getPatronOffers(val)
        } else if (this.props.isCauses) {
            if (val.toString() === 'NaN' || val === '') {
                this.setState({ donateBtnTxt: 'Donate Now' })
                return true;
            }
            this.setState({ donateBtnTxt: `Donate ${ele.value} Now` })
        } else if (this.props.isDonor) {
            if (val.toString() === 'NaN' || val === '') {
                this.setState({ donateBtnTxt: 'Donate Now' })
                return true;
            }
            this.setState({ donateBtnTxt: `Donate ${ele.value} Now` })
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
        ele.value = commaSeperatedAmount('$', val);
    }

    setDonationAmountWidth(ele) {
        ele.style.width = ele.value.length * 25 + 'px';
    }

    onClickFixedDonationAmount(e) {
        let ele = e.target;
        let val = ele.innerText.trim();
        let PaymentContext = this.context.PaymentContext;
        ele.parentNode.childNodes.forEach((ele) => ele.classList.remove('selected'));
        ele.classList.add('selected');
        ele.classList.remove('is-invalid');
        this.refDonationAmount.current.value = val;
        // this.refDonationAmount.current.value !== '$' ? this.setState({ isDonateBtnEnabled : false }) : this.setState({ isDonateBtnEnabled : true })
        this.setDonationAmountWidth(this.refDonationAmount.current);
        // this.refDonateNowBtn.current.removeAttribute('disabled');
        this.setState({ donationAmount: parseFloat(val.substr(1)), donateBtnTxt: `Donate ${val} Now` });
        if (this.refDonationAmount.current.value !== '$') {
            this.state.frequency === 2 && this.state.regularFrequency === undefined ? this.setState({ isDonateBtnEnabled: true }) : this.setState({ isDonateBtnEnabled: false });
        }
        else {
            this.setState({ isDonateBtnEnabled: true })
        }
        if (this.props.isCampainDetails) {
            this.props.getPatronOffers(parseFloat(val.replace('$', '').match(/[0-9]/g)?.join('')))
        }
        // this.props.updateDonationAmount()

        // Patch for UPDATE button is disabled when type is recurring on summary
        if (PaymentContext[PaymentContext.donationMethod].partPayment !== '') {
            this.setState({ isDonateBtnEnabled: false });
        }
    }



    onClickDonationFrequency(e) {
        let ele = e.target;
        let dataType = parseInt(ele.getAttribute('data-type'));
        let PaymentContext = this.context.PaymentContext;
        let context = this.context.PaymentContext;

        ele.parentNode.childNodes.forEach((ele) => ele.classList.remove('selected'));
        if (dataType !== 2) {
            if (this.refDonationAmount.current.value === '$' ||
                this.refDonationAmount.current.value.replace('$', '') <
                context[context.donationMethod].default.minAmount) {
                this.setState({ isDonateBtnEnabled: true })
            } else {
                this.refDonationAmount.current.value.replace('$', '') <
                    context[context.donationMethod].default.minAmount ?
                    this.setState({ isDonateBtnEnabled: true }) :
                    this.setState({ isDonateBtnEnabled: false })
            }
            this.refRegularFrequencyOptions.current.childNodes.forEach((ele) => ele.classList.remove('selected'));
        } else {
            let isRegularSelected = false;
            this.refRegularFrequencyOptions.current.childNodes.forEach((item) => {
                if (item.classList.contains('selected')) {
                    isRegularSelected = true
                }
            });
            isRegularSelected ? this.setState({ isDonateBtnEnabled: false }) : this.setState({ isDonateBtnEnabled: true })
        }

        this.refFrequency.current.childNodes.forEach(item => {
            if (item.classList.contains('selected')) {
                PaymentContext[PaymentContext.donationMethod].frequency = item.innerText.trim();
                return;
            }
        });

        this.setState({ frequency: dataType, regularFrequency: dataType !== 2 ? 0 : PaymentContext.frequency /*this.state.regularFrequency*/ }); //ele.target.innerText
        ele.classList.add('selected');
    }

    onClickRegularFrequencyOptions(e) {
        let ele = e.target;
        let dataType = parseInt(ele.getAttribute('data-type'));
        let PaymentContext = this.context?.PaymentContext;

        ele.parentNode.childNodes.forEach((ele) => ele.classList.remove('selected'));
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
            if (val >= DONATION_MIN_AMOUNT) {
                this.setState({
                    isDonateBtnEnabled: false,
                    regularFrequency: PaymentContext.partPayment
                })
            }
            else {
                this.setState({ isDonateBtnEnabled: true })
            }
        } else { this.setState({ isDonateBtnEnabled: true }) }

        this.refRegularFrequencyOptions.current.childNodes.forEach(item => {
            if (item.classList.contains('selected')) {
                PaymentContext[PaymentContext.donationMethod].partPayment = item.innerText.trim();
                return;
            }
        });
        if (dataType !== 0 && (this.refDonationAmount.current.value !== '$' && this.refDonationAmount.current.value.replace(/[^\w\s]/gi, '')
            >= PaymentContext[PaymentContext.donationMethod].default.minAmount)) {
            this.setState({ isDonateBtnEnabled: false })
        }
        else {
            this.setState({ isDonateBtnEnabled: true })
        }

        // if(dataType !== 0) 
        // {
        //     this.refDonationAmount.current.value !== "$" && (this.refDonationAmount.current.value.replace(/[^\w\s]/gi, '') >= DONATION_MIN_AMOUNT) ? this.setState({ isDonateBtnEnabled : false }) : this.setState({ isDonateBtnEnabled : true });
        // }
        // else
        // {
        //     this.refDonationAmount.current.value !== "$" ? this.setState({ isDonateBtnEnabled : true }) : this.setState({ isDonateBtnEnabled : false })
        // }

        this.setState({ regularFrequency: dataType }); //ele.target.innerText

        ele.classList.add('selected');
    }

    onClickDonationType(e) {
        let ele = e.target;
        let dataType = parseInt(ele.getAttribute('data-type'));

        ele.parentNode.childNodes.forEach((ele) => ele.classList.remove('selected'));
        this.setState({ donationType: dataType }); //ele.target.innerText
        ele.classList.add('selected');
    }

    onClickDonateNow(e) {
        let eleDonationAmount = this.refDonationAmount.current;
        let val = eleDonationAmount.value.trim().substr(1);
        val = val.indexOf(',') !== -1 ? val.replace(',', '') : val;
        let PaymentContext = this.context?.PaymentContext;
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
                this.props.updateDonationAmount()
                this.props.history.push(this.props.isNavigate);
            } else {
                this.props.updateDonationAmount()
                this.props.close('DonationWidget');
            }
        } else {
            eleDonationAmount.value = '';
            return false;
        }
        if (!this.props.isCauses && !this.props.isDonor) { 
            this.props.history.push({ pathname: '/campaign/payment', appealId: this.state.appealId });
        }
        else {
            this.props.history.push({ pathname: '/payments', appealId: this.state.appealId });
        }
    }

    componentDidMount() {
        let PaymentContext = this.context?.PaymentContext;
        const context = this.context;
        const donationBlockDetails = context.blockDetails.filter((details) => details.blockId === DONATION_WIDGET__BLOCK_ID);
        if (this.state.blockTitle === '') {
            this.setState({ blockTitle: donationBlockDetails[0].blockTitle })
        }
        if (this.state.blockSubTitle === '') {
            this.setState({ blockSubTitle: donationBlockDetails[0].blockSubTitle });
        }

        if(this.state.regularFrequencyOptions.length === 0){
            let data = JSON.parse(localStorage.getItem('context'));

            if(data !== null)
            {

                homePageService.getDonationWidgetData(data.id)
                .then(response => {
                this.setState({
                    donationAmount : data.donationAmount,
                    amoutOptions : [...response.donationAmounts],
                    regularFrequencyOptions : [...response.recurringTypes]
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
                            if(PaymentContext.campaign.partPayment === item.innerText.trim()){
                                item.classList.add('selected');
                            } else {
                                item.classList.remove('selected');
                            }
                            return;
                        }
                    });
                    
                    this.refType.current.childNodes.forEach(item => {
                        if (PaymentContext.campaign.entity === item.innerText.trim()){
                            item.classList.add('selected');
                            return;
                        }
                    });
                    
                    this.refFixedDonationAmount.current.childNodes.forEach(item => {
                        if (item.innerText.trim() === commaSeperatedAmount(CURRENCY_SYMBOL, this.state.donationAmount)) {
                            item.classList.add('selected');
                        }
                    });
                })
            })
        } else {
            homePageService.getDonationWidgetData(PaymentContext.campaign.id)
            .then(response => {
            this.setState({
                donationAmount :  PaymentContext.campaign.donationAmount,
                amoutOptions : [...response.donationAmounts],
                regularFrequencyOptions : [...response.recurringTypes]
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
                        if(PaymentContext.campaign.partPayment === item.innerText.trim()){
                            item.classList.add('selected');
                        } else {
                            item.classList.remove('selected');
                        }
                        return;
                    }
                });
                
                this.refType.current.childNodes.forEach(item => {
                    if (PaymentContext.campaign.entity === item.innerText.trim()){
                        item.classList.add('selected');
                        return;
                    }
                });
                
                this.refFixedDonationAmount.current.childNodes.forEach(item => {
                    if (item.innerText.trim() === commaSeperatedAmount(CURRENCY_SYMBOL, this.state.donationAmount)) {
                        item.classList.add('selected');
                    }
                });
            })
        })
        }

        // End
        }
        
        if(this.state.donationAmount === 0 && this.props.donationWidgetData.donationAmounts !== undefined) {
            if(this.props.isUpdate)
            {
                if(this.props.donationWidgetData && this.props.donationWidgetData.donationAmounts.findIndex(v => v === this.props.donationWidgetData.selectedAmount) > 0)
                {
                    this.setState({ donationAmount : parseFloat(this.props.donationWidgetData.donationAmounts[this.props.donationWidgetData.donationAmounts.findIndex(v => v === this.props.donationWidgetData.selectedAmount) ?? 0]) })
                } else {
                    this.setState({ donationAmount : this.props.donationWidgetData.selectedAmount })
                }
            } else {
                this.setState({ donationAmount: parseFloat(this.props.donationWidgetData.donationAmounts[this.props.donationWidgetData.defaultAmountPosition ?? 0]) })
            }
        }
        
        setTimeout(() => {
            if(this.state.donationAmount !== 0)
            {
                this.setDonationAmountWidth(this.refDonationAmount.current);
                this.refFixedDonationAmount.current.childNodes.forEach(item => {
                    if (item.innerText.trim() === commaSeperatedAmount(CURRENCY_SYMBOL, this.state.donationAmount)) {
                        item.click();
                    }
                });
            }
        }, 250);
        
        if (this.props.donationWidgetData.selectedAmount !== undefined && this.props.donationWidgetData.donationAmounts !== undefined) {

            let index = this.props.donationWidgetData.donationAmounts.findIndex(v => v === this.props.donationWidgetData.selectedAmount)
            let donationAmount = this.props.isUpdate ? (this.props.donationWidgetData &&
                index > 0 ? parseFloat(this.props.donationWidgetData.donationAmounts[index ?? 0])
                : this.props.donationWidgetData.selectedAmount) : parseFloat(this.props.donationWidgetData.donationAmounts[this.props.donationWidgetData.defaultAmountPosition ?? 0])

            this.refFixedDonationAmount.current.childNodes.forEach(item => {
                if ((CURRENCY_SYMBOL + (donationAmount)) === item.innerText) {
                    item.classList.add('selected');
                    this.refDonateNowBtn.current.removeAttribute('disabled');
                    this.setState({ donateBtnTxt: `Donate ${item.innerText} Now` })
                    if (this.props.isCampainDetails) {
                        this.props.getPatronOffers(parseFloat(item.innerText.replace('$', '').match(/[0-9]/g)?.join('')))
                    }
                }
                else {
                    item.classList.remove('selected');
                }
            })
        } else {
            this.refFixedDonationAmount.current.childNodes.forEach(item => {
                if ((CURRENCY_SYMBOL + (parseFloat(this.props.donationWidgetData.donationAmounts[this.props.donationWidgetData.defaultAmountPosition ?? 0]) ?? 0)) === item.innerText) {
                    item.classList.add('selected');
                    this.refDonateNowBtn.current.removeAttribute('disabled');
                    this.setState({ donateBtnTxt: `Donate ${item.innerText} Now` })
                    if (this.props.isCampainDetails) {
                        this.props.getPatronOffers(parseFloat(item.innerText.replace('$', '').match(/[0-9]/g)?.join('')))
                    }
                } else {
                    item.classList.remove('selected');
                }
            })
        }

        if (this.props.isUpdate) {
            this.setData(PaymentContext)
        }

    }
    handleKeyPress(e) {

        let PaymentContext = this.context?.PaymentContext;

        let val = e.target.value;
        val = parseInt(val.replace(/[$,]/gi, ''));
        if (val !== PaymentContext[PaymentContext.donationMethod].default.maxAmount && e.key === '.') {
            this.setState({ decimalval: true })
            e.target.setAttribute('maxlength', 11)
        }
    }

    setData(PaymentContext) {
        let partPayment = PaymentContext[PaymentContext.donationMethod].partPayment
        let frequency = PaymentContext[PaymentContext.donationMethod].frequency
        let donationType = PaymentContext[PaymentContext.donationMethod].entity

        this.refFrequency.current.childNodes.forEach(item => {
            if (frequency === item.innerText) {
                item.classList.add('selected');
            } else {
                item.classList.remove('selected');
            }
        });

        this.refType.current.childNodes.forEach(ele => {
            if (donationType === ele.innerText) {
                ele.classList.add('selected')
                this.setState({ donationType: 2 })
            } else {
                this.setState({ donationType: 1 })
                ele.classList.remove('selected')
            }
        });


        let dataType = 1
        if (frequency === 'Recurrent') {
            dataType = 2
            PaymentContext[PaymentContext.donationMethod].frequency = 2
        }
        if (dataType !== 2) {
            this.setState({
                isDonateBtnEnabled: false,
                frequency: 1
            });
            this.refRegularFrequencyOptions.current.childNodes.forEach((ele) => ele.classList.remove('selected'));
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
        this.setState({ frequency: dataType, regularFrequency: dataType !== 2 ? 0 : PaymentContext.frequency/*this.state.regularFrequency*/ }); //ele.target.innerText
    }

    componentDidUpdate(prevProps, prevState) {
        const donation = this.props.donationWidgetData
        let PaymentContext = this.context?.PaymentContext;
        if (prevProps.donationWidgetData !== donation) {
            const amount = donation ? parseFloat(donation.donationAmounts[donation.defaultAmountPosition ?? 0]) : 0
            this.setState({
                latestDonationText: donation ? donation.latestDonationText : '',
                taxDedutionText: donation ? donation.taxDeductibleText : '',
                regularFrequencyOptions: donation ? donation.recurringTypes : [],
                amoutOptions: donation ? donation.donationAmounts.slice(0, 6) : [],
                defaultAmountPosition: donation ? donation.defaultAmountPosition : 0,
                donationAmount: amount,
                donateBtnTxt: `Donate $${amount} Now`
            }, () => {
                this.refFixedDonationAmount.current.childNodes.forEach(item => {
                    if ((CURRENCY_SYMBOL + (donation.donationAmounts[donation.defaultAmountPosition ?? 0]) ?? 0) === item.innerText) {
                        item.classList.add('selected');
                        this.refDonateNowBtn.current.removeAttribute('disabled');
                        this.setState({ donateBtnTxt: `Donate ${item.innerText} Now` })
                    } else {
                        item.classList.remove('selected');
                    }
                })
            });
            this.refDonationAmount.current.value = '$' + amount;
            this.props.getPatronOffers(amount);
            PaymentContext[PaymentContext.donationMethod].donationAmount = amount;
        }
    }

    render() {
        return (
            <div className="sec-donation-style-2 form">
                <button className="btn btn-light btn-close" onClick={() => this.props.close('DonationWidget')}>
                    <Suspense fallback={null}>
                        <ImageLoader type="image" src="/images/popup-close.svg"></ImageLoader>
                    </Suspense>
                </button>
                {this.state.isldtVisible ? <div className="donation-to-user">{this.state.latestDonationText}</div> : ''}
                <div className="question">{this.state.blockTitle}</div>
                <div className="solution">{this.state.blockSubTitle}</div>
                <div className="input-solution">
                    <input type="text" maxLength="8" ref={this.refDonationAmount} onKeyPress={this.handleKeyPress} placeholder="$0" defaultValue={this.state.donationAmount ? commaSeperatedAmount(CURRENCY_SYMBOL, this.state.donationAmount) : ''} onChange={this.onChangeDonationAmount} onFocus={this.onFocusDonationAmount} /* onBlur={this.onBlurDonationAmount} */ className="donation-value form-control" />
                    <div className="line"></div>
                </div>
                <div ref={this.refFixedDonationAmount} className="c-amount-options">
                    {
                        this.state.amoutOptions.map((item, index) => {
                            return <button type="button" onClick={this.onClickFixedDonationAmount} className="btn btn-light" key={index}>${item}</button>
                        })
                    }
                </div>
                <div className="frequency">
                    <div className="title">Donation Frequency</div>
                    <div ref={this.refFrequency} className="type">
                        {
                            this.state.donationFrequencyOptions.map((item, index) => {
                                return <button type="button" data-type={item.id} onClick={this.onClickDonationFrequency} className={"btn btn-light " + (parseInt(item.id) === 1 ? 'selected' : '')} key={index}>{item.value}</button>
                            })
                        }
                    </div>
                    <div className="type-regular-options">
                        <div ref={this.refRegularFrequencyOptions} /* className={parseInt(this.state.frequency) !== 2 ? 'hide' : ''} */>
                            {
                                this.state.regularFrequencyOptions.map((item, index) => {
                                    return <button type="button" data-type={item.id} onClick={this.onClickRegularFrequencyOptions} className="btn btn-light" key={index} disabled={this.state.frequency !== 2 ? true : false}>{item.title}</button>
                                })
                            }
                        </div>
                    </div>
                </div>
                <div className="donation-type">
                    <div className="title">Donation Type</div>
                    <div ref={this.refType} className="type">
                        {
                            this.state.donationTypeOptions.map((item, index) => {
                                return <button type="button" data-type={item.id} onClick={this.onClickDonationType} className={"btn btn-light " + (parseInt(item.id) === 1 ? 'selected' : '')} key={index}>{item.value}</button>
                            })
                        }
                    </div>
                </div>
                <div className="c-btn-donate">
                    <button type="button" ref={this.refDonateNowBtn} disabled={this.state.isDonateBtnEnabled} onClick={this.onClickDonateNow} className="btn btn-dark h-45" >{this.props.isUpdate ? 'UPDATE' : this.state.donateBtnTxt}</button>
                    {/* <PaymentContext.Consumer>
                                {
                                    (context) => <button type="button" ref={this.refDonateNowBtn} onClick={context.onClick} className="btn btn-dark h-45" disabled={true}>Donate Now</button>
                                }
                            </PaymentContext.Consumer> */}
                </div>
                <div className="note">
                    {/* Donations of $50 and above are eligible for tax deduction and this will be automatically processed by the Inland Revenue Authority of Singapore (IRAS) according to your NRIC or UEN number */}
                    {this.state.taxDedutionText}
                </div>
            </div>

        )
    }
}

export default withRouter(DonationWidgetStyle2);