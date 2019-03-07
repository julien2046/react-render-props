import React, { Component } from 'react';
import Storage from './Storage';
import './app.css';

// The render props pattern is a way to share functionality between components
// without repeating code.
// props => render function
// the render function should return a React component.

let reallyLongApi = new Promise(function(resolve, reject) {
  setTimeout(() => resolve(
    {
      username: 'John',
      favoriteMovie: 'DTC'
    }), 4000)
})


class ComponentNeedingStorage extends Component {
  
  state = {
    username: '',
    favoriteMovie: '',
    isFetching: false
  }

  componentDidMount() {
    const username = this.props.load('username') || this.state.username;
    const favoriteMovie = this.props.load('favoriteMovie') || this.state.username;

    if ((!username || !favoriteMovie) && !this.state.isFetching) {
      this.fetchData();
    }
  }

  fetchData() {
    this.setState({ isFetching: true });

    reallyLongApi.then(user => {
        this.props.save('username', user.username);
        this.props.save('favoriteMovie', user.favoriteMovie);

        this.setState({
          username: user.username,
          favoriteMovie: user.favoriteMovie,
          isFetching: false
        });
      });
  }

  render() {
    if (this.state.isFetching) {
      return (
        <div>Loading ...</div>
      );
    } else {
      return (
        <div>
          My username is {this.state.username}, and I love to watch {this.state.favoriteMovie}
        </div>
      );
    }
  }
}

class WrapperComponent extends Component {
  render() {
    return (
      <Storage
        showThis={({ load, save, remove }) => {
          return (
            <ComponentNeedingStorage
              load={load}
              save={save}
              remove={remove}
            />
          )
        }}
      />
    );
  }
}


export default WrapperComponent;
