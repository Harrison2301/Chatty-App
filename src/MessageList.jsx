import React, {Component} from 'react';
import Message from './Message.jsx';
import Notification from './Notification.jsx';

function MessageList(props) {
  return (
    <main className= "messages">
      {props.messages.map(message => {
        console.log(message)
        if (message.type =='newMessage'){
          return <Message key={message.id} message={message}/>
        } else {
          return <Notification key={message.id} message={message.content}/>
        }

      })
      }
  
  </main>
  )
}
export default MessageList;