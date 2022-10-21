import React, {useEffect, useState} from 'react';
// import {withRouter} from 'react-router-dom';
import {PaymentRequestButtonElement, useStripe, useElements} from '@stripe/react-stripe-js';
import StatusMessages, {useMessages} from './StatusMessages';
import { PAYMENT_TYPES, PAYMENT_ORDER } from '../../../../common/constant';

export default function ApplePay(props){
  const stripe = useStripe();
  const elements = useElements();
  const [paymentRequest, setPaymentRequest] = useState();
  const [messages, addMessage] = useMessages();

  useEffect(() => {  
    if (!stripe || !elements) {
      return;
    }

    const pr = stripe.paymentRequest({
      country: 'SG',
      currency: 'sgd',
      total: {
        label: 'Donation Amount',
        amount: props.donationAmount*100,
      }, 
      // wallets: ["applePay"],
      requestPayerName: true, 
      requestPayerEmail: true,
    });

    // Check the availability of the Payment Request API.
    pr.canMakePayment().then(result => {
      if (result) {
        setPaymentRequest(pr);
      }
    });

    pr.on('token', async (e) => {
      if(e.token){
        e.complete('success')
        props.sendCardToken(e.token.id, PAYMENT_TYPES.APPLE_PAY,'', PAYMENT_ORDER )
      }else{
        e.complete('fail');
      }
    });
  }, [stripe, elements, addMessage]);

  return ( 
    <>
      {paymentRequest && <PaymentRequestButtonElement options={{paymentRequest}} />}
    </>
  );
};
