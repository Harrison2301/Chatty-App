import React, {Component} from 'react';

class ChatBar extends Component {

   constructor(props){
     super(props);
     this.state = {
       username: this.props.currentUser,
       content: ""
     }
   }

   // key down event for name
   handleKeyPressName = (event) => {
     if(event.key === "Enter") {
       if(this.props.currentUser !== this.state.username){
         this.props.updateName(this.state, "nameNotification");
       }
     }
   }
   //sets updated state of name
   updateName = (event) => {
     this.setState({
       username: event.target.value
     })
   }
  render() {
    return (
        <footer className="chatbar">
        <input onKeyDown={this.handleKeyPressName} onKeyUp={this.updateName} className="chatbar-username" placeholder="Your Name (Optional)" defaultValue= {this.props.currentUser}/>
        <input onKeyUp={this.props.handleInput} className="chatbar-message" placeholder="Type a message and hit ENTER" />
      </footer>
    );
  }
}
export default ChatBar;
