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
          content: "Welcome to Chatty!",
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

//update name 
updateName = (nameState, type) => {
  //name update notification message
  let nameNotification = `${this.state.currentUser.name ? this.state.currentUser.name : "Anonymous"}
  has updated their name to ${nameState.username ? nameState.username : "Anonymous"}`;
  this.sendNotification(nameNotification)
  this.setState ({ currentUser: 
    {name: nameState.username}
  });
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
       <ChatBar currentUser = {this.state.currentUser.name} updateName = {this.updateName}/>
     </div>
    );
  }
}
export default App;