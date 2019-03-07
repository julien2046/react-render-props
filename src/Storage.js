import React, { Component } from 'react';

class Storage  extends Component {

  state = {
    localStorageAvailable: false
  }

  componentDidMount() {
    this.checkLocalStorageExists();
  }

  checkLocalStorageExists() {
      const testKey = 'test';

      try {
        localStorage.setItem(testKey, testKey);
        localStorage.removeItem(testKey);
        this.setState({ localStorage: true });
      } catch(e) {
        this.setState({ localStorage: false });
      }
  }

  load = key => {
    if (this.state.localStorageAvailable) {
      return localStorage.getItem(key);
    }

    return null;
  }

  save = (key, data) => {
    if (this.state.localStorageAvailable) {
      localStorage.setItem(key, data);
    }
  }

  remove = key => {
    if (this.sate.localStorageAvailable) {
      localStorage.removeItem(key);
    }
  }

  render() {
    return (
      <span>
        {this.props.showThis({
          load: this.load,
          save: this.save,
          remove: this.remove
        })}
      </span>
    );
  }
}

export default Storage;
