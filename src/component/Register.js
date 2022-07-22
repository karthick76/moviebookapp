import React, { Component } from 'react'
import axios from "axios";
import { Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
const url1="http://localhost:4000/register/"
export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        fname:"",
        email:"",
        district:"",
        mobile:"",
        uname:"",
        password:"",
      },
      formErrorMessage: {
        fname:"",
        email:"",
        district:"",
        mobile:"",
        uname:"",
        password:"",
      },
      formValid: {
        fname:false,
        email:false,
        district:false,
        mobile:false,
        uname:false,
        password:false,
      },
      register: [],
      errorMessage: "",
      successMessage: "",
    };
  }
  SubmitRegister = (event) => {
    const newForm = {
        ...this.state.formData,
      };
    axios
    .post(url1,newForm)
    .then((res)=>{
        this.setState({
          successMessage: "Registered created successfully!!",
          errorMessage: "",
        });
        setTimeout(()=>this.props.history.push("/login"), 1500);
    })
    .catch((error) => {
      if (error.response == undefined) {
        this.setState({
          errorMessage: "Please start your JSON Server",
          successMessage: "",
        });
      } else if (error.response.status == 404) {
        this.setState({
          errorMessage: "Booking Failed!",
          successMessage: "",
        });
      }
    });
};
  handleSubmit = (event) => {
    event.preventDefault();
    this.SubmitRegister();
  };

  handleChange = (event) => {
       const name = event.target.name;
        const value = event.target.value;
        const newState={
            formData: {
              ...this.state.formData,
              [name]: value,
            },
          };
          this.setState(newState);
          this.validateField(name, value)
  };
  validateField = (fieldName, value) => {
    const { formErrorMessage, formValid } = this.state;
        switch (fieldName) {
          
          case "fname":
            if (value === "") {
              formErrorMessage.fname = "Please enter a Name";
              formValid.fname = false;
            }
            else if(!value.match(/^[A-Za-z]+$/)){
              formErrorMessage.fname = "Please enter a Only Alphabets";
              formValid.fname = false;
            } 
             else {
              formErrorMessage.fname = "";
              formValid.fname = true;
            }
            break;

            case "email":
            if (value === "") {
              formErrorMessage.email = "Please enter a Email ID";
              formValid.email = false;
            }
            else if(!value.match(/^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/)){
              formErrorMessage.email="Please Enter Vaild Mail Id";
              formValid.email=false;
            } 
            else {
              formErrorMessage.email = "";
              formValid.email= true;
            }
            break;

            case "district":
                if (value === "") {
                  formErrorMessage.district = "Please enter a District";
                  formValid.district = false;
                }
                else if(!value.match(/^[A-Za-z]+$/)){
                  formErrorMessage.district = "Please enter a Only Alphabets";
                  formValid.district = false;
                } 
                  else {
                  formErrorMessage.district = "";
                  formValid.district= true;
                }
                break;
                case "mobile":
                  if (value === "") {
                    formErrorMessage.mobile = "Please enter a Mobile Number";
                    formValid.mobile = false;
                  }
                  else if(!value.match(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/)){
                    formErrorMessage.mobile="Please Enter Only Mobile Number";
                    formValid.mobile=false;
                  }
                    else {
                    formErrorMessage.mobile = "";
                    formValid.mobile= true;
                  }
                  break;
                case "uname":
                if (value === "") {
                  formErrorMessage.uname = "Please enter a Username";
                  formValid.uname = false;
                }
                else if(!value.match(/^[a-zA-Z0-9]+([a-zA-Z0-9](_|-| )[a-zA-Z0-9])*[a-zA-Z0-9]+$/)){
                    formErrorMessage.uname="Please Enter Only Username";
                    formValid.uname=false;
                  } 
                  else {
                  formErrorMessage.uname = "";
                  formValid.uname= true;
                }
                break;
                case "password":
                if (value === "") {
                  formErrorMessage.password = "Please enter a Password";
                  formValid.password = false;
                }
                else if(!value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/)){
                    formErrorMessage.password="Please Enter Only Password";
                    formValid.password=false;
                  } 
                  else {
                  formErrorMessage.password = "";
                  formValid.password= true;
                }
                break;
          default:
            break;
        }
  };
  render() {
    return (
        <form className="container" onSubmit={this.handleSubmit}>
        <div className="CreateBooking">
          <div className="row">
            <div className="col-md-6 offset-md-3">
              <br />
              <div className="card">
                <div className="card-header bg-custom">
                  <h3>REGISTRATION</h3>
                </div>
                <div className="card-body">
                  { 
                    <div class="form-group">
                    
                    <label className="font-weight-bold">Name:</label>
                    <input type="text" className="form-control" 
                    value={this.state.formData.fname}
                    name="fname" onChange={this.handleChange} ></input>
                  <p className="text-danger">{this.state.formErrorMessage.fname}</p>
               
                     <label className="font-weight-bold">E-Mail Id:</label>
                     <input type="email" className="form-control" 
                     value={this.state.formData.email}
                     name="email" onChange={this.handleChange}
                     ></input>
                    <p className="text-danger">{this.state.formErrorMessage.email}</p>
                   
                    <label className="font-weight-bold">District:</label>
                     <input type="text" className="form-control" 
                     value={this.state.formData.district}
                     name="district" onChange={this.handleChange}
                     ></input>
                    <p className="text-danger">{this.state.formErrorMessage.district}</p>
                    
                    <label className="font-weight-bold">Mobile:</label>
                     <input type="mobile" className="form-control" 
                     value={this.state.formData.mobile}
                     name="mobile" onChange={this.handleChange}
                     ></input>
                    <p className="text-danger">{this.state.formErrorMessage.mobile}</p>

                    <label className="font-weight-bold">Username:</label>
                     <input type="text" className="form-control" 
                     value={this.state.formData.uname}
                     name="uname" onChange={this.handleChange}
                     ></input>
                    <p className="text-danger">{this.state.formErrorMessage.uname}</p>

                    <label className="font-weight-bold">Password:</label>
                     <input type="password" className="form-control" 
                     value={this.state.formData.password}
                     name="password" onChange={this.handleChange}
                     ></input>
                     <p className="text-danger">{this.state.formErrorMessage.password}</p>
                     </div>  
                  }
                  <center><button type="submit" style={{width:"500px"}}
                  disabled={
                    !(this.state.formValid.uname && this.state.formValid.password)
                  } className="btn btn-primary" >Register</button></center>
                 <Link to="/login" className="btn btn-link">Login</Link>
                 <div align="center">
                    {
                       <p className="text-success">{this.state.successMessage}</p>
                    }
                    </div>
                  <div align="center">
                    {
                       <p className="text-danger">{this.state.ErrorMessage}</p>
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
