import React, { useEffect, useState } from 'react';
import { useStripe, useElements } from '@stripe/react-stripe-js';
import { useMessages } from './StatusMessages';

export default function GooglePayPayment(props) {
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
        amount: props.donationAmount * 100,
      },
      requestPayerName: true,
      requestPayerEmail: true,
      wallets: ['googlePay']
    });

    // Check the availability of the Payment Request API.
    pr.canMakePayment().then(result => {

      if (result) {
        setPaymentRequest(pr);
        let button = document.getElementById('payment-request-button');
        button.addEventListener('click', pr.show);
      } else {
        document.getElementById('gpaydiv').style.display = 'none'
      }
    });

    pr.on('token', async (e) => {
      if (e.token) {
        e.complete('success')
        props.sendCardToken(e.token.id, 2, '')
      } else {
        e.complete('fail');
      }
    });
  }, [stripe, elements, addMessage]);

  return (
    <>
      <div className="btn btn-light g-pay" id="gpaydiv">
        <button id="payment-request-button" style={{
          backgroundImage: `url(/images/payment/g-pay.svg)`, backgroundPosition: 'center', backgroundSize: '100%', backgroundRepeat: 'no-repeat',
          height: "35.75px", width: "70.73px"
        }}>
        </button>
      </div>
    </>
  );
};
