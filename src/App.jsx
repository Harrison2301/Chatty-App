import React, {Component} from 'react';
import Header from './Header.jsx';
import MessageList from './MessageList.jsx';
import Message from './Message.jsx';
import ChatBar from './ChatBar.jsx';

class App extends Component {
  render() {
    return (
     <div>
       <Header/>
       <MessageList/>
       <Message/>
       <ChatBar/>
     </div>
    );
  }
}
export default App;
