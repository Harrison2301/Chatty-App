import React, {Component} from 'react';
import Header from './Header.jsx';
import MessageList from './MessageList.jsx';
import Message from './Message.jsx';
import ChatBar from './ChatBar.jsx';


class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      currentUser: {name: 'Bob'}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [
        {
          username: 'Bob',
          content: 'Has anyone seen my marbles?',
          id: 1
        },
        {
          username: 'Anonymous',
          content: 'No, I think you lost them. You lost your marbles Bob. You lost them for good.',
          id: 2
        }
      ]
    }

    this.SocketServer = undefined
  }
  componentDidMount() {
  console.log("componentDidMount <App />");
  this.SocketServer = new WebSocket('ws://localhost:3001');
  console.log('Connected to WebSocket Server')
  setTimeout(() => {
    console.log("Simulating incoming message");
    // Add a new message to the list of messages in the data store
    const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
    const messages = this.state.messages.concat(newMessage)
    // Update the state of the app component.
    // Calling setState will trigger a call to render() in App and all child components.
    this.setState({messages: messages})
  }, 3000);
}
 updateMessage = (value) => {
  const uuidv1 = require('uuid/v1');
  const newMessage = {
    username: this.state.currentUser.name,
    content: value,
    id: uuidv1()
  }
  this.setState({
    messages: [...this.state.messages, newMessage]
  })
}

handleInput = event => {
  event.preventDefault()
  // if it's the Enter key, send the username to app
  if (event.key === 'Enter') {
    this.updateMessage(event.target.value)
    const msg = {type:"sendMessage", content: event.target.value, username: this.state.currentUser.name}
    this.SocketServer.send(JSON.stringify(msg))
  }
};


  render() {
    return (
     <div>
       <Header/>
       <MessageList messages={this.state.messages}/>
       <ChatBar currentUser = {this.state.currentUser.name} 
       handleInput = {this.handleInput}/>
     </div>
    );
  }
}
export default App;
