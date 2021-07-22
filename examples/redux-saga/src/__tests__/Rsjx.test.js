import React from "react";
// import { render, screen, userEvent, fireEvent } from "../test-utils";
import { render, act } from '@testing-library/react';
import Rsjx from "../Rsjx";
import WS from "jest-websocket-mock";


let server, client

describe("The Rsjx component", () => {

    beforeEach(() => {
        server = new WS('ws://localhost:8080', {jsonProtocol: true});
        global.Math.random = () => 123

      });
      afterEach(() => {
        WS.clean();
      });


  it("rendered", async () => {
    await render(<Rsjx />);
    expect(screen.getByText("RSJX")).toBeInTheDocument();
  })

    it("the server keeps track of received messages, and yields them as they come in", async () => {
      let screen;
        client = new WebSocket("ws://localhost:8080");
        const messages = [];
        client.onmessage = (e) => {
          console.log('dedeeddedede', e.data)
          messages.push(e.data);
        };


        server.on('connection', socket => {
          console.log('*OPENED')
          socket.on('message', data => {
              console.log('*****************Server recieved', data)
              act(() => {
                /* fire events that update state */
                socket.send(`{"server v2": ${data}}` );
                // socket.send(`{"server v3": 1234}` );
                // expect(screen).toMatchSnapshot();
              });
              
          });
        });

        await server.connected;
   
        screen = await render(<Rsjx />);
       
        await expect(server).toReceiveMessage('sender$ sent to server1: 123');
        expect(screen.getByText('recieved: {"server v2":"sender$ sent to server1: 123"}')).toBeInTheDocument();
        await expect(server).toReceiveMessage('sender$ sent to server2: 123');
        expect(screen.getByText('recieved: {"server v2":"sender$ sent to server2: 123"}')).toBeInTheDocument();
        await expect(server).toReceiveMessage('sender$ sent to server3: 123');
        expect(screen.getByText('recieved: {"server v2":"sender$ sent to server3: 123"}')).toBeInTheDocument();

      });



//   it("ws connected", async () => {
//     await server.connected;    
//     // await render(<Rsjx />);
//     server.close();

    

//     expect(true).toBe(true)
//     // ws.close();

//   })

//   it("sends the message when submitting the form", async () => {
//     const { ws } = await render(<App />);
//     const input = screen.getByPlaceholderText("type your message here...");
//     userEvent.type(input, "Hello there");
//     fireEvent.submit(input);
//     expect(screen.getByText("(sent) Hello there")).toBeInTheDocument();
//     await expect(ws).toReceiveMessage("Hello there");

//     ws.send("[echo] Hello there");
//     expect(
//       screen.getByText("(received) [echo] Hello there")
//     ).toBeInTheDocument();
//   });
});
