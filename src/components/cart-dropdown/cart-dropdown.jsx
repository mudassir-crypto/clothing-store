import React from "react"
import { connect } from 'react-redux'
import { withRouter } from "react-router"
import CustomButton from "../custom-button/custom-button"
import CartItem from "../cart-item/cart-item"
import { selectCartItems } from '../../redux/cart/cart.selector'
import './cart-dropdown.scss'
import { toggleCartHidden } from "../../redux/cart/cart.action"


const CartDropdown = ({ cartItems, history, dispatch }) => (
  <div className="cart-dropdown">
    <div className="cart-items">
      {
        cartItems.length ? (
          cartItems.map(cartItem => (
            <CartItem key={cartItem.id} item={cartItem} />
          ))
        ) : (
          <span className="empty-message">Your Cart is empty</span>
        )
      }
    </div>

    <CustomButton onClick={() => {
      history.push('/checkout')
      dispatch(toggleCartHidden())
    }}>Go To Checkout</CustomButton>
  </div>
)

const mapStateToProps = state => ({
  // cartItems: state.cart.cartItems
  cartItems: selectCartItems(state)
})

export default withRouter(connect(mapStateToProps)(CartDropdown))