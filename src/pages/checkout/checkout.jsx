import React from "react"
import { connect } from "react-redux"
import { createStructuredSelector } from "reselect"
import CheckoutItem from "../../components/checkout-item/checkout-item"
import StripeCheckoutButton from "../../components/stripe-button/stripe-button"
import { selectCartItems, selectCartItemsTotal } from "../../redux/cart/cart.selector"
import './checkout.scss'

const Checkout = ({ cartItems, total }) => (
  <div className="checkout-page">
    <div className="checkout-header">
      <div className="header-block">
        <span>Product</span>
      </div>
      <div className="header-block">
        <span>Name</span>
      </div>
      <div className="header-block">
        <span>Quantity</span>
      </div>
      <div className="header-block">
        <span>Price</span>
      </div>
      <div className="header-block">
        <span>Remove</span>
      </div>
    </div>

    {
      cartItems.map(item => (
        <CheckoutItem key={item.id} cartItem={item}/>
      ))
    }

    <div className="total">
      Total: ${total}
    </div>
    <StripeCheckoutButton price={total} />
  </div>
)

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
  total: selectCartItemsTotal
})

export default connect(mapStateToProps)(Checkout)