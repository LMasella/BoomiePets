require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
require('./config/mongoose.config');

app.use(cookieParser());
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require('./routes/user.routes')(app);

const server = app.listen(port, () => console.log(`Listening on port: ${port}`));

const io = require('socket.io')(server, { cors: true });

const state = {};
const clientRooms = {}; 

io.on("connection", socket => {
    console.log('successfully connected to socket with id:');
    console.log(socket.id);

    socket.on('join-room', (username, boomie, room) => {
        clientRooms[socket.id] = room;
        socket.join(room);
        if (state.hasOwnProperty(room)) {
            state[room] = {...state[room], p2: {username: username, boomie: boomie}};
        }
        else {
            state[room] = {p1: {username: username, boomie: boomie}};
        }
        io.in(room).emit('update-game-state', state[room]);



        // state[room] = {}
    })

});

// io.sockets.adapter.rooms.get(room).size