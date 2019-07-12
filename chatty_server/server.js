/* eslint-disable no-console */
// server.js

const express = require('express');
const SocketServer = require('ws').Server;

// Set the port to 3001
const PORT = 3001;


// Create a new express server
const server = express()
// Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${PORT}`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
let clientCount = 0;
wss.on('connection', (ws) => {
  clientCount++
  wss.clients.forEach(function (users){
    users.send(JSON.stringify({counter:clientCount}))
  })
  console.log(clientCount)
  console.log('Client connected');

  ws.on('message', (data) => {
    wss.clients.forEach((client) => {
      const {
        username, content, id, type, oldName,
      } = JSON.parse(data);
      console.log(content);
      if (type === 'newMessage') {
        const newID = {
          id,
          content,
          username: username,
          type,
          counter:clientCount
        };
        client.send(JSON.stringify(newID));
      } else if (type === 'postNotification') {
        const notif = {
          name: username,
          id,
          content: `${oldName} has updated their name to ${username}`,
          type: 'incomingNotification',
          counter:clientCount
          
        };
            client.send(JSON.stringify(notif));
      }
    });
  });
  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    console.log('Client disconnected');
    clientCount--
    console.log(clientCount)
  });
});