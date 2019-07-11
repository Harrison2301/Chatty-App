import React, {Component} from 'react';
import Message from './Message.jsx';
import Notification from './Notification.jsx';

class MessageList extends Component {
  render() {
      const messages = this.props.messages.map((value) => <Message key={value.id} name={value.username} contentMessage={value.content}/>);
    return (
        <main className="messages">
            {messages}
      </main>
    );
  }
}
export default MessageList;