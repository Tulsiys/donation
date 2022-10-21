import React from 'react';
import './css/donation-offer.css';
import { CURRENCY_SYMBOL, commaSeperatedAmount } from '../../common';
import { withRouter } from 'react-router-dom';

class DonationOfferStyle1 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            associateAmount: this.props.associateAmount ?? 0
        }
        this.onClickProgramDetails = this.onClickProgramDetails.bind(this);
    }

    onClickProgramDetails() {
        this.props.history.push({ pathname: '/patrons', state: { selectedPatronId: this.props.patronId } });
    }

    render() {
        return (
            <div className="donation-offer">
                <div className="offer">
                    {this.props.patronNewOfferName !== this.props.patronNextOfferName && this.props.associateAmount < this.props.minAmount ?
                        <> Donate <span>{commaSeperatedAmount(CURRENCY_SYMBOL, this.props.diffAmount)}
                        </span> more<br />and you will be eligible for </>
                        :
                        // <> Great! You are now eligible <br /> for {this.props.patronNewOfferName} Patron Program </>
                        <> Great! You are now eligible for </>
                    }
                </div>
                <div className="offer-box">
                    <div className="c-head">
                        <div className="head">{this.props.patronNewOfferName}</div>
                        <div className="program">Patron Programme</div>
                    </div>
                    <button className="btn btn-light" onClick={this.onClickProgramDetails}>Learn More</button>
                </div>
                <div className="offer new">
                    {(this.props.associateAmount < this.props.minAmount)
                        || this.props.patronNewOfferName === this.props.patronNextOfferName ?
                        ""
                        :
                        <> Donate <span>{commaSeperatedAmount(CURRENCY_SYMBOL, this.props.newDiffAmount)} </span>
                            more<br />and you will be eligible for <span>{this.props.patronNextOfferName}</span> Patron Program </>
                    }
                </div>
            </div>
        )
    }
}

export default withRouter(DonationOfferStyle1);