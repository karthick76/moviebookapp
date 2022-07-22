import React, { Component } from 'react'
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
const url = "http://localhost:4000/movieList/";
export default class AddMovies extends Component {
    constructor(props) {
        super(props);
        this.state = {
          form: {
            movieId: "",
            movieName:"",
            cost:"",
            path:"",
            movieLink:"",
          },
          formErrorMessage: {
            movieId: "",
            movieName:"",
            cost:"",
            path:"",
            movieLink:"",
          },
          formValid: {
            movieId: false,
            movieName: false,
            cost:false,
            path:false,
            movieLink:false,
          },
          movieList: [],
          errorMessage: "",
          successMessage: "",
        };
      }
      submitBooking = (event) => {
        const newForm = {
            ...this.state.form,
          };
        axios
        .post(url,newForm)
        .then((res)=>{
            this.setState({
              successMessage: "Booking created successfully!!",
              errorMessage: "",
            });
            setTimeout(()=>this.props.history.push("/adminview"), 2500); 
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
              
              case "movieId":
                if (value === "") {
                  formErrorMessage.movieId = "Please enter a Movie Id";
                  formValid.movieId = false;
                }
                  else if(!value.match(/^[A-Z]{1}[0-9]{4}$/)){
                    formErrorMessage.movieId="It Should start with a captial letter and followed by a 4 digit";
                    formValid.movieId=false;
                  }
                 else {
                  formErrorMessage.movieId = "";
                  formValid.movieId = true;
                }
                break;
    
                case "movieName":
                if (value === "") {
                  formErrorMessage.movieName = "Please enter a Movie Name";
                  formValid.movieName = false;
                } else {
                  formErrorMessage.movieName = "";
                  formValid.movieName= true;
                }
                break;

                case "cost":
                    if (value === "") {
                      formErrorMessage.cost = "Please enter a Movie Cost";
                      formValid.cost = false;
                    }
                    else if(!value.match(/^[0-9]*$/)){
                        formErrorMessage.cost="Please Enter Only Numbers";
                        formValid.cost=false;
                      } 
                      else {
                      formErrorMessage.cost = "";
                      formValid.cost= true;
                    }
                    break;

                    case "path":
                    if (value === "") {
                      formErrorMessage.path = "Please enter a Movie Image Address";
                      formValid.path = false;
                    }
                    else if(!value.match(/([a-z\-_0-9\/\:\.]*\.(jpg|jpeg|png|gif))/i)){
                        formErrorMessage.path="Please Enter Only Vaild Image Address";
                        formValid.path=false;
                      } 
                      else {
                      formErrorMessage.path = "";
                      formValid.path= true;
                    }
                    break;
                    case "movieLink":
                      if (value === "") {
                        formErrorMessage.movieLink= "Please enter a Trailer Link";
                        formValid.movieLink = false;
                      } 
                     
                      else if(!value.match(/http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-\_]*)(&(amp;)?‌​[\w\?‌​=]*)?/)){
                        formErrorMessage.movieLink="Please Enter Only Vaild Link";
                        formValid.movieLink=false;
                      }
                      else {
                        formErrorMessage.movieLink = "";
                        formValid.movieLink= true;
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
                  <h3>ADD MOVIES</h3>
                </div>
                <div className="card-body">
                  { 
                    <div class="form-group">
                    
                    <label className="font-weight-bold">Movie ID:</label>
                    <input type="text" className="form-control" 
                    value={this.state.form.movieId}
                    name="movieId" placeholder="e.g.- M1001" onChange={this.handleChange}></input>
                    <p className="text-danger">{this.state.formErrorMessage.movieId}</p>
                   
                     <label className="font-weight-bold">Movie Name:</label>
                     <input type="text" className="form-control" value={this.state.form.movieName} 
                     name="movieName" 
                     onChange={this.handleChange}></input>
                    <p className="text-danger">{this.state.formErrorMessage.movieName}</p>
                    
                    <label className="font-weight-bold">Movie Cost:</label>
                     <input type="number" className="form-control" value={this.state.form.cost} 
                     name="cost" 
                     onChange={this.handleChange}></input>
                    <p className="text-danger">{this.state.formErrorMessage.cost}</p>

                    <label className="font-weight-bold">Movie Image Address:</label>
                     <input type="text" className="form-control" value={this.state.form.path} 
                     name="path" 
                     onChange={this.handleChange}></input>
                    <p className="text-danger">{this.state.formErrorMessage.path}</p>

                    <label className="font-weight-bold">Movie Trailer Link:</label>
                     <input type="text" className="form-control" value={this.state.form.movieLink} 
                     name="movieLink" 
                     onChange={this.handleChange}></input>
                    <p className="text-danger">{this.state.formErrorMessage.movieLink}</p>
                    <br/>
                     </div>  
                  }
                  <button type="submit" 
                  disabled={
                    !(this.state.formValid.movieId && this.state.formValid.movieName)
                  } className="btn btn-primary" >Add Movie</button>
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
