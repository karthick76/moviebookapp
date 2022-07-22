import React, { Component } from 'react'
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import { toHaveTextContent } from '@testing-library/jest-dom/dist/matchers';
const url4="http://localhost:4000/movieList"
const url3="http://localhost:4000/bookingTickets";
export default class TicketBooking extends Component {
    constructor(props) {
        super(props);
        this.state = {
          form: {
            movieId: this.props.match.params.movieId,
            movieName:this.props.match.params.movieName,
            fname:"",
            address:"",
            mobile:"",
            show:"",
            noOfTicket:"",
          },
          formErrorMessage: {
            fname:"",
            address:"",
            mobile:"",
            show:"",
            noOfTicket:"",
          },
          formValid: {
            fname:false,
            address:false,
            mobile:false,
            show:false,
            noOfTicket:false,
          },
          movieList: [],
          errorMessage: "",
          successMessage: "",
        };
      }
      submitBooking = (event) => {
        const myMovie = this.state.movieList.find((movie) => 
        movie.movieId == this.state.form.movieId);
        const bookingCost = myMovie.cost * this.state.form.noOfTicket;
        const newForm = {
            ...this.state.form,
            bookingCost: bookingCost,
          };
        axios
        .post(url3,newForm)
        .then((res)=>{
            this.setState({
              successMessage: "Ticket Booked successfully!!",
              errorMessage: "",
            });
            setTimeout(()=>this.props.history.push("/success"), 2500); 
        })
        .catch((error) => {
          if (error.response == undefined) {
            this.setState({
              errorMessage: "Please start your JSON Server",
              successMessage: "",
            });
          } else if (error.response.status == 404) {
            this.setState({
              errorMessage: "Ticket Booking Failed!",
              successMessage: "",
            });
          }
        });
    };
    fetchMovies = () => {
      axios
        .get(url4)
        .then((response) => {
          const data = response.data;
          const newState = {
            movieList: data,
            errorMessage: "",
          };
          this.setState(newState);
        })
        .catch((error) => {
          if (error.response == undefined) {
            this.setState({ errorMessage: "Start your JSON server" });
          } else if (error.response.status === 404) {
            this.setState({
              errorMessage: "Could not fetch flights data",
              movieList: [],
            });
          }
        });
     
    };
    componentDidMount() {
      this.fetchMovies();
    }
    handleSubmit = (event) => {
        event.preventDefault();
        this.submitBooking();
        
      };
    
      handleChange = (event) => {
           const name = event.target.name;
            const value = event.target.value;
            const newState={
                form: {
                  ...this.state.form,
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
                case "address":
                if (value === "") {
                  formErrorMessage.address = "Please enter a Address";
                  formValid.address = false;
                }
                else if(!value.match(/[A-Za-z0-9'\.\-\s\,]/)){
                  formErrorMessage.address= "Please enter a Only Alphabets";
                  formValid.address = false;
                } 
                  else {
                  formErrorMessage.address = "";
                  formValid.address= true;
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
                
                case "show":
                  if (value === "") {
                    formErrorMessage.show= "Please enter a Movie Name";
                    formValid.show = false;
                  } else {
                    formErrorMessage.show = "";
                    formValid.show= true;
                  }
                  break;
                    case "noOfTicket":
                    if (value === "") {
                      formErrorMessage.noOfTicket = "Please Enter Tickets";
                      formValid.noOfTicket= false;
                    }
                      else {
                      formErrorMessage.noOfTicket = "";
                      formValid.noOfTicket= true;
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
                  <h3>TICKET BOOKING</h3>
                </div>
                <div className="card-body">
                  
                    <div class="form-group">
                    
                    <label className="font-weight-bold">Movie ID:</label>
                    <input type="text" className="form-control" 
                    value={this.state.form.movieId}
                    name="movieId" placeholder="e.g.- M1001" disabled></input>
                    <p className="text-danger"></p>
                   <label className="font-weight-bold">Movie Name:</label>
                    <input type="text" className="form-control" onChange={this.handleChange}
                    value={this.state.form.movieName}
                    name="movieName" disabled></input>
                    <p className="text-danger">{this.state.formErrorMessage.movieName}</p>
                    <label className="font-weight-bold">Name:</label>
                    <input type="text" className="form-control" onChange={this.handleChange}
                    value={this.state.form.fname}
                    name="fname" ></input>
                    <p className="text-danger">{this.state.formErrorMessage.fname}</p>

                    <label className="font-weight-bold">Address:</label>
                    <textarea type="text" className="form-control" onChange={this.handleChange}
                    value={this.state.form.address}
                    name="address"></textarea>
                    <p className="text-danger">{this.state.formErrorMessage.address}</p>
                    
                    <label className="font-weight-bold">Phone Number:</label>
                    <input type="number" className="form-control" onChange={this.handleChange}
                    value={this.state.form.mobile}
                    name="mobile"></input>
                    <p className="text-danger">{this.state.formErrorMessage.mobile}</p>

                    <label htmlFor="options" className="font-weight-bold">Show Time:</label>
                  <select  className="form-control" id="options" value={this.state.form.value} onChange={this.handleChange} name="show">
                  <option value=" " onChange={this.handleChange}>------Select Show Time------</option>
                    <option value="10:00AM">10:00 AM</option>
                    <option value="12:45PM">12:45 PM</option>
                    <option value="03:30PM">3:30PM</option>
                    <option value="06:00PM">6:00PM</option>
                    <option value="10:00PM">10:00PM</option>
                    </select>
                    <p className="text-danger">{this.state.formErrorMessage.show}</p>
                   <label className="font-weight-bold">No of Tickets:</label>
                    <input type="number" className="form-control" 
                    name="noOfTicket" onChange={this.handleChange} value={this.state.form.noOfTicket}></input>
                    <p className="text-danger">{this.state.formErrorMessage.noOfTicket}</p>
                     </div>  
                     <button type="submit" 
                  disabled={
                    !(this.state.formValid.fname && this.state.formValid.address&& this.state.formValid.mobile && this.state.formValid.noOfTicket)
                  } className="btn btn-primary" >Book Ticket</button>
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
