import React, {useEffect, useState } from "react";
import { webSocket } from "rxjs/webSocket";
import { Subject } from 'rxjs';
import { retryWhen, delay, tap } from 'rxjs/operators';
import {QueueingSubject} from 'queueing-subject' 

const receiver$ = new Subject();
const sender$ = new QueueingSubject();
const ws$ = webSocket("ws://localhost:8080");

const Rsjx = () => {
    const [messages,setMessage] = useState([])

    useEffect(() => {
        receiver$.subscribe(res => setMessage(old => [...old, JSON.stringify(res)]) )
        receiver$.next({message: true})

        ws$.pipe(
        retryWhen(
            err$ => err$.pipe(
            tap(() => console.warn(`Websocket failed to. Retrying in seconds`)),
            // delay(10_000)
        ))
        )

        ws$.subscribe(receiver$);
        sender$.subscribe(ws$)

        receiver$.next('reciever$ got this directly')
        sender$.next('sender$ sent to server1: ' + Math.random(100*10000000))
        sender$.next('sender$ sent to server2: ' + Math.random(100*10000000))
        sender$.next('sender$ sent to server3: ' + Math.random(100*10000000))
    }, [])

    return <>
        <h1>RSJX</h1>
        <ol>
        {messages.map((message,i) => <li key={i}><i>SUBSCRIBE()recieved</i>: {message}</li> )}
        </ol>
    </>
}

export default Rsjx