import React from 'react'
import Homepage from './pages/homepage/homepage'
import { Switch, Route, Redirect } from 'react-router-dom'
import Shop from './pages/shop/shop'
import Header from './components/header/header'
import SignInUp from './pages/sign-in-up/sign-in-up'
import Checkout from './pages/checkout/checkout'
import { auth, createUserProfileDocument } from './firebase/firebase.utils'
import { connect } from "react-redux"
import { setCurrentUser } from './redux/user/user.action'
import { selectCurrentUser } from './redux/user/user.selector'
import { createStructuredSelector } from 'reselect'
import './App.css'

class App extends React.Component {
  // constructor() {
  //   super()

  //   this.state = {
  //     currentUser: null
  //   }
  // }

  unsubscribeFromAuth = null

  componentDidMount(){
    const { setCurrentUser } = this.props

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      // this.setState({currentUser: user})
      if(userAuth){
        const userRef = await createUserProfileDocument(userAuth)

        userRef.onSnapshot(snapShot => {
          // this.setState({
          //   currentUser: {
          //     id: snapShot.id,
          //     ...snapShot.data()
          //   }
          // })
          // console.log(this.state)

          setCurrentUser({ //using the redux action
              currentUser: {
                id: snapShot.id,
                ...snapShot.data()
              }
            })
        })
      }

      setCurrentUser(userAuth)
    })
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth()
  }

  render() {
    return(
      <div>
      <Header />
      <Switch>
        <Route path='/' component={Homepage} exact/>
        <Route path='/shop' component={Shop} />
        {/* <Route path='/signin' component={SignInUp} /> */}
        <Route path='/signin' exact render={() => this.props.currentUser ? (<Redirect to='/' />) : (<SignInUp />)} />
        <Route path='/checkout' component={Checkout} exact />
      </Switch>
    </div>
    )   
  }
}

const mapStateToProps = createStructuredSelector({
  // currentUser: state.user.currentUser
  currentUser: selectCurrentUser
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
