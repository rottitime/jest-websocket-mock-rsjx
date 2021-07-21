import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "./styles.css";
import makeStore from "./store";
import App from "./App";
import { webSocket } from "rxjs/webSocket";
import { Subject } from 'rxjs';
import { retryWhen, delay, tap } from 'rxjs/operators';
import {QueueingSubject} from 'queueing-subject' 
import Rsjx from "./Rsjx";

// ReactDOM.render(
//   <Rsjx />,
//   document.getElementById("root")
// );

const store = makeStore();


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
