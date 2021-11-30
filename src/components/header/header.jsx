import React from "react"
import { Link } from 'react-router-dom'
import { connect } from "react-redux"
import { auth } from "../../firebase/firebase.utils"
import CartIcon from "../cart-icon/cart-icon"
import CartDropdown from "../cart-dropdown/cart-dropdown"
import { selectCurrentUser } from "../../redux/user/user.selector"
import { ReactComponent as Logo } from '../../assets/crown.svg'
import './header.scss'
import { selectCartHidden } from "../../redux/cart/cart.selector"
import { createStructuredSelector } from "reselect"

const Header = ({ currentUser, hidden }) => (
  <div className="header">
    <Link to='/' className="logo-container">
      <Logo className="logo" />
    </Link>

    <div className="options">
      <Link to='/shop' className="option">
        SHOP
      </Link>

      <Link to='/contact' className="option">
        CONTACT
      </Link>

      {
        currentUser ? (
        <div className="option" onClick={() => auth.signOut()}>Sign Out</div>
        ) : (
        <Link to='/signin' className="option">
          Sign In
        </Link>
        )
      }
      <CartIcon />
    </div>
    {
      hidden ? null : (<CartDropdown />)
    }
  </div>
)

// const mapStateToProps = state => ({ //this state is a root reducer
//   // currentUser: state.user.currentUser,
//   // hidden: state.cart.hidden
//   currentUser: selectCurrentUser(state),
//   hidden: selectCartHidden(state)
// })

const mapStateToProps = createStructuredSelector({ //this state is a root reducer
  currentUser: selectCurrentUser,
  hidden: selectCartHidden
})

export default connect(mapStateToProps)(Header)