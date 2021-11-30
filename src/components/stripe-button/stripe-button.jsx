import React from "react"
import StripeCheckout from 'react-stripe-checkout'

const StripeCheckoutButton = ({ price }) => { 
  const priceForStrip = price * 100
  const publishableKey = 'pk_test_51K1ZCzSIik4r75o9nr9CRfJuWcXQsQv4ZEYTTEb2IbmmtWOD4v8cFYHrF1R7baNxa3IXMwGObNH5YolvR3G8wSYD00Fel8LwaP'

  const onToken = token => {
    console.log(token)
    alert('Payment Successful')
  }
  return (
    <StripeCheckout
      label = 'Pay Now'
      name = 'CRWN Clothing Ltd.'
      image ='https://svgshare.com/i/CUz.svg'
      billingAddress
      shippingAddress
      description = {`Your Total Price is $${price}`}
      amount = {priceForStrip}
      panelLabel = 'Give Money'
      token={onToken}
      stripeKey={publishableKey}
    />
  )
}

export default StripeCheckoutButton