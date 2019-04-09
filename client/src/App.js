import React, { Component } from 'react';
import { NavLink, Route, withRouter } from 'react-router-dom';

import './App.css'; 
import Login from './login/Login';
import Signup from './signup/Signup';
import Jokes from './jokes/Jokes';

class App extends Component {
  render() {
    return (
      <div className="App">
        <nav>
            <NavLink className="navlink navitem" to="/signin">Login</NavLink>
            &nbsp; | &nbsp;
            <NavLink className="navlink navitem" to="/users">Jokes</NavLink>
            &nbsp; | &nbsp;
            <NavLink className="navlink navitem" to="/signup">Sign Up</NavLink>
            <br />
            <button className="btn-logout navitem" onClick={this.onLogout}>Logout</button>
          </nav>
          <main>
            <Route path="/signup" component={Signup}/>
            <Route path="/signin" component={Login}/>
            <Route path="/jokes" component={Jokes}/>
          </main>
      </div>
    );
  }

  onLogout = () => {
    localStorage.removeItem('jwt');
    this.props.history.push('/login');
  }
}

export default withRouter(App);
