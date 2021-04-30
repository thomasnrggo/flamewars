import React, { useEffect, useState, useRef } from 'react'
import io from "socket.io-client";
const ENDPOINT = 'http://localhost:3000';
// const ENDPOINT = 'https://flamewars-master.herokuapp.com';



export default function Homepage() {
    const socket = io(ENDPOINT);
    const [localMessages, setLocalMessages] = useState([])
    const [field, setField] = useState('')
    const [user, setUser] = useState('')

    useEffect(() => {
        socket.on("message", handleMessage);
        // console.log(messages);
        // setLocalMessages(messages)

        const getData = async () => {
            let res = await fetch(`${ENDPOINT}/messages`)
            let messages = await res.json();
            console.log(messages);
            return messages
        }
        getData()
        .then(res => {
            setLocalMessages(res)
        })
    }, [])

    let handleMessage = msg => {
        setLocalMessages(oldMessages => [...oldMessages, msg])
    }

    let handleChange = e => {
        setField(e.target.value)
    }

    let handleSubmit  = e => {
        e.preventDefault()
        let msg = {
            id: new Date().getTime(),
            value: field,
            user: user
        }
        if(field.includes('/create')) {
            console.log('crear evento');
            socket.emit('create', {command: field})
            setField('')
        } else if(field.includes('/close')) {
            console.log('cerrando evento');
            socket.emit('close', {})
        } else if(field.includes('#')) {
            console.log('its a vote');
            socket.emit('vote', {vote: field})
        } else {
            socket.emit('message', msg)
            setField('')
        }
    }

    return (
        <div>
            {localMessages ? localMessages.map(message => {
                return <li key={message.id}>{message.user} {`=>`} {message.value}</li>
            }): null}
            <form onSubmit={handleSubmit}>
                <input
                    onChange={handleChange}
                    type='text'
                    placeholder='Escribe algo'
                    value={field}
                />
                <button>Enviar</button>
            </form>
        </div>
    )
}

// export async function getStaticProps(context) {
//     let res = await fetch(`${ENDPOINT}/messages`)
//     let messages = await res.json()
//     return {
//       props: { messages }, // will be passed to the page component as props
//     }
// }
