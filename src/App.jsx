import React, {Component} from 'react';
import Header from './Header.jsx';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';
const uuidv1 = require('uuid/v1');

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      currentUser: {name: "test"}, // optional. if currentUser is not defined, it means the user is Anonymous
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

sendNotification = messaging => {
  this.SocketServer.send(JSON.stringify(messaging));
}

// update state with messageNew
 addMessage = (value, type) => {
  if(type === "msgNotification") {
    value.type = "newMessage"
  } else if (type === "incomingNotification"){
    value.type = "incomingNotification";
  }
  var messagesOrg = this.state.messages;
  var messagesNew = [...messagesOrg, value];
  this.setState({messages:messagesNew})
 
}

handleNewMessage = (event) => {
var newMessage = JSON.parse(event.data)
if(newMessage.type) {
  this.addMessage(newMessage, newMessage.type)
}
};

componentDidMount(){
  this.SocketServer.onmessage = this.handleNewMessage
  this.SocketServer.addEventListener('message', function (event) {
    this.setState({
      
    })
});
}

sendMessage = (value, type) => {
  value.type = type;
  this.SocketServer.send(JSON.stringify({
    message:value
  }))
  this.sendNotification(value);
}


  render() {
    return (
     <div>
       <Header/>
       <MessageList messages={this.state.messages} user={this.state.currentUser.name}/>
       <ChatBar currentUser = {this.state.currentUser.name} updateName = {this.updateName} sendMessage={this.sendMessage}/>
     </div>
    );
  }
}
export default App;