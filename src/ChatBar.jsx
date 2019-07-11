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

   //key down event for message
   handleKeyPressMessage = (event) => {
     if(event.key === "Enter") {
       if(this.props.currentUser !== this.state.username){
         this.props.updateName(this.state, "nameNotification");
       }
       this.props.sendMessage(this.state, "msgNotification");
       this.setState({
         content:""
       })
     }
   }

   //sets state of message 
   handleMessage = (event) => {
     this.setState({
       content: event.target.value
     })
   }

  render() {
    return (
        <footer className="chatbar">
        <input onKeyDown={this.handleKeyPressName} onKeyUp={this.updateName} className="chatbar-username" placeholder="Your Name (Optional)" defaultValue= {this.props.currentUser}/>
        <input onKeyDown={this.handleKeyPressMessage} onChange={this.handleMessage} className="chatbar-message" placeholder="Type a message and hit ENTER" name="message" />
      </footer>
    );
  }
}
export default ChatBar;
