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
        receiver$.subscribe(res => setMessage(old => [...old, `SUBSCRIBE()reciever: ${JSON.stringify(res)}`]) )
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

        receiver$.next('Reciever sent this')
        sender$.next('sender$ time to party1 v:' + Math.random(100*10000000))
        sender$.next('sender$ time to party2 v:' + Math.random(100*10000000))
        sender$.next('sender$ time to party3 v:' + Math.random(100*10000000))
        sender$.next('sender$ SENT FROM SENDER ')
        
    }, [])

    return <>
        <h1>RSJX</h1>
        <ol>
        {messages.map((message,i) => <li key={i}>{message}</li> )}
        </ol>
    </>
}

export default Rsjx