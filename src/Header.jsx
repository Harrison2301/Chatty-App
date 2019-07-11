import React, { Component } from 'react';

class Header extends Component {
  render() {
    return (
      <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
        <p className="user-counter">Users Online:{this.props.counter}</p>
      </nav>
    );
  }
}
export default Header;
