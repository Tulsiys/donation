import React, { Suspense, lazy } from 'react';
import PageContext from './context';
import {  GET_PARENT, commaSeperatedAmount, CURRENCY_SYMBOL, } from './common';
import DonationWidgetPopup2 from './views/payments/components/donation-widget-popup-2';
import { homePageService } from './jwt/_services/home-page-service';
import { programmeService } from './jwt/_services/programme-service';
import { appeal } from './jwt/_services/appeal-service';
import { NGS_CHARITY_ID } from './common/constant';

const ImageLoader = lazy(() => import('./common/image-loader'));
class CauseSummary extends React.Component {
    static contextType = PageContext;

    constructor(props) {
        super(props);
        console.log('3243424324',this.props)
        console.log('212121221',this.props.popupDonationWidget)
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
            minAmount: 0,
        }

        this.closePopup = this.closePopup.bind(this);
        this.newDonationAmount = this.newDonationAmount.bind(this);
        this.onClickSelect = this.onClickSelect.bind(this);
console.log('1212-------',this.newDonationAmount);
        this.setdata = this.setdata.bind(this);
        this.getPatronOffers = this.getPatronOffers.bind(this);

    }

    closePopup(name) {
        this.setState({
            ['popup' + name]: false,
        });
    }

    newDonationAmount() {
        let PaymentContext = this.context?.PaymentContext;
        console.log('234343244------',PaymentContext);
        this.setState({ donationAmount: PaymentContext?.[PaymentContext.donationMethod].donationAmount, popupDonationWidget: false });
    }

    onClickSelect(e) {
        e.preventDefault();
        let ele = e.target;
        let aNode = GET_PARENT(ele, 'A');
        let paymentContext = this.context.PaymentContext;
        let donationMethod = paymentContext.donationMethod;
        let id = ele.querySelector("div > img");
        let val = aNode.innerText.trim();
        paymentContext.cause.causes = val;
        let causeid = this.state.causesData.filter((item) => item.brief.trim() === paymentContext.cause.causes.trim());
        paymentContext.cause.id = parseInt(causeid[0].id);
        [...aNode.parentNode.childNodes].map(item => item.classList.remove('selected'));
        aNode.classList.add('selected');
    }

    getPatronOffers(amount) {
        console.log('AMount---------',amount)
        let amountRaised = Number.isInteger(amount) ? parseInt(amount) : parseFloat(amount);
        let offers = this.state.patronProgrammesData.length - 1
        let firstProgramme = this.state.patronProgrammesData[0];

        const currentOffer = this.state.patronProgrammesData.find(function (item, index) {
            return (amountRaised >= item.minAmount) && index != offers ? (amountRaised <= item.maxAmount) : true
        })

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
                })
            } else {
                var diffAmount = currentOffer.maxAmount - amountRaised;
                diffAmount = Number.isInteger(diffAmount) ? parseInt(diffAmount) : parseFloat(diffAmount).toFixed(2);

                const newOffer = this.state.patronProgrammesData.find(function (item, index) {
                    return ((currentOffer.maxAmount + 1) >= item.minAmount) && (index != offers ? currentOffer.maxAmount + 1 <= item.maxAmount : true)
                })
                if (newOffer !== undefined) {
                    var newDiffAmount = newOffer.minAmount - amountRaised
                    newDiffAmount = Number.isInteger(newDiffAmount) ? parseInt(newDiffAmount) : parseFloat(newDiffAmount).toFixed(2);
                    this.setState({
                        patronNewOfferName: currentOffer.patronName,
                        patronId: currentOffer.id,
                        patronDiffAmount: diffAmount,
                        patronAmount: amountRaised,
                        patronNextOfferName: newOffer.patronName,
                        newDiffAmount: newDiffAmount
                    })
                }
                else {
                    this.setState({
                        patronNewOfferName: currentOffer.patronName,
                        patronId: currentOffer.id,
                        patronDiffAmount: '',
                        patronAmount: '',
                        patronNextOfferName: currentOffer.patronName,
                        newDiffAmount: ''
                    })
                }
            }
        }
    }

    setdata(response) {
        console.log('21221',response);
        this.setState(prevState => ({
            note: response.taxDeductibleText,
            isDonationWidgetData: true,
            donationWidgetData: {
                ...prevState.donationWidgetData,
                amoutOptions: [...response.donationAmounts],
                recurringTypes: [...response.recurringTypes],
                latestDonationText: response.latestDonationText,
                taxDeductibleText: response.taxDeductibleText,
                donationAmounts: response.donationAmounts,
                defaultAmountPosition: response.defaultAmountPosition,
                selectedAmount: this.state.donationAmount
            }
        })
        );

        this.setState({ note: response.taxDeductibleText });
    }

    componentDidMount() {

        let method = localStorage.getItem('isMyInfo')
        if (method) {
            window.location.href = '/'
        }

        let PaymentContext = this.context?.PaymentContext;
        let amt = '';
        let data = JSON.parse(localStorage.getItem('context'))

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
            })
        } else {
            this.setState({
                donationAmount: PaymentContext?.[PaymentContext.donationMethod].donationAmount ?? '',
                beAssociateAmount: 2000 - PaymentContext?.[PaymentContext.donationMethod].donationAmount
            });
        }

        const appealID = 0;
        homePageService.getDonationWidgetData(appealID)
            .then((response) => {
                this.setdata(response);
            })

        programmeService.getPatronProgrammes(0, 0)
            .then((response) => {
                this.setState({
                    patronProgrammesData: [...response.patronProgrammes],
                    isPatronProgrammesData: true
                });
            })
            .then(() => {
                this.getPatronOffers(this.state.donationAmount)
            });

        let payload = {
            "charityId": NGS_CHARITY_ID,
            "search": "",
            "type": 2,
            "pageNumber": 0,
            "pageSize": 0
        }
        appeal.getAppealList(payload)
            .then(response => {
                let data = response.pillarDetails?.map((item) => {

                    let obj = { id: item.id, brief: item.name.trim(), imgSrc: item.imagePath }
                    return obj;
                })

                let gallery = data.filter((item) => item.brief === `The Gallery's Vision`)
                let others = data.filter((item) => item.brief !== `The Gallery's Vision`)

                let causes = [...gallery, ...others]

                this.setState({ causesData: causes })

                let causeName = PaymentContext.cause.causes;
                response.pillarDetails?.map((item) => {
                    if (item.name.trim() === causeName.trim()) {
                        PaymentContext.cause.id = item.id
                    }
                })
            })
    }

    componentDidUpdate() {
        let PaymentContext = this.context?.PaymentContext;
        if (PaymentContext?.[PaymentContext.donationMethod].donationAmount !== this.state.donationAmount) {
            this.getPatronOffers(this.state.donationAmount)
        }
    }

    render() {
        let paymentContext = this.context.PaymentContext;
        let donationMethod = paymentContext.donationMethod;

        return (
            <>
                <div className="donation-details">
                    {/* <div className="name">Support {COMPANY_NAME_FULL}</div>
                    <div className="c-img-logo">
                        <Suspense fallback={null}>
                            <ImageLoader type="image" src="/logo-big.png"></ImageLoader>
                        </Suspense>
                    </div> */}
                    <div className="c-amount">
                        <span className="amt">{commaSeperatedAmount(CURRENCY_SYMBOL, this.state.donationAmount)}</span>
                        <button className="btn btn-light c-edit" onClick={() => this.setState({ popupDonationWidget: true })}>
                            <Suspense fallback={null}>
                                <ImageLoader type="image" src="/images/edit.svg"></ImageLoader>
                                <p>Click me</p>
                            </Suspense>
                        </button>
                    </div>
                    <div className="entity">
                        <span>{paymentContext.cause.entity.charAt(0).toUpperCase() + paymentContext.cause.entity.substring(1)}</span>
                    </div>

                    {/* <div className="c-options">
                        <span>{paymentContext[donationMethod].entity}</span>
                        <span className="bullet">&nbsp;{paymentContext[donationMethod].frequency}</span>
                        {paymentContext[donationMethod].frequency !== 'One Time' ?
                            paymentContext[donationMethod].partPayment ? <span> {paymentContext[donationMethod].partPayment}</span> : null : null}
                    </div> */}
                </div>

                {/* <div className="c-bottom sumry">
                    <div className="h-line"></div>
                    <div className='note'>
                        All donations with a valid identification number are
                        entitled to 250% tax deduction of the donated
                        amount and will be submitted to IRAS automatically.
                    </div>
                    <div className="note" dangerouslySetInnerHTML={{ __html: this.state.note }}></div>
                </div> */}
{console.log('222---------',this.state.donationWidgetData)}
                {
                    this.state.popupDonationWidget ?
                        <DonationWidgetPopup2
                            updateDonationAmount={this.newDonationAmount}
                            close={this.closePopup}
                            donationWidgetData={this.state.donationWidgetData}
                            getPatronOffers={this.getPatronOffers}></DonationWidgetPopup2>
                        :
                        // null
                        alert('fsdfsdfsdf')
                }
            </>
        )
    }
}

export default CauseSummary;