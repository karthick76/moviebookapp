import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';
import { Link } from 'react-router-dom';
const url2 = "http://localhost:4000/register/";
export default class DeleteUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
          register: [],
          errorMessage: "",
          successMessage: "",
          searchTerm: ""
        };
        this.handleChange = this.handleChange.bind(this);
      }
      componentDidMount() {
        this.fetchMovies();
      }
      handleChange(event) {
        this.setState({
          [event.target.name]: event.target.value 
        })
      }
      fetchMovies = () => {
        axios
          .get(url2)
          .then((response) => {
            const data = response.data;
            const newState = {
              register: data,
              errorMessage: "",
            };
            this.setState(newState);
          })
          .catch((error) => {
            if (error.response.status == 404) {
              this.setState({
                errorMessage: "Could not fetch User data!",
                successMessage: "",
              });
            }
          });
        /* 
          Send an AXIOS GET request to the url http://localhost:1050/bookings/ to fetch all the bookings 
          and handle the success and error cases appropriately.Set the isLoading to false once the request is complete
        */
      };
      searchuser=()=>{
        axios.get(`http://localhost:4000/register/?fname=${this.state.setRecord.record}`)
        .then(response=>{
            this.setState({
                setRecord:response.data,
            })
        });
    }
      deleteMovies = (id) => {
        axios
          .delete(url2 + id)
          .then((res) => {
            this.fetchMovies();
            this.setState({
              successMessage: "User deleted successfully!!",
            });
            setTimeout(()=>this.props.history.push("/adminview"), 2500);
          })
          .catch((error) => {
              this.setState({
                errorMessage: "User deletion failed!",
                successMessage: "",
              });
            
          });
      };
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
              <td>
          <button 
            type="submit"
            onClick={()=>this.deleteMovies(reg.id)}
            className="btn btn-danger"
          >
            Delete
          </button>
        </td>
            </tr>
          );
        })
    return (
      <>
      <form class="form-inline d-flex justify-content-center md-form form-sm mt-0">
<input style={{width:"500px"}} type="text" className="form-control" value={searchTerm} name="searchTerm" onChange={this.handleChange} placeholder="Type here to Search"/>
<button type="button" onClick={this.searchuser} className="btn btn-primary">Search</button>
</form>

  




                <div className="container mb-5 mt-3">
                  <table className="table table-light table-striped table-bordered" style={{width:"100%"}} >
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email ID</th>
                        <th>District</th>
                        <th>Mobile Number</th>
                        <th>Username</th>
                        <th>Password</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>{rows}</tbody>
                   
                    
                 
                  </table>
                  <div align="center">
                    {
                       <p style={{width:"100%"}} className="text-success bg-light">{this.state.successMessage}</p>
                    }
                    </div>
                  <div align="center">
                    {
                       <p style={{width:"100%"}} className="text-success bg-light">{this.state.ErrorMessage}</p>
                    }
                     </div>
                  </div>

      </>
    )
  }
}
