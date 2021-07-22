import React from "react";
// import { render, screen, userEvent, fireEvent } from "../test-utils";
import { render, screen } from '@testing-library/react';
import Rsjx from "../Rsjx";
import { WebSocket, Server } from 'mock-socket';

global.WebSocket = WebSocket; // Here we stub out the window object



describe("MockSocket component", () => {


    it("the server keeps track", async () => {

        const fakeURL = 'ws://localhost:8080';
        const mockServer = new Server(fakeURL);

        mockServer.on('connection', socket => {
            socket.on('message', data => {
                console.log('****************************************************************')
                socket.send('test message from mock server');
            });
          });

        const screen = await render(<Rsjx />);

        mockServer.clients(); // array of all connected clients
        mockServer.emit('roommessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessage', 'messagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessagemessage');
        expect(true).toBe(true)
        expect(screen).toMatchSnapshot();


        // client.send("hello");
        // await expect(server).toReceiveMessage("hello");
        // expect(server).toHaveReceivedMessages(["hello"]);
      });


//   it("rendered", async () => {
//     await render(<Rsjx />);
//     expect(screen.getByText("RSJX")).toBeInTheDocument();
//   })

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
