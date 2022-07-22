import React, { Component } from 'react'
import axios from "axios";
import { Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import { authenticate } from "../services/login.service";
export default class Login extends Component {
  state={
    formdata:{
        email:"",
        password: "",
    },
    formError:{
        emailErr: "",
        passErr: "",
    },
    
    successMessage: "",
    errMessage: "",
    showPassword: false,
    
}

handleChange = (e) => {
  const name = e.target.name;
  const value = e.target.value;
  this.setState({
      formdata: {
        ...this.state.formdata,
          [name]: value
      }
  })
  this.validateField(name, value);
};
        
    validateField = (name, value) => {
      if (name === "email") {
        let emailRegx =
          /^([a-z][a-zA-Z0-9_]*(\.[a-zA-Z][a-zA-Z0-9_]*)?@[a-z][a-zA-Z-0-9]*\.[a-z]+(\.[a-z]+)?)|[7-9][0-9]{9}$/;
        if (!value.match(emailRegx)) {
          this.setState({
              formError:{
                ...this.state.formError,
                  emailErr:'Enter a valid Email, Eg:"abc@gmail.com"'
              }
          })
        } else {
          this.setState({
              formError:{
                ...this.state.formError,
                  emailErr:''
              }
          })          }
      } else if (name === "password") {
        let passRegx = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{7,20}$/;
        if (!value.match(passRegx)) {
          this.setState({
              formError:{
                ...this.state.formError,
                  passErr:"Password should contain atleast one speacial char,numbers,capital and small letter!"
              }
          })
        } else {
          this.setState({
              formError:{
                ...this.state.formError,
                  passErr:""
              }
          })
        }
      }
    };
    
    formSubmit = async (formObj) => {
      try {
        const isAuthenticated = await authenticate(
          formObj.email,
          formObj.password
        );
        if (isAuthenticated) {
    
          this.setState({
              successMessage:"Login Successfull",
              errMessage:''
          });
          
          setTimeout(()=>this.props.history.push("/userview"), 2500); 
          
        }
        else {
          this.setState({
              errMessage:"Invalid username or password!",
            successMessage:""
          }
          );
        }
      } catch (error) {
          this.setState({
              errMessage:error.message,
              successMessage:""
          }
          );
      }
    };
  
    handleSubmit = (e) => {
      e.preventDefault();
      let formObj={
          email:this.state.formdata.email,
          password:this.state.formdata.password
      }
      this.formSubmit(formObj);
      
    };
  render() {
    return (
      <form className="container"  onSubmit={this.handleSubmit} >
      <div className="CreateBooking">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <br />
            <div className="card">
              <div className="card-header bg-custom">
                <h3>LOGIN</h3>
              </div>
              <div className="card-body">
                { 
                  <div class="form-group">
                  
                  
                  <label className="font-weight-bold">Email Id:</label>
                   <input type="email" className="form-control" 
                    value={this.state.formdata.email}
                    
                    name="email" onChange={this.handleChange}
                   ></input>
                  <p className='text-danger'>{this.state.formError.emailErr}</p>

                  <label className="font-weight-bold">Password:</label>
                   <input type="password" className="form-control" 
                   value={this.state.formdata.password}
                   name="password"
                 onChange={this.handleChange}
                   ></input>
                    <p className='text-danger'>{this.state.formError.passErr}</p>
                   </div>  
                }
                <br/>
                <center><button type="submit" className="btn btn-primary" style={{width:"500px"}} 
               disabled={!(this.state.formError.emailErr === "" && this.state.formError.passErr === "")}
                >Login</button></center>
               <Link to="/register" className="btn btn-link">Register</Link>
               <div align="center">
                    {
                       <p className="text-success">{this.state.successMessage}</p>
                    }
                    </div>
                  <div align="center">
                    {
                       <p className="text-danger">{this.state.errMessage}</p>
                    }
                    
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </form>
    )
  }
}
