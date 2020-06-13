const shortid = require('shortid');

const express = require('express'),
    app = express(),
    http = require('http').Server(app),
    io = require('socket.io')(http);

http.listen(8080, function () {
	console.log('Listening on 8080');
});

// store room in an object
let rooms = {};
// global user object, since we want to know what rooms each user is in etc.
let users = {};

io.on('connection', function (socket) {

    socket.on('newuser', function(username, fn) {
        // check if username is avaliable
        if (users[username] === undefined && username.toLowerCase != "server" && username.length < 21) {
            socket.username = username;

            // store user object in global user list
            users[username] = { username: socket.username, room: {}, socket: this };
            fn(true); // callback, user name was available
        }
        else {
            fn(false); // callback, it wasn't available
        }
    });

    // when a user joins the server
    socket.on('joinroom', function(roomcode) {
        // check if the room does not exists
        if (rooms[roomcode] === undefined) {
            // create a room
            let newRoomCode = shortid.generate();
            rooms[newRoomCode] = new Room(newRoomCode);
            rooms[newRoomCode].ops[socket.username] = socket.username;
            io.sockets.emit('updateusers', newRoomCode, rooms[newRoomCode].users, rooms[newRoomCode].ops);
        } else {
            // add the user to the room
            rooms[room].addUser(socket.username);
            io.sockets.emit('updateusers', roomcode, rooms[roomcode].users, rooms[roomcode].ops);
        }
    });

});

// Room class/object
class Room {
    constructor(roomcode) {
        this.roomcode = roomcode;
        this.users = {};
        this.ops = {};
        this.addUser = function (user) {
            (user !== undefined) ? this.users[user] = user : console.log("ERROR: error adding user");
        };
    }
}

