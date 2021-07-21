import React from "react";
import { webSocket } from "rxjs/webSocket";
import { Subject } from 'rxjs';
import { retryWhen, delay, tap } from 'rxjs/operators';
import {QueueingSubject} from 'queueing-subject' 

const receiver$ = new Subject();
const sender$ = new QueueingSubject();
const ws$ = webSocket("ws://localhost:8080");

receiver$.subscribe(res => console.log(`SUBSCRIBE()reciever:`,res))
receiver$.next({message: true})

ws$.pipe(
  retryWhen(err$ => err$.pipe(
    tap(() => console.warn(`Websocket failed to. Retrying in seconds`)),
    delay(10_000)
  ))
)

ws$.subscribe(receiver$);
sender$.subscribe(ws$)

receiver$.next('Reciever sent this')
sender$.next('sender$ time to party1 v:' + Math.random(100*10000000))
sender$.next('sender$ time to party2 v:' + Math.random(100*10000000))
sender$.next('sender$ time to party3 v:' + Math.random(100*10000000))
sender$.next('sender$ SENT FROM SENDER ')

const Rsjx = () => <p>RSJX</p>

export default Rsjx