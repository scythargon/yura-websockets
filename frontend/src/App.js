import React, {useEffect} from 'react';
import {useHotkeys} from "react-hotkeys-hook";

import ReconnectingWebSocket from 'reconnecting-websocket';


const App = () => {

  let username = "";
  let ws = null;

  const onOpen = (e) => {
    console.log("Websocket connection established.");
  };

  const onClose = (e) => {
    console.error("Websocket connection closed");
  };

  // You can tell that's your message here if it has the same username.
  const onMessage = (e) => {
    const data = JSON.parse(e.data);
    console.log("New message:", data);
  };

  const sendMessage = (messageText) => {
    ws.send(
      JSON.stringify({
        fromUser: username,
        text: messageText,
      })
    );
  };

  // Something like an object constructor - executed only once.
  useEffect(() => {
    username = prompt("Enter your nickname:", "");

    ws = new ReconnectingWebSocket("ws://localhost:4000");
    ws.onopen = onOpen;
    ws.onmessage = onMessage;
    ws.onclose = onClose;
  }, []);

  useHotkeys('up', () => sendMessage('up'));
  useHotkeys('left', () => sendMessage('left'));
  useHotkeys('down', () => sendMessage('down'));
  useHotkeys('right', () => sendMessage('right'));

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
