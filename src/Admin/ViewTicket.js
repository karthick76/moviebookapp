import React, { Component } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';
import { Link } from 'react-router-dom';
const url5 = "http://localhost:4000/bookingTickets";
export default class ViewTicket extends Component {
    constructor(props){
        super(props);
    this.state={
        bookingTickets:[],
        errormessage:"",
        searchTerm: ""
    };
    this.handleChange = this.handleChange.bind(this);
}
    handleChange(event) {
        this.setState({
          [event.target.name]: event.target.value 
        })
      }
    fetchMovies = () => {
        axios.get(url5)
        .then((res)=>{
            this.setState({
                bookingTickets:res.data,
            });
        })
        .catch((err)=>{
            console.log("Error :",err);
        });
    };
    searchuser=()=>{
        axios.get(`http://localhost:4000/viewTicket/?movieId=${this.state.setRecord.record}`)
        .then(response=>{
            this.setState({
                setRecord:response.data,
            })
        });
    }
    componentDidMount() {
        this.fetchMovies();
      }
    render() {
    
        const { bookingTickets, searchTerm } = this.state;
        const rows =  bookingTickets
            .filter((bookingTickets) =>
              bookingTickets.movieId.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((book, key) => {
              return (
                <tr key={key}>
                <td><center>{book.id}</center></td>
                  <td>{book.movieId}</td>
                  <td>{book.movieName}</td>
                  <td>{book.fname}</td>
                  <td><center>{book.mobile}</center></td>
                  <td><center>{book.show}</center></td>
                  <td><center>{book.noOfTicket}</center></td>
                  <td><center>{book.bookingCost}</center></td>
                </tr>
              );
            })
        return (
         <>
      <br/>
      <form class="form-inline d-flex justify-content-center md-form form-sm mt-0">
    <input style={{width:"500px"}} type="text" className="form-control" value={searchTerm} name="searchTerm" onChange={this.handleChange} placeholder="Type here to Search Movie ID"/>
    <button type="button" onClick={this.searchuser} className="btn btn-primary">Search</button>
    </form>
                    <div className="container mb-5 mt-3">
                      <table className="table table-dark table-striped table-bordered" style={{width:"100%"}} >
                        <thead>
                          <tr>
                            <th><center>ID</center></th>
                            <th>Movie ID</th>
                            <th>Movie Name</th>
                            <th>Name</th>
                            <th><center>Mobile Number</center></th>
                            <th><center>Show Time</center></th>
                            <th><center>No of Tickets</center></th>
                            <th><center>Total Cost</center></th>
                          </tr>
                        </thead>
                        <tbody>{rows}</tbody>
                       
                      </table>
                     <Link to="/adminview"> <button 
                type="submit" style={{width:"250px"}}
                className="btn btn-warning text-light"
              >
                Go Back
              </button></Link>
                    </div>
         </>
        )
  }
}
