import React, { Component } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';
import { Link } from 'react-router-dom';
const url2 = "http://localhost:4000/register/";

export default class ViewUsers extends Component {
    constructor(props){
        super(props);
    this.state={
        register:[],
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
        axios.get(url2)
        .then((res)=>{
            this.setState({
                register:res.data,
            });
        })
        .catch((err)=>{
            console.log("Error :",err);
        });
    };
    searchuser=()=>{
        axios.get(`http://localhost:4000/register/?fname=${this.state.setRecord.record}`)
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
    const { register, searchTerm } = this.state;
    const rows =  register
        .filter((register) =>
          register.fname.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .map((reg, key) => {
          return (
            <tr key={key}>
             <td>{reg.id}</td>
              <td>{reg.fname}</td>
              <td>{reg.email}</td>
              <td>{reg.district}</td>
              <td>{reg.mobile}</td>
              <td>{reg.uname}</td>
              <td>{reg.password}</td>
            </tr>
          );
        })
    return (
     <>
  <br/>
  
   
  <form class="form-inline d-flex justify-content-center md-form form-sm mt-0">
<input style={{width:"500px"}} type="text" className="form-control" value={searchTerm} name="searchTerm" onChange={this.handleChange} placeholder="Type here to Search"/>
<button type="button" onClick={this.searchuser} className="btn btn-primary">Search</button>
</form>

  




                <div className="container mb-5 mt-3">
                  <table className="table table-dark table-striped table-bordered" style={{width:"100%"}} >
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email ID</th>
                        <th>District</th>
                        <th>Mobile Number</th>
                        <th>Username</th>
                        <th>Password</th>
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
