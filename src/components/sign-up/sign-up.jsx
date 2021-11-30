import React from "react"
import FormInput from "../form-input/form-input"
import CustomButton from "../custom-button/custom-button"
import './sign-up.scss'
import { auth, createUserProfileDocument } from '../../firebase/firebase.utils'


class SignUp extends React.Component {
  constructor(){
    super()

    this.state = {
      displayName: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  }

  

  handleSubmit = async event => {
    event.preventDefault()

    const {displayName, email, password, confirmPassword} = this.state

    if (password !== confirmPassword){
      alert("Passwords don't match")
      return
    }

    try {
      const { user } = await auth.createUserWithEmailAndPassword(email, password)
      
      await createUserProfileDocument(user, {displayName})

      this.setState({
        displayName: '',
        email: '',
        password: '',
        confirmPassword: ''
      })

    } catch (error) {
      console.log(error)
    }

  }

  handleChange = event => {
    const { value, name } = event.target

    this.setState({ [name]: value })
  }

  render() {
    const {displayName, email, password, confirmPassword} = this.state
    return(
      <div className="sign-up">
        <h2 className="title">I do not have an account</h2>
        <span>Sign Up with your email and password</span>
        <form className="sign-up-form" onSubmit={this.handleSubmit}>
          <FormInput
            type="text"
            name="displayName"
            handleChange={this.handleChange}
            value={displayName}
            label="Name"
            required
          />
          <FormInput
            type="email"
            name="email"
            handleChange={this.handleChange}
            value={email}
            label="Email"
            required
          />
          <FormInput
            type="password"
            name="password"
            handleChange={this.handleChange}
            value={password}
            label="Password"
            required
          />
          <FormInput
            type="password"
            name="confirmPassword"
            handleChange={this.handleChange}
            value={confirmPassword}
            label="Confirm Password"
            required
          />
          <CustomButton type="submit">Sign Up</CustomButton>
        </form>
        
      </div>
    )
  }
}

export default SignUp