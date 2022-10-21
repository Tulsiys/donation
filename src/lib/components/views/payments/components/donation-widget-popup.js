import React from 'react';
import DonationWidgetStyle2 from '../../../section/donation/donation-widget-style-2';

class DonationWidgetPopup extends React.Component {   

    componentWillMount() {
        document.body.style.overflow = 'hidden';
    }

    componentWillUnmount() {
        document.body.style.overflow = 'hidden auto';
    }

    render() {
        return (
            <> 
                <div className="popup">
                {/* <DonationWidgetStyle3 update={this.props.updateDonationAmount} close={this.props.close} isNavigate={'/payments'} donationWidgetData={this.props.donationWidgetData} getNewPatronOffers={this.props.getPatronOffers}></DonationWidgetStyle3> */}
                    <DonationWidgetStyle2 updateDonationAmount={this.props.updateDonationAmount} 
                    close={this.props.close} isNavigate={'/campaigns/payments'} 
                    donationWidgetData={this.props.donationWidgetData} 
                    getPatronOffers={this.props.getPatronOffers} 
                    isUpdate={true}></DonationWidgetStyle2>
                </div>
                <div className="popup-backdrop"></div> 
            </>
        )
    }
}

export default DonationWidgetPopup;