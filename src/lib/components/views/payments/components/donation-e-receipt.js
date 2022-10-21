import React, { lazy, Suspense } from 'react';
import CurrencyFormat from 'react-currency-format';
import { Link } from 'react-router-dom';
import { Common } from '../../../common/common';

const ImageLoader = lazy(() => import('../../../common/image-loader'));


class DonationEReceipt extends React.Component {

    render() {
        const _props = this.props;
        return (
            <div className="c-donation-e-receipt">
                <div className="c-img">
                    <Suspense fallback={null}>
                        <ImageLoader type="image" src={'/images/receipt.svg'} />
                    </Suspense>
                </div>
                <h3>Donor Enrolled & Donation e-Receipt sent to</h3>
                <div className="user-details"><span>{_props.data.userEmail}</span>{Common.isValidField(_props.data.userMobile) ? <> &amp; <span>{_props.data.userMobile}</span></> : ''}</div>
                {/* <div className="user-details">{_props.data.userEmail}  {_props.data.userMobile ? `& ` + `${<CurrencyFormat displayType={'text'} format="+### #### ######" mask="" value={"+91 94239394"} /> }`: ''}</div> */}

                <p>Thank you for your generosity. You will receive an email and sms with a web link to your donation receipt</p>
                <Link to="/" className="btn btn-light">GO TO HOME</Link>
            </div>
        )
    }
}

export default DonationEReceipt;