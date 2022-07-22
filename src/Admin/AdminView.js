import React, { Component } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import {Link} from "react-router-dom";
const url1 = "http://localhost:4000/movieList/";
export default class AdminView extends Component {
  state={
    movies:[],
    errormessage:""
};
fetchMovies = () => {
    axios.get(url1)
    .then((res)=>{
        this.setState({
            movies:res.data,
        });
    })
    .catch((err)=>{
        console.log("Error :",err);
    });
};
componentDidMount() {
    this.fetchMovies();
  }
  render() {
    return (
        <>
        <br/>
        <div className="card">
         
          <div className="card-header"><center>WELCOME ADMIN !!!!!!!!</center></div>
          <div className="row">
  <div className="col-sm-4">
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Add Movies</h5>
        <p className="card-text">In this you can add the Movie Poster and Movie Name along with the Cost of the Movie.</p>
        <center><Link to="/addmovies" style={{width:"370px"}} className="btn btn-primary">Add Movie</Link></center>
      </div>
    </div>
  </div>
  <div className="col-sm-4">
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Update Movie</h5>
        <p className="card-text">In this, if there is any Error in the Name of the Movie, the Movie Poster can be corrected.</p>
        <center><Link to="/update" style={{width:"370px"}} className="btn btn-success">Update Movie</Link></center>
      </div>
    </div>
  </div>

  <div className="col-sm-4">
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Delete Movie</h5>
        <p className="card-text">Which is not needed You can delete any Movie Poster and Name of the Movie.</p>
        <center><Link to="/deletebooking" style={{width:"370px"}} className="btn btn-danger">Delete Movie</Link></center>
      </div>
    </div>
  </div>
  <div className="col-sm-4">
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">View Users</h5>
        <p className="card-text">In this, if there is any Error in the Name of the Movie, the Movie Poster can be corrected.</p>
        <center><Link to="/viewusers" style={{width:"370px"}} className="btn bg-warning text-dark">View Users</Link></center>
      </div>
    </div>
  </div>
  <div className="col-sm-4">
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">View Ticket Booking</h5>
        <p className="card-text">In this, if there is any Error in the Name of the Movie, the Movie Poster can be corrected.</p>
        <center><Link to="/viewticket" style={{width:"370px"}} className="btn bg-primary text-white">View Ticket Booking</Link></center>
      </div>
    </div>
  </div>
  <div className="col-sm-4">
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Delete Users</h5>
        <p className="card-text">In this, if there is any Error in the Name of the Movie, the Movie Poster can be corrected.</p>
        <center><Link to="/deleteuser" style={{width:"370px"}} className="btn bg-info text-white">Delete Users</Link></center>
      </div>
    </div>
  </div>
</div>

        </div>

 
<br/>
<div className="card">
    <div className="card-header"><center>MOVIE LIST</center></div>
    
</div>
<div className="container p-3">
          <div className="row">
          
{this.state.movies.map((movie) => (
              <div className="col-md-3 col-sm-3 mb-1">
                <div className="card col">
                  <div className="card-header">
                    <h5 className='card-title'>{movie.movieName}</h5></div>
                  <div className="card-body">
                    <center><img src={movie.path} style={{"height" : "200px", "width" : "200px"}}/></center>
                    <br/>
                    <h5 className="card-title">
                      Movie Id : {movie.movieId}
                    </h5>
                    <p className="card-text">Cost : Rs. {movie.cost}</p>
                    <a href={movie.movieLink}><button className="btn btn-primary" style={{"width" : "220px"}}>
                    Movie Trailer
                    </button></a>
                    {/**/}
                  </div>
                </div>
              </div>
            ))}
            </div>
            </div>
      </>
    )
  }
}
