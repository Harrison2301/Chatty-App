import React, {Component} from 'react';
import Header from './Header.jsx';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';
const uuidv1 = require('uuid/v1');

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      currentUser: {name: ""}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [
        {
          username: "Bob",
          content: "Welcome to Chatty!"
          id: uuidv1(),
          type: "newMessage"
        }
      ],
      
      userCount: 0
    }
    // New socket server
    this.SocketServer = new WebSocket('ws://localhost:3001');
  console.log('Connected to WebSocket Server')

  }
  
  componentDidMount() {
  console.log("componentDidMount <App />");
}

 updateMessage = (value) => {
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
       <ChatBar currentUser = {this.state.currentUser.name}/>
     </div>
    );
  }
}
export default App;