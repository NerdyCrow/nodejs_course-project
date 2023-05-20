import React, {useContext, useState} from 'react';
import {Button, Card, Form} from 'react-bootstrap';
import {observer} from "mobx-react-lite";
import {EnvelopeExclamation, PatchPlus, Send, XCircleFill} from 'react-bootstrap-icons';
import {Context} from "../index";

let messageArray =[]

const ChatComponent = observer(() => {
    const [show, setShow] = useState(false);
    const {wssock} = useContext(Context)
    const {user} = useContext(Context)
    const [message, setMessage] = useState('')
    const [toWho,setToWho] = useState()
    const [data,setData] = useState([])
    const [newMessage,setNewMessage] = useState(false)


    if (wssock.socket) {
        wssock.socket.onmessage = (event) => {
            const datares = JSON.parse(event.data);

            if(user.user.role=='ADMIN'){


                const { type, text, from } = datares;


                setData(datares)



                }


            else if(datares[0].type=='info'){

                setData(data.concat(datares))
            }

            else{

                setData(datares)
                //setShow(true)
                setNewMessage(true)
            }


           if( Array.isArray(data)) {
                   };

        };
    }
    else{
        setShow(false)
    }


    const handleShow = () => {
        if (!user.user.id) {
            alert('Для использования чата авторизуйтесь')

        } else if (user.user.role == 'ADMIN') {
            setShow(true)
            const newSocket = new WebSocket(`wss://localhost:5000`);

            newSocket.onopen = function (event) {
                wssock.setWs(newSocket)
                newSocket.send(JSON.stringify({ type: 'login', text: 'admin' }));
            };
        } else {
            setShow(true)
            setNewMessage(false)
            const newSocket = new WebSocket(`wss://localhost:5000`);

            newSocket.onopen = function (event) {
                wssock.setWs(newSocket)
                newSocket.send(JSON.stringify({ type: 'login', text: user.user.email }));
            };
        }
    }
    const handleClose = () => {

        setShow(false)
        setNewMessage(false)

    }
    const sendMessage = () => {
        if (user.user.role == 'USER') {
            let usdt={ type: 'message', to: 'admin', text: message, from: user.user.email }
            setData(data.concat(usdt))
            wssock.socket.send(JSON.stringify({ type: 'message', to: 'admin', text: message, from: user.user.email }))
        } else if (user.user.role == 'ADMIN') {

            setData(data.concat({type: 'message', to: toWho, text: message, from: 'admin'}))
            wssock.socket.send(JSON.stringify({ type: 'message', to: toWho, text: message, from: 'admin' }))

        }

    }


    return (
        <div style={{position: 'fixed', bottom: '20px', right: '20px'}}>
            <div>


                {user.isAuth==true  ? !show ? newMessage?<EnvelopeExclamation cursor="pointer" size={40} onClick={handleShow}/>: <PatchPlus cursor="pointer" size={40} onClick={handleShow}/> :'' : ''}


                {show ? <div >

                    <Card style={{position: 'relative', maxHeight: 300, overflow: 'auto'}}  className="border-1 p-3">
                        {

                            (user.user.role == 'ADMIN' && Array.isArray(data)) ? data?.map((item, index) => <p onClick={()=>{setToWho(item.from)}}  key={index}>
                                {item.from==='admin'? 'You' + '->'+ item.to +': '+item.text :
                                    item.from + ': '+item.text
                                }

                                </p>
                            ) : Array.isArray(data)? data.map((item, index) => <p  key={index}>
                                    {item.from=='admin'?'CarRental' : item.from===user.user.email? 'You':item.from}: {item.text}

                            </p>

                            ):<p >{data.from=='admin'?'CarRental' : data.from }: {data.text} </p>


                        }



                    </Card>
                    <Form className="mt-3" style={{display: 'flex', flexDirection: 'row'}}>

                        {user.user.role == 'ADMIN' ?
                            <Form.Control
                                className=""
                                name="Number"
                                value={toWho}
                                onChange={e => setToWho(e.target.value)}
                                placeholder="кому ответить"
                                type="text"
                            />
                            : ''
                        }

                        <Form.Control
                            className=""
                            name="Number"
                            value={message}
                            onChange={e => setMessage(e.target.value)}
                            placeholder="Спросите что-нибудь"
                            type="text"
                        />

                        <Button className="" onClick={sendMessage}><Send/></Button>

                    </Form>
                    <XCircleFill
                        size={25}
                        onClick={handleClose}
                        color='red'
                        style={{
                            position:'absolute',
                            top:-27,
                            right:0,
                            cursor: 'pointer'
                        }}
                    />
                </div> : <></>}
            </div>
        </div>
    );
})

export default ChatComponent;
