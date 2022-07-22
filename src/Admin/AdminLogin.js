import React, { Component } from 'react'
import axios from "axios";
import { Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";

export default class AdminLogin extends Component {
    state={
        formdata1:{
            email1:"",
            password1: "",
        },
        formError1:{
            emailErr1: "",
            passErr1: "",
        },
        eTrue:false,
        ePass:false,
        successMessage1: "",
        errMessage1: "",
    };
    handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            formdata1: {
              ...this.state.formdata1,
                [name]: value
            }
        })
        this.validateField(name, value);
      };
      booking
      validateField = (name, value) => {
        if (name === "email1") {
          let emailRegx =
            /^([a-z][a-zA-Z0-9_]*(\.[a-zA-Z][a-zA-Z0-9_]*)?@[a-z][a-zA-Z-0-9]*\.[a-z]+(\.[a-z]+)?)|[7-9][0-9]{9}$/;
          if (!value.match(emailRegx)) {
            this.setState({
                formError1:{
                  ...this.state.formError1,
                    emailErr1:'Enter a valid Email, Eg:"abc@gmail.com"'
                }
            })
          } 
          else if(value==="admin@gmail.com"){
            console.log("true");
            this.setState({
                eTrue:true,
            })
          }
          else {
            this.setState({
                formError1:{
                  ...this.state.formError1,
                    emailErr1:''
                }
            })          }
        } else if (name === "password1") {
          let passRegx = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{7,20}$/;
          if (!value.match(passRegx)) {
            this.setState({
                formError1:{
                  ...this.state.formError1,
                    passErr1:"Password should contain atleast one speacial char,numbers,capital and small letter!"
                }
            })
          }  else if(value==="Admin@123"){
            console.log("true");
            this.setState({
                ePass:true,
                
            })
          }
          else {
            this.setState({
                formError1:{
                  ...this.state.formError1,
                    passErr1:""
                }
            })
          }
        }
      };
      handleSubmit = (e) => {
        e.preventDefault();
        setTimeout(()=>this.props.history.push("/adminview"), 2500); 
      };
  render() {
    return (
        <form className="container" >
        <div className="CreateBooking">
          <div className="row">
            <div className="col-md-6 offset-md-3">
              <br />
              <div className="card">
                <div className="card-header bg-custom">
                  <h3>ADMIN LOGIN</h3>
                </div>
                <div className="card-body">
                  { 
                    <div class="form-group">
                    
                    
                    <label className="font-weight-bold">Email Id:</label>
                     <input type="email" className="form-control" 
                      value={this.state.formdata1.email1}
                      
                      name="email1" onChange={this.handleChange}
                     ></input>
                    <p className='text-danger'>{this.state.formError1.emailErr1}</p>
  
                    <label className="font-weight-bold">Password:</label>
                     <input type="password" className="form-control" 
                     value={this.state.formdata1.password1}
                     name="password1"
                   onChange={this.handleChange}
                     ></input>
                      <p className='text-danger'>{this.state.formError1.passErr1}</p>
                     </div>  
                  }
                  <br/>
                  
                  <center><button type="submit" onClick={this.handleSubmit} className="btn btn-primary" style={{width:"500px"}} 
                 disabled={!(this.state.eTrue===true && this.state.formError1.emailErr1 === "" && this.state.formError1.passErr1 === ""&&this.state.ePass===true)}
                  >Login</button></center>
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
