import { performApplePayPayment, isApplePayJsAvailable } from './applePayJsHandler';
import { performApplePayPayment as performApplePayPaymentPaymentRequest, isPaymentRequestAvailable } from './applePayHandler';
import { paymentRequestApi } from './appleWorldPayConfig';

export { PaymentStatus } from '../../../../common/constant';

console.log(`Using ${paymentRequestApi ? "Payment Request": "Apple Pay JS"} API!`)

export const isApplePayAvailable = () =>  {
    return paymentRequestApi ? isPaymentRequestAvailable() : isApplePayJsAvailable()
}

export const performPayment = (currencyCode, items, label, amount) => {
    return paymentRequestApi ?
        performApplePayPaymentPaymentRequest(currencyCode, items, label, amount) : 
        performApplePayPayment(currencyCode, items, label, amount)
}