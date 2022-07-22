import React, { Component } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import {Link} from "react-router-dom";
const url1 = "http://localhost:4000/movieList/";
export default class UserView extends Component {
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
    const datax=JSON.parse(localStorage.getItem('user'))
    return (
        <>
        <br/>
        <div className="card">
         
          <div className="card-header"><center>Welcome {datax.fname}  !!!!!!!!</center></div>
          <div className="row">
          <center>
  <img className="card-img" src="https://cdn4.vectorstock.com/i/1000x1000/87/48/movie-timenow-showing-banner-sign-theater-sign-vector-22508748.jpg"
  style={{"height" : "400px", "width" : "100%"}} />
  </center>

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
                    <button className="btn btn-success"  onClick={() =>this.props.history.push(`ticketbooking/${movie.movieId}/${movie.movieName}`)} style={{"width" : "220px"}}>
                    Book Tickets
                    </button>
                    <br/>
                    <br/>
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
