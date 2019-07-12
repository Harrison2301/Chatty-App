import React, { Component } from 'react';

class Header extends Component {
  render() {
    return (
      <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
        <p className="user-counter">{this.props.counter} Users Online</p>
      </nav>
    );
  }
}
export default Header;
