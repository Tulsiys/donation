import React, { Suspense, lazy } from 'react';
import PageContext from '../../context';
import { commaSeperatedAmount, CURRENCY_SYMBOL } from '../../common';
import './css/donation-widget.css';
import { withRouter } from 'react-router-dom';
import { homePageService } from '../../jwt/_services/home-page-service';
import { PATRON_MIN_AMOUNT , PATRON_MAX_AMOUNT , DONATION_WIDGET__BLOCK_ID, NGS_CHARITY_ID } from '../../common/constant';

const ImageLoader = lazy(() => import('../../common/image-loader'));

class DonationWidgetPatronProgram extends React.Component {
    static contextType = PageContext;
    constructor(props) {
        super(props);

        this.state = {
            // amoutOptions: [2000, 5000, 10000, 15000, 25000, 50000],
            amoutOptions: this.props.amoutOptions ? this.props.amoutOptions : [],
            donationFrequencyOptions: [{ id: 1, value: 'One Time' }, { id: 7, value: 'Annual' }],
            regularFrequencyOptions: [],
            donationTypeOptions: [{ id: 1, value: 'Individual' }, { id: 2, value: 'Corporate' }],
            donationAmount: this.props.donationAmount,
            frequency: 7,
            regularFrequency: 0,
            donationType: 1,
            taxDeductibleText: 'Donations of $50 and above are eligible for 250% tax deduction \n and this will be automatically processed by the \n Inland Revenue Authority of Singapore (IRAS) according to \n your NRIC or UEN number',
            blockTitle: '',
            blockSubTitle: '',
            isDecrementBtn : false,
            isIncrementBtn : false,
            isJoinBtn: false,
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
        // this.onClickRegularFrequencyOptions = this.onClickRegularFrequencyOptions.bind(this);
        this.onClickDonationType = this.onClickDonationType.bind(this);
        this.onClickDonateNow = this.onClickDonateNow.bind(this);
        this.getDonationWidget = this.getDonationWidget.bind(this);
        this.highlightFixAmount = this.highlightFixAmount.bind(this);

        this.Increment = this.Increment.bind(this);
        this.Decrement = this.Decrement.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        // const FwRefFixedDonationAmount = React.forwardRef((props, ref) => {
            
        // });
    }    

    highlightFixAmount(amt) {        
        this.refFixedDonationAmount.current.childNodes.forEach((item) => {
            if (commaSeperatedAmount(CURRENCY_SYMBOL, amt) === item.innerText) {
                item.classList.add('selected');
                item.click();
            } else {
                item.classList.remove('selected');
            }
        });
    }

    Increment(){
        let eleDonationAmount = this.refDonationAmount.current;
        let val = eleDonationAmount.value.trim().replace(/[$,]/gi, '');
        if(val === '')
        {
            val = 0;
        }
        val = parseFloat(val);
        if(val !== PATRON_MAX_AMOUNT)
        {
            val += 500.00;
            val = val.toFixed(2);
            this.refFixedDonationAmount.current.childNodes.forEach((item) => {
                if (parseInt(item.innerText.trim().replace(/[$,]/gi, '')) === parseInt(val)) {
                    item.classList.add('selected');
                } else {
                    item.classList.remove('selected');
                }
            });
            this.props.setPatronProgram(parseInt(val));
            val >= PATRON_MIN_AMOUNT ? this.setState({isJoinBtn : false}) : this.setState({isJoinBtn : true});
            this.setState({isDecrementBtn : false});
            if(val >= PATRON_MAX_AMOUNT){
                this.refDonationAmount.current.value = commaSeperatedAmount(CURRENCY_SYMBOL, PATRON_MAX_AMOUNT)
                this.setState({isIncrementBtn : true});
                return;
            }
        }
        else
        {
            this.setState({isIncrementBtn : true});
        }
        this.refDonationAmount.current.value = commaSeperatedAmount(CURRENCY_SYMBOL, val)
        this.setDonationAmountWidth(eleDonationAmount);
    }

    Decrement(){
        let eleDonationAmount = this.refDonationAmount.current;
        let val = eleDonationAmount.value.trim().replace(/[$,]/gi, '');
        if(val !== '')
        {
            val = parseFloat(val);
            if(val !== 0 &&  val > PATRON_MIN_AMOUNT)
            {
                val -= 500.00;
                val = val.toFixed(2);
                this.refFixedDonationAmount.current.childNodes.forEach((item) => {
                    if (parseInt(item.innerText.trim().replace(/[$,]/gi, '')) === parseInt(val)) {
                        item.classList.add('selected');
                    } else {
                        item.classList.remove('selected');
                    }
                });
                this.props.setPatronProgram(parseInt(val));
                // val < PATRON_MIN_AMOUNT ? this.setState({isJoinBtn : true}) : this.setState({isJoinBtn : false});
                this.setState({isIncrementBtn : false});
            }
            else if(val <= PATRON_MIN_AMOUNT)
            {   
                this.setState({ isDecrementBtn : true })
            } else {
                val >= PATRON_MIN_AMOUNT ? this.setState({ isJoinBtn : false, isDecrementBtn : false}) : this.setState({ isJoinBtn : true, isDecrementBtn : true });
            }
        } else {
            this.setState({isDecrementBtn : true});
        }
        this.refDonationAmount.current.value = commaSeperatedAmount(CURRENCY_SYMBOL, val);
        this.setDonationAmountWidth(eleDonationAmount);
    }

    getDonationWidget(appealId) {
        homePageService.getDonationWidgetData(appealId)
            .then(response => {
                this.setState({
                    // amoutOptions: response.donationAmounts,
                    regularFrequencyOptions: response.recurringTypes,
                    taxDeductibleText: response.taxDeductibleText
                });
                // this.refFixedDonationAmount.current.childNodes.forEach((item) => {
                //     if ((CURRENCY_SYMBOL + (parseFloat(response.donationAmounts[response.defaultAmountPosition ?? 0]) ?? 0)) === item.innerText) {
                //         item.classList.add('selected');
                //         this.refDonateNowBtn.current.removeAttribute('disabled');
                //     } else {
                //         item.classList.remove('selected');
                //     }
                // });
            })
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
        
        if(this.refDonationAmount.current.value !== '$' && this.state.isJoinBtn === true)
        {
            this.refDonationAmount.current.value.replace('$','') < context[context.donationMethod].default.minAmount ? this.setState({ isJoinBtn : true }) : this.setState({ isJoinBtn : false }) ;
        }
        else
        {
            this.setState({ isJoinBtn : true })
        }

        if (val >= PATRON_MIN_AMOUNT) {
            // console.log("val : " , val);
            ele.value = this.refDonationAmount.current.value.replace(/[A-Za-z ~`!,@#%^&()_={}[\]:;<>+\/?-]/g, "");
            // let newval = commaSeperatedAmount(CURRENCY_SYMBOL, val);
            // console.log("ref value : " , commaSeperatedAmount(CURRENCY_SYMBOL, this.refDonationAmount.current.value.replace('$','')));
            // console.log("ele.value : " , ele.value);
            // console.log("newval : " , newval);
            // ele.value = commaSeperatedAmount(CURRENCY_SYMBOL, val.toString().replace('$',''))
            this.setDonationAmountWidth(ele);
            this.state.frequency === 2 && this.state.regularFrequency === 0 ? this.setState({ isJoinBtn: true }) : this.setState({ isJoinBtn : false});
            // this.refDonateNowBtn.current.removeAttribute('disabled');

            eleFixedDonationAmount.childNodes.forEach((item) => {
                if (parseFloat(item.innerText.trim().replace('$', '')) === val) {
                    item.classList.add('selected');
                } else {
                    item.classList.remove('selected');
                }
            });
            ele.value = commaSeperatedAmount(CURRENCY_SYMBOL, this.refDonationAmount.current.value.replace('$',''));
            this.props.setPatronProgram(ele.value.replace(/[$,]/gi, ''));

            this.refFixedDonationAmount.current.childNodes.forEach((item) => {
                if (parseInt(ele.value.replace(/[$,]/gi, '')) == item.innerText.replace(/[$,]/gi, '')) {
                    item.classList.add('selected');
                    //item.click();
                    this.setDonationAmountWidth(this.refDonationAmount.current);
                } else {
                    item.classList.remove('selected');
                }
            });

        }
        else {
            ele.value = '$' + (val && val.toString() !== 'NaN' ? val : '');
            eleFixedDonationAmount.childNodes.forEach((item) => {
                item.classList.remove('selected');
            });
            this.setState({isJoinBtn : true })
            // this.refDonateNowBtn.current.setAttribute('disabled', 'disabled');
        }

        if(val === PATRON_MAX_AMOUNT)
        {
            this.setState({
            isIncrementBtn : true,
            isDecrementBtn : false
        })}
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

    onBlurDonationAmount(e) {
        let ele = e.target;
        let val = ele.value.replace('$', '');
        // ele.value = commaSeperatedAmount('$', val);
        let eleFixedDonationAmount = this.refFixedDonationAmount.current;

        if(val < PATRON_MIN_AMOUNT)
        {
            this.refDonationAmount.current.value = commaSeperatedAmount('$',PATRON_MIN_AMOUNT)
            eleFixedDonationAmount.childNodes.forEach((item) => {
                if (parseFloat(item.innerText.trim().replace(/[$,]/gi, '')) === PATRON_MIN_AMOUNT) {
                    item.classList.add('selected');
                } else {
                    item.classList.remove('selected');
                }
            });
            this.props.setPatronProgram(PATRON_MIN_AMOUNT);
            this.setState({ isJoinBtn : false })
        }
    }

    setDonationAmountWidth(ele) {
        ele.style.width = ele.value.length * 25 + 'px';
    }

    onClickFixedDonationAmount(e) {
        let ele = e.target;
        let val = ele.innerText.trim();
        let amount = parseInt(val.replace(/[$,]/gi, ''));
        this.props.setPatronProgram(amount);
        ele.parentNode.childNodes.forEach((ele) => ele.classList.remove('selected'));
        ele.classList.add('selected');
        ele.classList.remove('is-invalid');
        this.refDonationAmount.current.value = val;
        if(val.replace(/[$,]/gi, '') == PATRON_MIN_AMOUNT)
        {
            this.setState({ isDecrementBtn : true, isIncrementBtn : false }) 
        }
        else
        {
            val.replace(/[$,]/gi, '') > PATRON_MIN_AMOUNT ? this.setState({ isDecrementBtn : false, isIncrementBtn : false }) 
            : this.setState({ isDecrementBtn : false, isIncrementBtn : true})
        }
        this.setDonationAmountWidth(this.refDonationAmount.current);
        this.refDonateNowBtn.current.removeAttribute('disabled');
        this.setState({isJoinBtn : false});
        this.setState({ donationAmount: parseFloat(val.substr(1)) });
        // this.setState({isDecrementBtn : false});
    }

    onClickDonationFrequency(e) {
        let ele = e.target;
        // return false
        let dataType = parseInt(ele.getAttribute('data-type'));
        //console.log(dataType);
        let PaymentContext = this.context.PaymentContext;

        ele.parentNode.childNodes.forEach((ele) => ele.classList.remove('selected'));
        // if (dataType !== 2) {
        //     this.refRegularFrequencyOptions.current.childNodes.forEach((ele) => ele.classList.remove('selected'));
        // }
        PaymentContext.patron.frequency = dataType === 1 ? "One Time" : "Annually";
        //console.log(PaymentContext.patron);
        this.setState({ frequency: dataType }); //ele.target.innerText
        ele.classList.add('selected');
    }

    // onClickRegularFrequencyOptions(e) {
    //     let ele = e.target;
    //     let dataType = parseInt(ele.getAttribute('data-type'));
    //     let PaymentContext = this.context?.PaymentContext;

    //     ele.parentNode.childNodes.forEach((ele) => ele.classList.remove('selected'));
    //     PaymentContext[PaymentContext.donationMethod].frequency = dataType;
    //     this.setState({ regularFrequency: dataType }); //ele.target.innerText
    //     ele.classList.add('selected');
    // }

    onClickDonationType(e) {
        let ele = e.target;
        let dataType = parseInt(ele.getAttribute('data-type'));

        ele.parentNode.childNodes.forEach((ele) => ele.classList.remove('selected'));
        this.setState({ donationType: dataType }); //ele.target.innerText
        ele.classList.add('selected');
    }

    onClickDonateNow(e) {
        let eleDonationAmount = this.refDonationAmount.current;
        const context = this.context;
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
                    PaymentContext.patron.frequency = item.innerText === 'Annual' ? 'Annually' : item.innerText.trim();
                    return;
                }
            });

            // this.refRegularFrequencyOptions.current.childNodes.forEach(item => {
            //     if (item.classList.contains('selected')) {
            //         PaymentContext[method].partPayment = item.innerText.trim();
            //         return;
            //     }
            // });

            this.refType.current.childNodes.forEach(item => {
                if (item.classList.contains('selected')) {
                    PaymentContext[method].entity = item.innerText.trim();
                    return;
                }
            });

            let values = context.blockDetails[9].settings[1].settingValue.split(',');

            this.props.history.push({
                pathname : '/patrons/payment',
                state: { detail: values }
            });
        } else {
            //eleDonationAmount.classList.add('is-invalid');
            eleDonationAmount.value = '';
            return false;
        }
        PaymentContext.patron.donationAmount = val
    }

    componentDidMount() {
        //let PaymentContext = this.context?.PaymentContext;
        this.props.onRef(this);
        const context = this.context;
        const donationBlockDetails = context.blockDetails.filter((details) => details.blockId === DONATION_WIDGET__BLOCK_ID);
        this.setState({
            //donationAmount: PaymentContext?.[PaymentContext.donationMethod].donationAmount ?? 0,
            blockTitle: donationBlockDetails[0].blockTitle,
            blockSubTitle: donationBlockDetails[0].blockSubTitle
        });
        
        this.refFixedDonationAmount.current.childNodes.forEach((item) => {
            if (CURRENCY_SYMBOL + this.state.donationAmount === item.innerText.replace(',', '')) {
                item.classList.add('selected');
                //item.click();
                this.setDonationAmountWidth(this.refDonationAmount.current);
            } else {
                item.classList.remove('selected');
            }
        });

        this.refDonationAmount.current.value.replace(/[$,]/gi, '') == PATRON_MIN_AMOUNT ? this.setState({ isDecrementBtn : true }) : this.setState({ isDecrementBtn : false })

        this.getDonationWidget(0);
    }

    render() {
        return (
            <div className="sec-donation-style-2 form">
                <button className="btn btn-light btn-close" onClick={() => this.props.close('DonationWidget')}>
                    <Suspense fallback={null}>
                        <ImageLoader type="image" src="/images/popup-close.svg"></ImageLoader>
                    </Suspense>
                </button>
                <div className="question">{this.state.blockTitle}</div>
                <div className="solution">{this.state.blockSubTitle}</div>
                <div className="input-solution plus-minus">
                    <button onClick={this.Decrement} disabled={this.state.isDecrementBtn} className="btn btn-light minus">
                        <Suspense fallback={null}>
                            <ImageLoader type="image" src="/images/sign-minus.svg"></ImageLoader>
                        </Suspense>
                    </button>
                    <div className="line"></div>
                    <input type="text" maxLength="8" ref={this.refDonationAmount} placeholder="$0" onKeyPress={this.handleKeyPress} defaultValue={this.state.donationAmount ? commaSeperatedAmount(CURRENCY_SYMBOL, this.state.donationAmount) : ''} onBlur={this.onBlurDonationAmount} onChange={this.onChangeDonationAmount} /* onFocus={this.onFocusDonationAmount} */ /* onBlur={this.onBlurDonationAmount} */ className="donation-value form-control" />
                    <button onClick={this.Increment} disabled={this.state.isIncrementBtn} className="btn btn-light plus">
                        <Suspense fallback={null}>
                            <ImageLoader type="image" src="/images/sign-plus.svg"></ImageLoader>
                        </Suspense>
                    </button>
                </div>
                <div ref={this.refFixedDonationAmount} className="c-amount-options">
                    {
                        this.state.amoutOptions.map((item, index) => {
                            return <button type="button" onClick={this.onClickFixedDonationAmount} className="btn btn-light" key={index}>{commaSeperatedAmount(CURRENCY_SYMBOL, item)}</button>
                        })
                    }
                </div>
                <div className="frequency">
                    <div className="title">Donation Frequency</div>
                    <div ref={this.refFrequency} className="type">
                        {
                            this.state.donationFrequencyOptions.map((item, index) => {
                                return <button type="button" data-type={item.id} onClick={this.onClickDonationFrequency} className={"btn btn-light " + (parseInt(item.id) === 7 ? 'selected' : '')} key={index}>{item.value}</button>
                            })
                        }
                    </div>
                    {/* <div className="type-regular-options">
                        <div ref={this.refRegularFrequencyOptions}>
                            {
                                this.state.regularFrequencyOptions.map((item, index) => {
                                    return <button type="button" data-type={item.id} onClick={this.onClickRegularFrequencyOptions} className="btn btn-light" key={index} disabled={this.state.frequency !== 2 ? true : false}>{item.title}</button>
                                })
                            }
                        </div>
                    </div> */}
                </div>
                <div className="donation-type">
                    <div className="title">Contribution Type</div>
                    <div ref={this.refType} className="type">
                        {
                            this.state.donationTypeOptions.map((item, index) => {
                                return <button type="button" data-type={item.id} onClick={this.onClickDonationType} className={"btn btn-light " + (parseInt(item.id) === 1 ? 'selected' : '')} key={index}>{item.value}</button>
                            })
                        }
                    </div>
                </div>
                <div className="c-btn-donate">
                    <button type="button" ref={this.refDonateNowBtn} onClick={this.onClickDonateNow} className="btn btn-dark h-45" disabled={this.state.isJoinBtn}>Join/Renew Now</button>
                    {/* <PaymentContext.Consumer>
                                {
                                    (context) => <button type="button" ref={this.refDonateNowBtn} onClick={context.onClick} className="btn btn-dark h-45" disabled={true}>Donate Now</button>
                                }
                            </PaymentContext.Consumer> */}
                </div>
                <div className="note">
                    {this.state.taxDeductibleText}
                </div>
            </div>

        )
    }
}

export default withRouter(DonationWidgetPatronProgram);

