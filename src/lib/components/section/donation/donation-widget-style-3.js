import React, { Suspense, lazy } from 'react';
import PageContext from '../../context';
import { commaSeperatedAmount, CURRENCY_SYMBOL } from '../../common';
import './css/donation-widget.css';
import { withRouter , useLocation } from 'react-router-dom';
import { DONATION_WIDGET__BLOCK_ID } from '../../common/constant';

const ImageLoader = lazy(() => import('../../common/image-loader'));


class DonationWidgetStyle3 extends React.Component {

    static contextType = PageContext;

    constructor(props) {
        super(props);
        this.state = {
            blockTitle : this.props.blockTitle ? this.props.blockTitle : '',
            blockSubTitle : this.props.blockSubTitle ? this.props.blockSubTitle : '',
            donationFrequencyOptions: [{ id: 1, value: 'One Time' }, { id: 2, value: 'Recurrent' }],
            donationTypeOptions: [{ id: 1, value: 'Individual' }, { id: 2, value: 'Corporate' }],
            donationAmount: 0,
            frequency: 1,
            regularFrequency: 0,
            donationType: 1,
            latestDonationText: this.props.donationWidgetData ? this.props.donationWidgetData.latestDonationText : '',
            taxDedutionText: this.props.donationWidgetData ? this.props.donationWidgetData.taxDeductibleText : '',
            regularFrequencyOptions: this.props.donationWidgetData ? this.props.donationWidgetData.recurringTypes : [],
            amoutOptions: this.props.donationWidgetData ? this.props.donationWidgetData.donationAmounts.slice(0, 6) : [],
            defaultAmountPosition : this.props.donationWidgetData ? this.props.donationWidgetData.defaultAmountPosition : 0,
            donationAmounts: this.props.donationWidgetData ? parseFloat(this.props.donationWidgetData.donationAmounts[this.props.donationWidgetData.defaultAmountPosition ?? 0]) : 0,
            donateBtnTxt:'',
            isDonateBtnEnabled: false,
            decimalval: false,
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
        this.setData = this.setData.bind(this);
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
        if(ele.value.includes('.'))
        {
            if(ele.value.split('.').length > 2)
            {
                // Remove . if more than 1 was found
                ele.value = ele.value.replace(/\.+$/,'')
            }
            else
            {
                // Restrict more than 2 digits after finding .
                if(ele.value.indexOf(".")> -1 && (ele.value.split('.')[1].length > 1)) {
                    ele.value = (ele.value.indexOf(".") >= 0) ? 
                    (ele.value.substr(0, ele.value.indexOf(".")) + ele.value.substr(ele.value.indexOf("."), 3)) : ele.value;
                }
            }
        }

        if(ele.value.length > 8)
        {
            this.state.decimalval ? ele.setAttribute('maxlength', 11) : ele.setAttribute('maxlength', 8);  
        }
        else
        {
            ele.setAttribute('maxlength', 8)
        }

        ele.value.toString().includes('.') ?  ele.setAttribute('maxlength', 11) : ele.setAttribute('maxlength', 8); 

        if(parseFloat(ele.value.replace('$', '').match(/[0-9]*\.[0-9][0-9]/g)?.join('')))
        {
            val = parseFloat(ele.value.replace(/[$,]/gi, '').match(/[0-9]*\.[0-9][0-9]/g)?.join('')).toFixed(2)
        }
        else
        {
            if(parseFloat(ele.value.replace('$', '').match(/[0-9]*\.[0-9]/g)?.join('')))
            {
                val = parseFloat(ele.value.replace(/[$,]/gi, '').match(/[0-9]*\.[0-9]/g)?.join(''));
            } else
            {
                val = parseInt(ele.value.replace(/[$,]/gi, '').match(/[0-9]/g)?.join(''));
            }
        }

        let context = this.context.PaymentContext;
        let eleFixedDonationAmount = this.refFixedDonationAmount.current;
        
        if(this.refDonationAmount.current.value !== '$' && this.state.isDonateBtnEnabled === true)
        {
            this.refDonationAmount.current.value.replace('$','') < context[context.donationMethod].default.minAmount ? this.setState({ isDonateBtnEnabled : true }) : this.setState({ isDonateBtnEnabled : false }) ;
        }
        else
        {
            this.setState({ isDonateBtnEnabled : true })
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
            this.state.frequency === 2 && this.state.regularFrequency === 0 ? this.setState({ isDonateBtnEnabled: true }) : this.setState({ isDonateBtnEnabled : false});
            // this.refDonateNowBtn.current.removeAttribute('disabled');

            eleFixedDonationAmount.childNodes.forEach((item) => {
                if (parseFloat(item.innerText.trim().replace('$', '')) === val) {
                    item.classList.add('selected');
                } else {
                    item.classList.remove('selected');
                }
            });
            ele.value = commaSeperatedAmount(CURRENCY_SYMBOL, this.refDonationAmount.current.value.replace('$',''));
        }
        else {
            ele.value = '$' + (val && val.toString() !== 'NaN' ? val : '');
            eleFixedDonationAmount.childNodes.forEach((item) => {
                item.classList.remove('selected');
            });
            this.refDonateNowBtn.current.setAttribute('disabled', 'disabled');
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
    //     } else {
    //         ele.value = '$' + (val && val.toString() !== 'NaN' ? val : '');
    //         eleFixedDonationAmount.childNodes.forEach((item) => {
    //             item.classList.remove('selected');
    //         });
    //         this.refDonateNowBtn.current.setAttribute('disabled', 'disabled');
    //     }
    // }

    // onChangeDonationAmount(e) {
    //     let ele = e.target;
    //     let val = parseFloat(ele.value.replace('$', '').match(/[0-9]/g)?.join(''));
    //     let context = this.context.PaymentContext;
    //     let eleFixedDonationAmount = this.refFixedDonationAmount.current;

    //     if(this.refDonationAmount.current.value !== '$' && this.state.isDonateBtnEnabled === true)
    //     {
    //         this.refDonationAmount.current.value.replace('$','') < context[context.donationMethod].default.minAmount ? this.setState({ isDonateBtnEnabled : true }) : this.setState({ isDonateBtnEnabled : false }) ;
    //     }

    //     if (val >= context[context.donationMethod].default.minAmount) {
            
    //         ele.value = commaSeperatedAmount(CURRENCY_SYMBOL, val);
    //         this.setDonationAmountWidth(ele);
    //         // this.refDonateNowBtn.current.removeAttribute('disabled');
    //         this.state.frequency === 2 && this.state.regularFrequency === 0 ? this.setState({ isDonateBtnEnabled: true }) : this.setState({ isDonateBtnEnabled : false});

    //         eleFixedDonationAmount.childNodes.forEach((item) => {
    //             if (parseFloat(item.innerText.trim().replace('$', '')) === val) {
    //                 item.classList.add('selected');
    //             } else {
    //                 item.classList.remove('selected');
    //             }
    //         });
    //     } else {
    //         ele.value = '$' + (val && val.toString() !== 'NaN' ? val : '');
    //         eleFixedDonationAmount.childNodes.forEach((item) => {
    //             item.classList.remove('selected');
    //         });
    //         this.setState({ isDonateBtnEnabled : true })
    //         this.refDonateNowBtn.current.setAttribute('disabled', 'disabled');
    //     }
        
    //     if (this.props.isCauses) {
    //         this.setState({donateBtnTxt:`Donate ${ele.value} Now`})
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

        ele.parentNode.childNodes.forEach((ele) => ele.classList.remove('selected'));
        ele.classList.add('selected');
        ele.classList.remove('is-invalid');
        this.refDonationAmount.current.value = val;
        if(this.refDonationAmount.current.value !== '$') 
        {
            this.state.frequency === 2 && this.state.regularFrequency === 0 ? this.setState({ isDonateBtnEnabled: true }) : this.setState({ isDonateBtnEnabled : false});
        }
        else {
            this.setState({ isDonateBtnEnabled: true })
        } 
        this.setDonationAmountWidth(this.refDonationAmount.current);
        // this.refDonateNowBtn.current.removeAttribute('disabled');
        this.setState({ donationAmount: parseFloat(val.substr(1)) });
        // this.props.getNewPatronOffers(parseFloat(val.replace('$', '').match(/[0-9]/g)?.join('')))
    }

    onClickDonationFrequency(e) {
        let ele = e.target;
        let dataType = parseInt(ele.getAttribute('data-type'));
        // let PaymentContext = this.context.PaymentContext;
        let context = this.context.PaymentContext;
        
        ele.parentNode.childNodes.forEach((ele) => ele.classList.remove('selected'));

        if (dataType !== 2) {
            this.refDonationAmount.current.value === '$' || this.refDonationAmount.current.value.replace('$','') < context[context.donationMethod].default.minAmount ? this.setState({ isDonateBtnEnabled : true }) : this.setState({ isDonateBtnEnabled : false });
            this.refRegularFrequencyOptions.current.childNodes.forEach((ele) => ele.classList.remove('selected'));
        } else {
            // console.log(this.refDonationAmount.current.value);
            let isRegularSelected = false;
            this.refRegularFrequencyOptions.current.childNodes.forEach((item) => {
                if(item.classList.contains('selected')){
                    isRegularSelected = true
                }
            });
            isRegularSelected ? this.setState({ isDonateBtnEnabled : false }) : this.setState({ isDonateBtnEnabled : true })
        }
        // PaymentContext[PaymentContext.donationMethod].frequency = dataType;
        this.setState({ frequency: dataType, regularFrequency: dataType !== 2 ? 0 : this.state.regularFrequency }); //ele.target.innerText
        ele.classList.add('selected');
    }

    onClickRegularFrequencyOptions(e) {
        let ele = e.target;
        let dataType = parseInt(ele.getAttribute('data-type'));
        // let PaymentContext = this.context?.PaymentContext;
        let context = this.context.PaymentContext;

        ele.parentNode.childNodes.forEach((ele) => ele.classList.remove('selected'));
        // PaymentContext[PaymentContext.donationMethod].frequency = dataType;

        if(dataType !== 0 && (this.refDonationAmount.current.value !== '$' && this.refDonationAmount.current.value.replace(/[^\w\s]/gi, '') >= context[context.donationMethod].default.minAmount))
        {
            this.setState({ isDonateBtnEnabled : false });
        } else {
            this.setState({ isDonateBtnEnabled : true });
        }

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

            this.refType.current.childNodes.forEach(item => {
                if (item.classList.contains('selected')) {
                    PaymentContext[method].entity = item.innerText.trim();
                    return;
                }
            });
            // console.log("Value before sending : " , val);
            this.props.getNewPatronOffers(val)
            //console.log('PaymentContext', PaymentContext);

            if (this.props.isNavigate) {
                this.props.updateDonationAmount();
                this.props.history.push(this.props.isNavigate);
            } else {
                this.props.updateDonationAmount();
                this.props.close('DonationWidget');
            }
        } else {
            //eleDonationAmount.classList.add('is-invalid');
            eleDonationAmount.value = '';
            return false;
        }

        this.props.history.push('/payments');
        
    }

    handleKeyPress(e){

        let PaymentContext = this.context?.PaymentContext;

        let val = e.target.value;
        val = parseInt(val.replace(/[$,]/gi, ''));
        if(val !== PaymentContext[PaymentContext.donationMethod].default.maxAmount && e.key === '.')
        {
            this.setState({decimalval : true})
            e.target.setAttribute('maxlength', 11)
        }
    }

    componentDidMount() {
        // console.log("Mounted");
        // console.log(this.props.location.state);
        let PaymentContext = this.context?.PaymentContext;
        const context = this.context;
        // this.setState({ 
        //     frequency : PaymentContext[PaymentContext.donationMethod].frequency,
        //     regularFrequency : PaymentContext[PaymentContext.donationMethod].partPayment,
        // })

        const donationBlockDetails = context.blockDetails.filter((details) => details.blockId === DONATION_WIDGET__BLOCK_ID);

        if(this.state.blockTitle === '')
        {
            this.setState({ blockTitle : donationBlockDetails[0].blockTitle})
        }
        if(this.state.blockSubTitle === '')
        {
            this.setState({ blockSubTitle : donationBlockDetails[0].blockSubTitle});
        }

        setTimeout(() => {
            this.setDonationAmountWidth(this.refDonationAmount.current);
            this.refFixedDonationAmount.current.childNodes.forEach(item => {
                if (item.innerText.trim() === commaSeperatedAmount(CURRENCY_SYMBOL, this.state.donationAmount)) {
                    item.click();
                }
            });
        }, 250);

        if(this.props.donationWidgetData.selectedAmount)
        {
            // Check When Amount is updated from Summary Popup
            if(PaymentContext[PaymentContext.donationMethod].donationAmount !== this.props.donationWidgetData.selectedAmount)
            {
                this.refDonationAmount.current.value = commaSeperatedAmount(CURRENCY_SYMBOL, PaymentContext[PaymentContext.donationMethod].donationAmount);
                this.refFixedDonationAmount.current.childNodes.forEach(item => {
                    if ((CURRENCY_SYMBOL + (parseFloat(PaymentContext[PaymentContext.donationMethod].donationAmount))) === item.innerText) {
                        item.classList.add('selected');
                        this.refDonateNowBtn.current.removeAttribute('disabled');
                        this.setState({donateBtnTxt:`Donate ${item.innerText} Now`})
                        if(this.props.isCampainDetails){
                        // this.props.getPatronOffers(parseFloat(item.innerText.replace('$', '').match(/[0-9]/g)?.join('')))
                        this.props.getNewPatronOffers(item.innerText.replace(/[$,]/gi, '').match(/[0-9]/g)?.join(''))
                        }
                    } else {
                        item.classList.remove('selected');
                    }
                })

            }
            else
            {
                this.refFixedDonationAmount.current.childNodes.forEach(item => {
                    if ((CURRENCY_SYMBOL + (parseFloat(this.props.donationWidgetData.selectedAmount)) === item.innerText)) {
                        item.classList.add('selected');
                        this.refDonateNowBtn.current.removeAttribute('disabled');
                            // this.props.getNewPatronOffers(parseFloat(item.innerText.replace('$', '').match(/[0-9]/g)?.join('')))
                            this.props.getNewPatronOffers(item.innerText.replace(/[$,]/gi, '').match(/[0-9]/g)?.join(''))
                    } else {
                        this.refDonationAmount.current.value = commaSeperatedAmount(CURRENCY_SYMBOL, this.props.donationWidgetData.selectedAmount)
                        item.classList.remove('selected');
                    }
                })
            }
        }
        else
        {
            this.refFixedDonationAmount.current.childNodes.forEach(item => {
                if ((CURRENCY_SYMBOL + (parseFloat(this.props.donationWidgetData.donationAmounts[this.props.donationWidgetData.defaultAmountPosition ?? 0]) ?? 0)) === item.innerText) {
                    item.classList.add('selected');
                    this.refDonateNowBtn.current.removeAttribute('disabled');
                    this.setState({donateBtnTxt:`Donate ${item.innerText} Now`})
                    if(this.props.isCampainDetails){
                    // this.props.getPatronOffers(parseFloat(item.innerText.replace('$', '').match(/[0-9]/g)?.join('')))
                    this.props.getNewPatronOffers(item.innerText.replace(/[$,]/gi, '').match(/[0-9]/g)?.join(''))
                    }
                } else {
                    item.classList.remove('selected');
                }
            })
        }

        if (this.props.isUpdate || this.props.location.state) {
            this.setData(PaymentContext)
        }

        // this.refType.current.childNodes.forEach(item => {
        //     item.innerText === PaymentContext[PaymentContext.donationMethod].entity.replace(/\b[a-z]/g, (x) => x.toUpperCase()) ? item.classList.add('selected') : item.classList.remove('selected')
        // })

        // if(PaymentContext[PaymentContext.donationMethod].frequency.replace(/\b[a-z]/g, (x) => x.toUpperCase()) !== "One Time")
        // {
        //     this.setState({frequency : 2});
        //     this.refFrequency.current.childNodes.forEach(item => {
        //         item.innerText === PaymentContext[PaymentContext.donationMethod].frequency.replace(/\b[a-z]/g, (x) => x.toUpperCase()) ? item.classList.add('selected') : item.classList.remove('selected')
        //     })

        //     this.refRegularFrequencyOptions.current.childNodes.forEach(item => {
        //         if(item.innerText === PaymentContext[PaymentContext.donationMethod].partPayment.replace(/\b[a-z]/g, (x) => x.toUpperCase()))
        //         {
        //             item.classList.add('selected')
        //         }
        //     })
        // }
    }

    setData(PaymentContext) {
        let partPayment = PaymentContext[PaymentContext.donationMethod].partPayment
        let frequency = PaymentContext[PaymentContext.donationMethod].frequency
        let donationType = PaymentContext[PaymentContext.donationMethod].entity

        frequency = frequency.replace(/\b[a-z]/g, (x) => x.toUpperCase())
        partPayment = partPayment.replace(/\b[a-z]/g, (x) => x.toUpperCase())
        donationType = donationType.replace(/\b[a-z]/g, (x) => x.toUpperCase())


        this.refFrequency.current.childNodes.forEach(item => {
            if (frequency === item.innerText) {
                item.classList.add('selected');
            } else {
                item.classList.remove('selected');
            }
        });

        this.refType.current.childNodes.forEach(ele => {
            if(donationType == ele.innerText){
                ele.classList.add('selected')
                this.setState({ donationType: 2 })
            }else{
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
                <div className="solution">{/* {this.state.blockSubTitle} */}Please enter donation amount below</div>
                <div className="input-solution">
                    <input type="text" maxLength="8" ref={this.refDonationAmount} placeholder="$0"  onKeyPress={this.handleKeyPress} defaultValue={this.state.donationAmounts ? commaSeperatedAmount(CURRENCY_SYMBOL, this.state.donationAmounts) : ''} onChange={this.onChangeDonationAmount} /* onFocus={this.onFocusDonationAmount} */ /* onBlur={this.onBlurDonationAmount} */ className="donation-value form-control" />
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
                    <button type="button" ref={this.refDonateNowBtn} disabled={this.state.isDonateBtnEnabled} onClick={this.onClickDonateNow} className="btn btn-dark h-45" >Update</button>
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

export default withRouter(DonationWidgetStyle3);