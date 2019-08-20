import React from 'react';
import './App.css';
import AuthHelperMethods from './components/AuthHelperMethods';
//Our higher order component
import withAuth from './components/withAuth';

/* Create a new instance of the 'AuthHelperMethods' component at the top of the class*/
Auth = new AuthHelperMethods();
/* Add the following into _handleLogout*/
_handleLogout = () => {
  this.Auth.logout()
  this.props.history.replace('/login');
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default withAuth(App);
