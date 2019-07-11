import React, { Component } from 'react';
import Header from './Header.jsx';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';
const uuidv1 = require('uuid/v1');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: { name: 'Anonymous' }, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [
        {
          username: 'Bob',
          content: 'Welcome to Chatty!',
          id: uuidv1(),
          type: 'newMessage',
        },
      ],
      clientCount:0
     
    };
    // New socket server
    this.SocketServer = new WebSocket('ws://localhost:3001');
    console.log('Connected to WebSocket Server');
  }

  componentDidMount() {
    console.log('componentDidMount <App />');
  }


// update name
updateName = (nameState, type) => {
  // name update notification message
  const nameNotification = `${this.state.currentUser.name ? this.state.currentUser.name : 'Anonymous'}
  has updated their name to ${nameState.username ? nameState.username : 'Anonymous'}`;
  this.sendNotification(nameNotification);
  this.setState({
    currentUser:
    { name: nameState.username },
  });
}

sendNotification = (messaging) => {
  this.SocketServer.send(JSON.stringify(messaging));
}

// update state with messageNew
 addMessage = (value, type) => {
   if (type === 'msgNotification') {
     value.type = 'newMessage';
   } else if (type === 'incomingNotification') {
     value.type = 'incomingNotification'; 
   }
   const messagesOrg = this.state.messages;
   const messagesNew = [...messagesOrg, value];
   this.setState({ messages: messagesNew });
 }

handleNewMessage = (event) => {
  const newMessage = JSON.parse(event.data);
  if (newMessage.type) {
    this.addMessage(newMessage, newMessage.type);
  }
};

componentDidMount() {
  this.SocketServer.onmessage = this.handleNewMessage;
  this.SocketServer.addEventListener('message', (event) => {
    const { counter } = JSON.parse(event.data)
    console.log(counter)
    this.setState({clientCount: counter})
  });
}

   // key down event for name
   handleKeyPressName = (event) => {
     if (event.key === 'Enter') {
       const oldName = this.state.currentUser.name;
       console.log('hello');
       if (this.state.currentUser !== this.state.username) {
         console.log(event.target.value);
         const newNotification = { type: 'postNotification', username: event.target.value, oldName };
         this.setState({ currentUser: { name: event.target.value } });
         this.SocketServer.send(JSON.stringify(newNotification));
       }
     }
   }

  // key down event for message
  handleKeyPressMessage = (event) => {
    if (event.key === 'Enter') {
      console.log('test');
      if (this.state.currentUser !== this.state.username) {
        this.updateName(this.state, 'nameNotification');
      }
      this.SocketServer.send(JSON.stringify({
        username: this.state.currentUser.name,
        content: event.target.value,
        type: 'newMessage',
      }));
    }
  }


  render() {
    return (
      <div>
        <Header counter={this.state.clientCount}/>
        <MessageList messages={this.state.messages} user={this.state.currentUser.name} />
        <ChatBar changeUser={this.handleKeyPressName} message={this.handleKeyPressMessage} currentUser={this.state.currentUser.name} updateName={this.updateName} sendMessage={this.sendMessage} />
      </div>
    );
  }
}
export default App;
