import React, { Component } from "react";
import { Link } from "react-router-dom";
import { needAuth } from "../lib/Auth-provider";


  function validate (email, password) {
      
        const errors = [];
      
        if (email.length < 5) {
          errors.push("Email should be at least 5 charcters long");
        }
        if (email.split("").filter(chars => chars === "@").length !== 1) {
          errors.push("Email should contain a @");
        }
        if (email.indexOf(".") === -1) {
          errors.push("Email should contain at least one dot");
        }
      
        if (password.length < 6) {
          errors.push("Password should be at least 6 characters long");
        }
        
        if(password !== confirmPasword) {
            
        }
        return errors;
      }

      
      class Signup extends React.Component {
          constructor(){
          super()
            this.state = { email: "", password: "", confirmPassword:'', errors:[] };
          }
          handleFormSubmit = (event) => {
              event.preventDefault();
              const { email, password, confirmPassword } = this.state;
              this.props.signup({ email, password, confirmPassword });

              const errors = validate(email, password);
               if (errors.length > 0) {
                 this.setState({ errors });
                 return;
               }
            }
            
            handleChange = (event) => {
                const { name, value } = event.target;
                this.setState({ [name]: value });
            };
  


  render() {
    const {errors} = this.state;
    const { email, password, confirmPassword } = this.state;
    return (
      <div>
        <h1>Sign Up</h1>

        <form onSubmit={this.handleFormSubmit}>
        {errors.map(error => (
          <p key={error}>Error: {error}</p>
        ))}
          <label>email:</label>
          <input
            type='text'
            name='email'
            value={email}
            onChange={this.handleChange}
          />

          <label>Password:</label>
          <input
            type='password'
            name='password'
            value={password}
            onChange={this.handleChange}
          />
    
    <label> Confirm Password:</label>
          <input
            type='password'
            name='confirmPassword'
            value={confirmPassword}
            onChange={this.handleChange}
          />
    


          <input type='submit' value='Signup' />
        </form>

        <p>Already have account?</p>
        <Link to={"/login"}> Login</Link>
      </div>
    );
  }
}

export default needAuth(Signup);
