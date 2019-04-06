import React from 'react';
import axios from 'axios';

class Jokes extends React.Component {
  state = {
    jokes: []
  }

  componentDidMount() {
    const endpoint = "http://localhost:3300/api/jokes"
    const headers = { authorization: localStorage.getItem('jwt') }
    axios
      .get(endpoint, { headers })
      .then(res => {
        this.setState({
          jokes: res.data
        })
      })
      .catch(error => {
        console.error(error);
      })
  }
  render(){
    return (
      <>
        <h2>Jokes</h2>
        <div className="jokes-con">
          {this.state.jokes.map(joke => (
            <div className="joke" key={joke.id}>
              <div className="joke" >{joke.joke}</div>
            </div>
          ))}
        </div>
      </>
    )
  }
}

export default Jokes;