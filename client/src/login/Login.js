import React from 'react';
import axios from 'axios';

class Login extends React.Component {
  state = {
    username: '',
    password: ''
  }

  onInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    })
  }

  onSubmit = event => {
    event.preventDefault();
    axios
      .post('http://localhost:3300/api/login', this.state)
      .then(res => {
        console.log(res.data)
        localStorage.setItem('jwt', res.data.token)
        this.props.history.push('/jokes')
      })
  }

  render(){
    return(
      <>
        <h2>Login to Dad Jokes</h2>
        <form onSubmit={this.onSubmit}>
          <label htmlFor="username">Username</label>
          <input 
            name="username"
            type="text"
            id="username"
            autoComplete="off"
            value={this.state.username}
            onChange={this.onInputChange}
          />
          <label htmlFor="password">Password</label>
          <input 
            name="password"
            type="password"
            id="password"
            autoComplete="off"
            value={this.state.password}
            onChange={this.onInputChange}
          />
          <button type="submit">Login</button>
        </form>
      </>
    )
  }
}

export default Login;