require('dotenv').config()
const sequelize = require('./DB')
const express = require("express")
const app = express()
const cors = require('cors')
const FileUpload = require('express-fileupload')
const router = require('./routes/Router')
const errorsHandler = require('./middleware/ErrorHandlingMiddlewarer')
const WebSocket = require('ws');
const path = require('path')


let https= require('https')
let fs = require('fs')
let options={
    key:fs.readFileSync('../COURSE.key'),
    cert:fs.readFileSync('../COURSE.crt')
}
webSockets = {} // userID: webSocketD
var messageArray = [] // userID: webSocketD

const PORT = process.env.PORT

const server =https.createServer(options,app).listen(5000,()=>{console.log(`https://localhost:5000/`);})
const wss = new WebSocket.Server({ server: server });

app.use(cors())

app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(FileUpload({}))
app.use('/api', router)


app.use(errorsHandler)

const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync()
        // app.listen(PORT, () => {
        //     console.log(`server on port ${PORT}`)
        // })

    } catch (e) {
        console.log(e);
    }

}


wss.on('listening', () => {
    console.log('WebSocket server listening on port 5001');
    console.log(wss.address())
});
let clients = new Map();

wss.on('connection', function connection(ws) {
    console.log('connetct');
    ws.on('message', function incoming(message) {
        const data = JSON.parse(message);
        const { type, text, to,from } = data;
        console.log(text)
        client = clients.get(to);

        if (type === 'login') {
            clients.set(text, ws);
            console.log(`Client ${text} connected`);
            let tousermessage= messageArray.filter(item => item.from === text||item.to===text);
            console.log(tousermessage)
            if(tousermessage.length!=0){if(clients.get(text)?.readyState===WebSocket.OPEN){ clients.get(text).send(JSON.stringify(tousermessage))}}

            if (text=='admin'){
                const adm = clients.get('admin').send(JSON.stringify(messageArray))
            }
        } else if (type === 'message') {
            if (to === 'admin') {
                const admin = clients.get('admin');
                messageArray.push({from:from,to:to,text:text})
                if (admin) {
                    console.log('admin')
                    console.log('to ::'+ to  )
                    wss.clients.forEach(client =>{
                        if (client?.readyState === WebSocket.OPEN && clients.get('admin') === client) {
                            console.log('send to admin')
                            client.send(JSON.stringify(messageArray));
                        }
                    });
                } else {

                    console.log('to cl')
                    let toUser=JSON.stringify([{ type: 'info',from:'CarRental',text: 'Admin is offline',to }])
                    ws.send(toUser);
                }
            }

            else {
                messageArray.push({from:from,to:to,text:text})
                let tousermessage= messageArray.filter(item => item.from === to||item.to===to);
                console.log('to user')
                if(clients.get(to)?.readyState===WebSocket.OPEN){ clients.get(to).send(JSON.stringify(tousermessage))}


            }
        }
    });
    function getByValue(map, searchValue) {
        for (let [key, value] of map.entries()) {
            if (value === searchValue)
                return key;
        }
    }
    ws.on('close', () =>{
        console.log('this close')
        let delClient = getByValue(clients, ws)
        console.log('userdelete ' +delClient)
if(delClient !='admin') {
    let delClientsData = messageArray.filter(({from, to}) => from !== delClient && to !== delClient);
    messageArray=delClientsData
    console.log(delClientsData)
    clients.get('admin')?.send(JSON.stringify(messageArray))
 //   console.log({clients})
}
        clients.delete(delClient)

        console.log('Client disconnected');
    });
});

start()


