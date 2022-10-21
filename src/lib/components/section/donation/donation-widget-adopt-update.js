import React, { Suspense, lazy } from 'react';
import { withRouter } from 'react-router-dom';
import { DONATION_WIDGET__BLOCK_ID } from '../../common/constant';
import { commaSeperatedAmount, CURRENCY_SYMBOL } from '../../common';
import PageContext from '../../context';
import '../../section/donation/css/donation-widget.css';
import { ADOPT_MIN_AMOUNT , ADOPT_MAX_AMOUNT , NGS_CHARITY_ID } from '../../common/constant';

const ImageLoader = lazy(() => import('../../common/image-loader'));


class AdoptDonationWidget extends React.Component {
    static contextType = PageContext;

    constructor(props) {

        super(props);
        this.state = {
            blockTitle: this.props.blockTitle ? this.props.blockTitle : 'Adoption Amount',
            blockSubTitle: this.props.blockSubTitle ? this.props.blockSubTitle : 'Please enter adoption amount below',
            amoutOptions: this.props.donationWidgetData ? this.props.donationWidgetData.donationAmounts.slice(0, 6) : [50, 100, 200, 500, 1000, 2000], 
            donationTypeOptions: [{ id: 1, value: 'Individual' }, { id: 2, value: 'Corporate' }],
            donationAmount: this.props.donationWidgetData ? parseFloat(this.props.donationWidgetData.donationAmounts[this.props.donationWidgetData.defaultAmountPosition ?? 0]) : 0,
            artworkPrivilege: this.props.artworkPrivilege,
            artworkTitle: this.props.artworkTitle,
            frequency: 1,
            regularFrequency: 0,
            donateBtnTxt: 'DONATE NOW',
            donationType: 1,
            latestDonationText: this.props.donationWidgetData ? this.props.donationWidgetData.latestDonationText : '',
            taxDedutionText: this.props.donationWidgetData ? this.props.donationWidgetData.taxDeductibleText : '',
            regularFrequencyOptions: this.props.donationWidgetData ? this.props.donationWidgetData.recurringTypes : [],
            isDecrementBtn : false,
            isIncrementBtn : false,
            isDonateBtnEnabled : false,
        }

        this.refDonationAmount = React.createRef();
        this.refFixedDonationAmount = React.createRef();
        this.refFrequency = React.createRef();
        this.refRegularFrequencyOptions = React.createRef();
        this.refType = React.createRef();
        this.refDonateNowBtn = React.createRef();

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

    onChangeDonationAmount(e) {
        let ele = e.target;
        let val = parseFloat(ele.value.replace(/[$,]/gi, '').match(/[0-9]/g)?.join(''));
        let context = this.context.PaymentContext;
        let eleFixedDonationAmount = this.refFixedDonationAmount.current;
        let eleDonationAmount = this.refDonationAmount.current;

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

        if(this.refDonationAmount.current.value !== '$' && this.state.isDonateBtnEnabled === true)
        {
            this.refDonationAmount.current.value.replace('$','') < context[context.donationMethod].default.minAmount ? this.setState({ isDonateBtnEnabled : true }) : this.setState({ isDonateBtnEnabled : false }) ;
        }
        else
        {
            this.setState({ isDonateBtnEnabled : true })
        }

        // this.props.setAdoptProgram(val, e);
        if (val >= ADOPT_MIN_AMOUNT) {
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
            this.setState({ isDonateBtnEnabled : false});
            // this.refDonateNowBtn.current.removeAttribute('disabled');

            eleFixedDonationAmount.childNodes.forEach((item) => {
                if (parseFloat(item.innerText.trim().replace(/[$,]/gi, '')) === val) {
                    item.classList.add('selected');
                } else {
                    item.classList.remove('selected');
                }
            });
            ele.value = commaSeperatedAmount(CURRENCY_SYMBOL, this.refDonationAmount.current.value.replace('$',''));
            // setTimeout(() => ele.value = commaSeperatedAmount(CURRENCY_SYMBOL, newVal),5);
        
        } else {
            // let newVal =  Math.ceil(val / 50) * 50;
            ele.value = '$' + (val && val.toString() !== 'NaN' ? val : '');
            eleFixedDonationAmount.childNodes.forEach((item) => {
                item.classList.remove('selected');
            });
            // this.refDonateNowBtn.current.setAttribute('disabled', 'disabled');
            this.setState({ isDonateBtnEnabled : true , donateBtnTxt: `Donate Now`})
        }

        if (this.props.isArtworkDetails) {
            this.setState({ donateBtnTxt: `Donate ${ele.value} Now`, detail:this.state.artworkPrivilege, artworkPrivilege: this.props.artworkPrivilege })
            // return this.props.getPatronOffers(val)
        }

        val > ADOPT_MAX_AMOUNT ? this.setState({ isDonateBtnEnabled : true}) : this.setState({ isDonateBtnEnabled : false})
        this.setDonationAmountWidth(eleDonationAmount);
    }

    Increment(){
        let eleDonationAmount = this.refDonationAmount.current;
        let val = eleDonationAmount.value.trim().replace(/[$,]/gi, '');

        if(val === '')
        {
            val = 0;
        }
        if(val <= ADOPT_MAX_AMOUNT)
        {
            val = parseInt(val);
            val += 50;
            
            this.refFixedDonationAmount.current.childNodes.forEach((item) => {
                if (parseFloat(item.innerText.trim().replace(/[$,]/gi, '')) === val) {
                    item.classList.add('selected');
                } else {
                    item.classList.remove('selected');
                }
            });
            this.props.setAdoptProgram(val);
            val >= ADOPT_MIN_AMOUNT ? this.setState({isDonateBtnEnabled : false}) : this.setState({isDonateBtnEnabled : true});
            this.setState({isDecrementBtn : false});
            if(val > ADOPT_MAX_AMOUNT){
                this.setState({isIncrementBtn : true});
                return;
            }
        }
        else
        {
            this.setState({isIncrementBtn : true});
        }
        this.refDonationAmount.current.value = commaSeperatedAmount(CURRENCY_SYMBOL, val);
        this.setDonationAmountWidth(eleDonationAmount);
       
        this.setState({ donationAmount: val, donateBtnTxt: `Donate $${val} Now`, detail:this.state.artworkPrivilege, artworkPrivilege: this.props.artworkPrivilege });

    }

    Decrement(){
        let eleDonationAmount = this.refDonationAmount.current;
        let val = eleDonationAmount.value.trim().replace(/[$,]/gi, '');

        if(val === '')
        {
            val = 0;
        }

        if(val != ADOPT_MIN_AMOUNT)
        {
            val = parseInt(val);
            val -= 50;

            this.refFixedDonationAmount.current.childNodes.forEach((item) => {
                if (parseFloat(item.innerText.trim().replace(/[$,]/gi, '')) === val) {
                    item.classList.add('selected');
                } else {
                    item.classList.remove('selected');
                }
            });
            // this.props.setAdoptProgram(val);
            val < ADOPT_MIN_AMOUNT ? this.setState({isJoinBtn : true}) : this.setState({isJoinBtn : false});
            this.setState({isIncrementBtn : false});
            if(val === 0){
                this.setState({isDecrementBtn : true});
            }
        }
        else
        {
            this.setState({isDecrementBtn : true});
        }
        this.refDonationAmount.current.value = commaSeperatedAmount(CURRENCY_SYMBOL, val);
        this.setDonationAmountWidth(eleDonationAmount);
        this.setState({ donationAmount: val, donateBtnTxt: `Donate $${val} Now`, detail:this.state.artworkPrivilege, artworkPrivilege: this.props.artworkPrivilege });
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

        if(val !== '' && val <= ADOPT_MAX_AMOUNT)
        {
            let newVal = 0;
            let amount = parseInt(val);
            newVal = Math.round(amount / 50) * 50;
            ele.value = commaSeperatedAmount(CURRENCY_SYMBOL, newVal.toString());
            eleFixedDonationAmount.childNodes.forEach((item) => {
                if (parseFloat(item.innerText.trim().replace(/[$,]/gi, '')) == newVal) {
                    item.classList.add('selected');
                } else {
                    item.classList.remove('selected');
                }
            });

            this.setState({donateBtnTxt: `Donate ${commaSeperatedAmount(CURRENCY_SYMBOL, newVal.toString())} Now`})
        } else {
            ele.value = commaSeperatedAmount(CURRENCY_SYMBOL, ADOPT_MIN_AMOUNT);
            eleFixedDonationAmount.childNodes.forEach((item) => {
                if (parseFloat(item.innerText.trim().replace(/[$,]/gi, '')) == ele.value.replace(/[$,]/gi, '')) {
                    item.classList.add('selected');
                } else {
                    item.classList.remove('selected');
                }
            });
            this.setState({donateBtnTxt: `Donate ${commaSeperatedAmount(CURRENCY_SYMBOL, ele.value.replace(/[$,]/gi, ''))} Now`, isDonateBtnEnabled : false})
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
        ele.parentNode.childNodes.forEach((ele) => ele.classList.remove('selected'));
        ele.classList.add('selected');
        ele.classList.remove('is-invalid');
        this.refDonationAmount.current.value = val;
        this.setDonationAmountWidth(this.refDonationAmount.current);
       
        this.refDonateNowBtn.current.removeAttribute('disabled');
        this.setState({ donationAmount: parseFloat(val.substr(1)), detail:this.state.artworkPrivilege, donateBtnTxt: `Donate ${val} Now` , artworkPrivilege: this.props.artworkPrivilege});

        if(amount > ADOPT_MIN_AMOUNT && amount < ADOPT_MAX_AMOUNT)
        {
            this.setState({
                isDecrementBtn : false,
                isIncrementBtn : false
            })
        }
        else if(amount === ADOPT_MIN_AMOUNT) {
            this.setState({ 
                isDecrementBtn : true,
                isIncrementBtn : false,
            })
        }
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
        this.props.setAdoptProgram(parseInt(eleDonationAmount.value.replace(/[$,]/gi, '')))

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
                    pathname:this.props.isNavigate, 
                    state: {detail:artworkPrivilege, artworkTitleDetail: artworkTitle}
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

        const donationBlockDetails = context.blockDetails.filter((details) => details.blockId === DONATION_WIDGET__BLOCK_ID);

        let PaymentContext = this.context.PaymentContext;

        this.setState({
            donationAmount: PaymentContext[PaymentContext.donationMethod].donationAmount,
            blockTitle: donationBlockDetails[0].blockTitle,
            detail:this.state.artworkPrivilege
        },()=> {
            this.refFixedDonationAmount.current.childNodes.forEach((item) => {
                if (this.state.donationAmount == item.innerText.replace(/[$,]/gi, '')) {
                    item.classList.add('selected');
                    //item.click();
                    this.setDonationAmountWidth(this.refDonationAmount.current);
                } else {
                    item.classList.remove('selected');
                }
            });

            this.refType.current.childNodes.forEach((item) => {
                PaymentContext[PaymentContext.donationMethod].entity === item.innerText.trim() ? item.classList.add('selected') : item.classList.remove('selected');
            })
            
            this.setState({ donateBtnTxt: `Donate ${commaSeperatedAmount(CURRENCY_SYMBOL, this.state.donationBlockDetails)} Now`, isDonateBtnEnabled : false })
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
        return (
            <div className="sec-donation-style-2 form">
                <button className="btn btn-light btn-close" onClick={() => this.props.close('DonationWidget')}>
                    <Suspense fallback={null}>
                        <ImageLoader type="image" src="/images/popup-close.svg"></ImageLoader>
                    </Suspense>
                </button>
                {/* {this.state.isldtVisible ? <div className="donation-to-user">{this.state.latestDonationText}</div> : ''} */}
                <div className="question">{this.state.blockTitle}</div>
                <div className="solution">{this.state.blockSubTitle}</div>
                <div className="input-solution">
                <div className="input-solution plus-minus"> 
                    <button onClick={this.Decrement} disabled={this.state.isDecrementBtn} className="btn btn-light minus">
                        <Suspense fallback={null}>
                            <ImageLoader type="image" src="/images/sign-minus.svg"></ImageLoader>
                        </Suspense>
                    </button>
                    <div className="line"></div>
                    <input type="text" maxLength="8" ref={this.refDonationAmount} placeholder="$0" onKeyPress={this.handleKeyPress} onBlur={this.onBlurDonationAmount} defaultValue={this.state.donationAmount ? commaSeperatedAmount(CURRENCY_SYMBOL, this.state.donationAmount) : ''} onChange={this.onChangeDonationAmount} className="donation-value form-control" />
                    <div className="line"></div>
                    <button onClick={this.Increment} disabled={this.state.isIncrementBtn} className="btn btn-light plus">
                        <Suspense fallback={null}>
                            <ImageLoader type="image" src="/images/sign-plus.svg"></ImageLoader>
                        </Suspense>
                    </button>
                </div>
                </div>
                <div ref={this.refFixedDonationAmount} className="c-amount-options">
                    {
                        this.state.amoutOptions.map((item, index) => {
                            return <button type="button" onClick={this.onClickFixedDonationAmount} className="btn btn-light" key={index}>{commaSeperatedAmount(CURRENCY_SYMBOL, item)}</button>
                        })
                    }
                </div>

                <div className="donation-type">
                    <div className="title">Adoption Type</div>
                    <div ref={this.refType} className="type">
                        {
                            this.state.donationTypeOptions.map((item, index) => {
                                return <button type="button" data-type={item.id} onClick={this.onClickDonationType} className={"btn btn-light " + (parseInt(item.id) === 1 ? 'selected' : '')} key={index}>{item.value}</button>
                            })
                        }
                    </div>
                </div>
                <div className="c-btn-donate">
                    <button type="button" ref={this.refDonateNowBtn} onClick={this.onClickDonateNow} artworkPrivilege ={this.state.artworkPrivilege} className="btn btn-dark h-45" disabled={this.state.isDonateBtnEnabled}>UPDATE</button>
                </div>
                <div className="note">
                    {/* {this.state.taxDedutionText} */}
                </div>
            </div>

        )
    }
}

export default withRouter(AdoptDonationWidget);