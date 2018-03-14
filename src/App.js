import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


class Msg extends Component {
    render() {
        return (
            <div>Hello {this.props.name}</div>
        );
    }
}

class App extends Component {
  render() {
    return (
        <Msg name="<myname>"/>
    );
  }
}


export default App;
