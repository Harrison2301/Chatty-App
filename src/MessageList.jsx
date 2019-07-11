import React, { Component } from 'react';
import Message from './Message.jsx';
import Notification from './Notification.jsx';

function MessageList(props) {
  return (
    <main className="messages">
      {props.messages.map((message) => {
        console.log(message);
        if (message.type == 'newMessage') {
          return <Message user={props.user} key={message.id} message={message} />;
        }
          return <Notification key={message.id} message={message.content} />;
      })
      }

    </main>
  );
}
export default MessageList;
