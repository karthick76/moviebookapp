import React, { Component } from 'react'
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from 'react-router-dom';
export default class success extends Component {
  render() {
    return (
        <>
        <br/>
        <br/>
        <center>
        <div className="card border-dark mb-3" style={{ height:"28rem", width: "48rem"}}>
  <div className="card-header text-success">Thankyou Your Ticket Booked Successfully !!!!!!!</div>
  <div className="card-body text-dark">
  <center>
  <img className="card-img" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_WtpjaL-nEKiAZ2Z_4-dHL81PsKYv3_YoOD28WTex1Xvx9Z9Bo8sHtHsUS4TrNivf6kI&usqp=CAU"
  style={{"height" : "330px", "width" : "400px"}} />
  </center>
             <Link to="/userview"> <button 
                type="submit" style={{width:"250px"}}
                className="btn btn-warning text-dark"
              >
                Go Back
              </button></Link>
  </div>
</div></center>
  </>
    )
  }
}
