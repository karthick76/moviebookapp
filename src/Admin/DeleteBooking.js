import React, { Component } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';
const url1 = "http://localhost:4000/movieList/";
export default class DeleteBooking extends Component {
    constructor(props) {
        super(props);
        this.state = {
          moviesData: [],
          movieId:"",
          errorMessage: "",
          successMessage: "",
        };
      }
    
      componentDidMount() {
        this.fetchMovies();
      }
    
      fetchMovies = () => {
        axios
          .get(url1)
          .then((response) => {
            const data = response.data;
            const newState = {
              moviesData: data,
              errorMessage: "",
            };
            this.setState(newState);
          })
          .catch((error) => {
            if (error.response.status == 404) {
              this.setState({
                errorMessage: "Could not fetch booking data!",
                successMessage: "",
              });
            }
          });
        /* 
          Send an AXIOS GET request to the url http://localhost:1050/bookings/ to fetch all the bookings 
          and handle the success and error cases appropriately.Set the isLoading to false once the request is complete
        */
      };
    
      deleteMovies = (id) => {
        axios
          .delete(url1 + id)
          .then((res) => {
            this.fetchMovies();
            this.setState({
              successMessage: "Booking deleted successfully!!",
            });
            setTimeout(()=>this.props.history.push("/adminview"), 2500);
          })
          .catch((error) => {
              this.setState({
                errorMessage: "Booking deletion failed!",
                successMessage: "",
              });
            
          });
        /*
          Send an AXIOS DELETE request to the url http://localhost:1050/bookings/:id where id represents the booking
          id for the selected booking which we want to delete
          and handle the success and error cases appropriately 
        */
      };
  render() {
    const { moviesData } = this.state;
    const rows = moviesData.map((movie) => (
      <tr key={movie.id}>
        <td>{movie.movieId}</td>
        <td>{movie.movieName}</td>
        <td>{movie.cost}</td>
        <td>
          <button 
            type="submit"
            onClick={()=>this.deleteMovies(movie.id)}
            className="btn btn-danger"
          >
            Delete
          </button>
        </td>
      </tr>
    ));
    return (
        <div className="GetBooking">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <br />
            <div className="card">
              <div className="card-header bg-custom">
                <h3 align="center">
                  
                </h3>
              </div>
                <div className="card-body">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>Movie Id</th>
                        <th>Movie Name</th>
                        <th>Movie cost</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>{rows}</tbody>
                  </table>.
                  <div align="center">
                    <span
                      name="successMessage"
                      id="successMessage"
                      className="text text-success"
                    >
                      {this.state.successMessage}
                    </span>
                    <span
                      name="errorMessage"
                      id="errorMessage"
                      className="text text-danger"
                    >
                      {this.state.errorMessage}
                    </span>
                  </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
