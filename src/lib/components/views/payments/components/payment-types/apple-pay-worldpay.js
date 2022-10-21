import React, { useEffect } from 'react';
import { applePay, ApplePaySession } from 'braintree-web';


export default function ApplePayWorldpayNew(props) {

    function getApplePaySession(url) {
        return new Promise(function (resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.open('POST', '/api/session/create');
            xhr.onload = function () {
                if (this.status >= 200 && this.status < 300) {
                    resolve(JSON.parse(xhr.response));
                } else {
                    reject({
                        status: this.status,
                        statusText: xhr.statusText
                    });
                }
            };      
    
         xhr.onerror = function () {
                reject({
                    status: this.status,
                    statusText: xhr.statusText
                });
            };
    
            xhr.setRequestHeader("Content-T ype", "application/json");
            xhr.send(JSON.stringify({validationUrl: url}));
        });
    }

    useEffect(() => {
        var paymentRequest = applePay.createPaymentRequest({
            countryCode: 'US',
            currencyCode: 'USD',
            supportedNetworks: ['visa', 'masterCard', 'amex', 'discover'],
            merchantCapabilities: ['supports3DS'],
            total: { label: 'Your Merchant Name', amount: props.donationAmount * 100 }});
            // console.log('---->', JSON.stringify(paymentRequest));
            var session = new window.ApplePaySession(3, paymentRequest);
            console.log('-->', JSON.stringify(session));

            session.onvalidatemerchant = (event) => {
                const validationURL = event.ValidationURL;
                getApplePaySession(validationURL).then(function (response) {
                    session.completeMerchantValidation(response);
                });
            };

        if (ApplePaySession) {
            console.log('==> '+JSON.stringify(ApplePaySession));
            if (ApplePaySession.canMakePayments) {
                showApplePayButton();
            }
        }
    }, [])

    function showApplePayButton() {
        HTMLCollection.prototype[Symbol.iterator] = Array.prototype[Symbol.iterator];
        const buttons = document.getElementsByClassName("apple-pay-button");
        for (let button of buttons) {
            button.className += " visible";
        }
    }

    return (
        <>
            <div class="apple-pay">
                <h2> Buy with Apple&nbsp;Pay </h2>
                <p>
                    Compatible browsers will display an Apple&nbsp;Pay button below.
                </p>
                <div class="apple-pay-button" onclick="applePayButtonClicked()"></div>
            </div>
        </>
    );
}