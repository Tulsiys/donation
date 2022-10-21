import { withRouter } from 'react-router-dom';
import React, { useState, useEffect, Suspense } from "react";
import { useStripe } from '@stripe/react-stripe-js'
import ImageLoader from '../../../../common/image-loader';
import { cardService } from '../../../../service/cardService';
import { authContext } from '../../../../data/authContext';
import { PaymentContext } from '../../../../data/context';

const GrabPay = (props) => {
  const stripe = useStripe();
  const handleGrabPay = async (e) => {

    localStorage.setItem('amount', props.grabDonatepayload.amount)
    localStorage.setItem('grbobj', JSON.stringify(props.grabDonatepayload));
    let page = localStorage.getItem("CurrPage")
    let context = localStorage.getItem('context')

    if(page === null){
      localStorage.setItem("CurrPage", [PaymentContext.donationMethod])
    }

    if(context === null){
      localStorage.setItem("context" , JSON.stringify(PaymentContext?.[PaymentContext.donationMethod]))
    }
    // handle patron specific case
    if(page === 'patron' && context !== null){
      localStorage.setItem("context" , JSON.stringify(PaymentContext.patron))
    }

    props.showGrabPayProcessingDialog('')

    cardService.donateNowGrabPayment(props.grabDonatepayload).then((response) => {
      if (response.status == 1) {
        localStorage.setItem("isGrabPay", true);
        localStorage.setItem("txnNo", response.txnNo);
        localStorage.setItem("paymentIntentId", response.paymentIntentId);
        setAuthContextData()
        // Confirm payment intent on the client
        if (response.clientSecret !== '') {
          props.hideGrabPayProcessingDialog('')
          const { error: stripeError, paymentIntent }
            = stripe.confirmGrabPayPayment(response.clientSecret, {
              return_url: props.redirectPage
            })
        }
      } else {
        props.showTransactionFailedDialog('')
      }
    });
  }

  function setAuthContextData() {
    if (localStorage.getItem("isAuthenticated") === 'true') {
      localStorage.setItem('guid', authContext.guid)
      localStorage.setItem('userName', authContext.userName)
      localStorage.setItem('userEmail', authContext.userEmail)
    } else {
      localStorage.setItem('guid', '')
      localStorage.setItem('userName', '')
      localStorage.setItem('userEmail', '')
    }
  }

  return (
    <>
      <button type="button" id="grabpay-button" className="btn btn-light btn-grabpay" onClick={handleGrabPay}>
        <Suspense fallback={null}>
          <ImageLoader type="image" src="/images/cards/grab-pay.svg"></ImageLoader>
        </Suspense>
      </button>
    </>
  )
}

export default withRouter(GrabPay);
