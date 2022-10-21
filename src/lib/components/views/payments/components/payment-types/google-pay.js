import React, { useState, useEffect } from "react";

const baseCardPaymentMethod = {
  type: "CARD",
  parameters: {
    allowedCardNetworks: ["VISA", "MASTERCARD"],
    allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
    billingAddressRequired: true,
        billingAddressParameters: {
          format: "FULL",
          phoneNumberRequired: true
        }
  }
};

const googlePayBaseConfiguration = {
  apiVersion: 2,
  apiVersionMinor: 0,
  allowedPaymentMethods: [baseCardPaymentMethod]
};



export default function GooglePay(props) {

  const { googlePayClient } = window;
  const [gPayBtn, setGPayBtn] = useState(null);
  const [loaded, setLoaded] = useState(false)

  function onGooglePayLoaded() {
    const google = window.google
    window.googlePayClient = new google.payments.api.PaymentsClient({
      environment: "TEST"
    });
  }

  function createAndAddButton() {
    if (googlePayClient) {
      const googlePayButton = googlePayClient.createButton({
        buttonColor: "white",
        buttonType: "short",
        className: "",
        onClick: processPayment
      });

      setGPayBtn(googlePayButton);
    }
  }

  function processPayment() {
    const tokenizationSpecification = {
      type: "PAYMENT_GATEWAY",
      parameters: {
        gateway: "stripe",
        "stripe:version": "v3",
        "stripe:publishableKey": "pk_test_0i0Up5UNkTgfCwiQPOkM6LoD001AjQYhUq"
      }
    };

    const cardPaymentMethod = {
      type: "CARD",
      tokenizationSpecification: tokenizationSpecification,
      parameters: {
        allowedCardNetworks: ["VISA", "MASTERCARD"],
        allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
        
      }
    };

    const transactionInfo = {
      totalPriceStatus: "FINAL",
      // totalPrice: "123.45",
      totalPrice: props.donationAmount.toString(),
      currencyCode: "USD"
    };

    const merchantInfo = {
      // merchantId: '01234567890123456789', Only in PRODUCTION
      merchantName: "Example Merchant Name"
    };

    const paymentDataRequest = {
      ...googlePayBaseConfiguration,
      ...{
        allowedPaymentMethods: [cardPaymentMethod],
        transactionInfo,
        merchantInfo
      }
    };

    googlePayClient
      .loadPaymentData(paymentDataRequest)
      .then(function (response) {
        let token = JSON.parse(response.paymentMethodData.tokenizationData.token).id
        props.sendCardToken(token, 2, '')
      })
  }

  useEffect(() => {
    const script = document.createElement('script');
    document.body.appendChild(script);
    script.onload = function () { onGooglePayLoaded() }
    script.src = "https://pay.google.com/gp/p/js/pay.js";
    script.addEventListener('load', () => setLoaded(true))
    script.async = true;
    return () => {
      document.body.removeChild(script);
    }
  }, []);

  useEffect(() => {
    if (!loaded) return
    createButton()
  }, [loaded])

  function createButton() {
    googlePayClient
      .isReadyToPay(googlePayBaseConfiguration)
      .then(function (response) {
        if (response.result) {
          createAndAddButton();
        } else {
          alert("Unable to pay using Google Pay");
        }
      })
      .catch(function (err) {
        console.error("Error determining readiness to use Google Pay: ", err);
      });
  }

  return (
    /* <div className="App"> */
      <div className="btn btn-light g-pay" style={{background:'#ffffff url(/images/payment/g-pay.svg) center center no-repeat!important'}}
        onClick={processPayment}
        dangerouslySetInnerHTML={{ __html: gPayBtn && gPayBtn.innerHTML }}
      />
    /* </div>*/
  );
}
