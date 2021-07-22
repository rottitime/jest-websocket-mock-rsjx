import React from "react";
// import { render, screen, userEvent, fireEvent } from "../test-utils";
import { render, screen } from '@testing-library/react';
import Rsjx from "../Rsjx";
import WS from "jest-websocket-mock";


let server

describe("The Rsjx component", () => {

    beforeEach(() => {
        server = new WS('ws://localhost:8080');
      });
      afterEach(() => {
        WS.clean();
      });

    it("the server keeps track of received messages, and yields them as they come in", async () => {
        // const client = new WebSocket("ws://localhost:8080");
        // jest.useFakeTimers();

        // await server.connected;
   
//  render(<Rsjx />);
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
