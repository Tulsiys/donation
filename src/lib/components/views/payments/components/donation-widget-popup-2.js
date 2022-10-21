import React, { Suspense, lazy } from 'react';
import DonationWidgetStyle3 from '../../../section/donation/donation-widget-style-3';
const ImageLoader = lazy(() => import('../../../common/image-loader'));


class DonationWidgetPopup2 extends React.Component {
    constructor(props) {
        super(props);
    }

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
                    <DonationWidgetStyle3 
                        updateDonationAmount={this.props.updateDonationAmount} 
                        close={this.props.close} 
                        isNavigate={'/payments'} 
                        donationWidgetData={this.props.donationWidgetData} 
                        getNewPatronOffers={this.props.getPatronOffers}
                        isUpdate={true}></DonationWidgetStyle3>
                </div>
                <div className="popup-backdrop"></div>
            </>
        )
    }
}

export default DonationWidgetPopup2;