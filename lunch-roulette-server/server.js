import { customAlphabet } from 'nanoid';
// with this setup there are ~2 days needed, in order to have a 1% probability of at least one collision
const nanoid = customAlphabet('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz!@', 6);

import express from 'express';
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

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
            users[username] = { username: socket.username, channels: {}, socket: this };
            // username is available
            fn(true);
        }
        else {
             // the username is not available
            fn(false);
        }
    });

    // when a user creates a room
    socket.on('createroom', function(fn) {
        // create a room
        let newRoomCode = nanoid();
        rooms[newRoomCode] = new Room(newRoomCode);
        // op the user
        rooms[newRoomCode].ops[socket.username] = socket.username;
        // keep track of the room in the user object
		users[socket.username].channels[newRoomCode] = { roomcode: newRoomCode };
        fn(newRoomCode);
        io.sockets.emit('updateusers', newRoomCode, rooms[newRoomCode].users, rooms[newRoomCode].ops);
    });

    // when a user joins a room
    socket.on('joinroom', function(roomcode, fn) {
        // check if the room does not exists
        if (rooms[roomcode] === undefined) {
            fn(false);
        } else {
            // add the user to the room
            rooms[roomcode].addUser(socket.username);
            // keep track of the room in the user object
            users[socket.username].channels[roomcode] = { roomcode: roomcode };
            fn(true);
            io.sockets.emit('updateusers', roomcode, rooms[roomcode].users, rooms[roomcode].ops);
        }
    });

    // when a user disconnects
	socket.on('disconnect', function() {
        // if the client had a username then clean up
        if (socket.username) {
            for (var roomcode in users[socket.username].channels) {
                // remove the user from users or ops lists in the rooms he's registered in
				delete rooms[roomcode].users[socket.username];
				delete rooms[roomcode].ops[socket.username];
				io.sockets.emit('updateusers', rooms.roomcode, rooms[roomcode].users, rooms[roomcode].ops);
			}
			// remove the user from the global user list
			delete users[socket.username];
        }
    });

    // when a user submits a suggestion
    socket.on('submitsuggestion', function(roomcode, suggestion, fn) {

        // check if the user had already submitted a suggestion
        if (users[socket.username].channels[roomcode].suggestion) {
            fn(false);
        } else {
            // check if the suggestion is valid
            if (suggestion.length > 75) {
                fn(false, "Kindly keep your suggestion concise");
                return;
            }

            // add the suggestion to the users objects
            users[socket.username].channels[roomcode].suggestion = suggestion;
            
            // add the suggestion to the rooms array of suggestioins
            rooms[roomcode].suggestions.push(suggestion);

            // emit changes
            fn(true);
            io.sockets.emit('updatesuggestions', roomcode, rooms[roomcode].suggestions);
        }
    });

    // when an operator decides to show the results
    socket.on('showresults', function(roomcode) {
        // find a suggestion to send as the results
        let results = rooms[roomcode].suggestions[Math.floor(Math.random() * rooms[roomcode].suggestions.length)];

        io.sockets.emit('results', roomcode, results);
    });

});

// Room class/object
class Room {
    constructor(roomcode) {
        this.roomcode = roomcode;
        this.users = {};
        this.ops = {};
        this.suggestions = [];
        this.addUser = function (user) {
            (user !== undefined) ? this.users[user] = user : console.log("ERROR: error adding user");
        };
    }
}

