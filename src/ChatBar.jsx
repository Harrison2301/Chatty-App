import React, { Component } from 'react';

class ChatBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.currentUser,
      content: '',
    };
  }


  // sets state of message
  handleMessage = (event) => {
    this.setState({
      content: event.target.value,
    });
  }

  render() {
    return (
      <footer className="chatbar">
        <input onKeyDown={this.props.changeUser} onKeyUp={this.updateName} className="chatbar-username" placeholder="Your Name (Optional)" defaultValue={this.props.currentUser} />
        <input onKeyDown={this.props.message} onChange={this.handleMessage} className="chatbar-message" placeholder="Type a message and hit ENTER" name="message" />
      </footer>
    );
  }
}
export default ChatBar;
