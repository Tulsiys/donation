import React, { Suspense, lazy } from 'react';
import DonationWidgetPatronPopup from '../../../section/donation/donation-widget-patron-popup';
const ImageLoader = lazy(() => import('../../../common/image-loader'));


class DonationWidgetPopup3 extends React.Component {
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
                    <DonationWidgetPatronPopup note={this.props.note} isUpdate={true} updateDonationAmount={this.props.updateDonationAmount} close={this.props.close} getPatronOffers={this.props.getPatronOffers} donationWidgetData={this.props.donationWidgetData}/>
                </div>
                <div className="popup-backdrop"></div>
            </>
        )
    }
}

export default DonationWidgetPopup3;