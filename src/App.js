import './App.css';
import { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Switch } from 'react-router-dom';
import { Link } from 'react-router-dom';
import ViewBooking from './component/ViewBooking';
import DeleteBooking from './Admin/DeleteBooking';
import AddMovies from './Admin/AddMovies';
import UpdateMovie from './Admin/UpdateMovie';
import Update from './Admin/Update';
import Register from './component/Register';
import Login from './component/Login';
import AdminLogin from './Admin/AdminLogin';
import AdminView from './Admin/AdminView';
import ViewUsers from './Admin/ViewUsers';
import DeleteUser from './Admin/DeleteUser';
import TicketBooking from './component/TicketBooking';
import UserView from './component/UserView';
import ViewTicket from './Admin/ViewTicket';
import Success from './component/Success';
class App extends Component{
  
  render(){
   
    function greeting(){
      
      localStorage.removeItem('user');
      <Link to="/"></Link>
      refershpage();
    }
    function refershpage(){
      window.location.reload(false);
     
    }
   
    //const datax=JSON.parse(localStorage.getItem('user'))
    return(
      <>
      <div> 
     
      {(localStorage.getItem('user'))?(
      <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
      <div className="container-fluid">
        <ul className="navbar-nav">
        <li class="nav-item avatar">
        <a class="nav-link p-0" href="#">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuKbCWV4qPnw8EY_BBatanRjk-uNTnnjUzlg&usqp=CAU" className="rounded-circle z-depth-0"
            alt="avatar image" height="35" />
        </a>
      </li>
        <Link  className="navbar-brand" to="/">Eccentric Movies</Link>
      <button  className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
      <span  className="navbar-toggler-icon"></span>
      </button>
        
        </ul>
        <ul class="navbar-nav ml-auto nav-flex-icons">
      <li class="nav-item avatar">
        <a class="nav-link p-0" href="#">
        <li className="nav-item">
        Welcome 
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQa-HKndsB70C6zo4kOkJtVPLzbLaOA5ljeYw&usqp=CAU"
            alt="avatar image" height="35" />
            <button type='submit' onClick={greeting}><Link to="/">Logout</Link>
              </button>
             </li>
            
                
        </a>
      </li>
    </ul>
      </div>
      
    </nav>):(
    <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
      <div className="container-fluid">
      
        <ul className="navbar-nav">
        <li class="nav-item avatar">
        <a class="nav-link p-0" href="#">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuKbCWV4qPnw8EY_BBatanRjk-uNTnnjUzlg&usqp=CAU" className="rounded-circle z-depth-0"
            alt="avatar image" height="35" />
        </a>
      </li>
        <Link  className="navbar-brand" to="/">Eccentric Movies</Link>
      <button  className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
      <span  className="navbar-toggler-icon"></span>
      </button>
        </ul>
        <ul class="navbar-nav ml-auto nav-flex-icons">
      <li class="nav-item avatar">
        <a class="nav-link p-0" href="#">
        <li className="nav-item">
       <Link className="nav-link" to="/register"> <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQa-HKndsB70C6zo4kOkJtVPLzbLaOA5ljeYw&usqp=CAU"
            alt="avatar image" height="35" />Register/Login</Link>
             </li>
            
                
        </a>
      </li>
    </ul>
      </div>
     
    </nav>
    )}
    

<Switch>
  <Route path="/update/" component={Update} />
  <Route path="/register" component={Register} />
  <Route path="/login" component={Login} />
  <Route path="/updatemovie/:id" component={UpdateMovie} />
  <Route path="/userview" component={UserView} />
  <Route path="/ticketbooking/:movieId/:movieName" component={TicketBooking} />
  <Route path="/deletebooking" component={DeleteBooking} />
  <Route path="/success" component={Success}/>
  <Route path="/viewticket" component={ViewTicket}/>
  <Route path="/deleteuser" component={DeleteUser} />
  <Route path="/addmovies" component={AddMovies} />
  <Route path="/viewusers" component={ViewUsers} />
  <Route path="/admin" component={AdminLogin} />
  <Route path="/adminview" component={AdminView}/>
  <Route path="/" component={ViewBooking} />
</Switch>

</div>
    </>
    
    );
  }
}
export default App;
