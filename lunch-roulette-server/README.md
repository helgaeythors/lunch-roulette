## Get started

To start the server execute the following commands in the command line:

**npm install** | To install dependencies.

**node server.js** | To start up the socket io server on port 8080.

## Commands

### adduser

The client should call this when a user joins the application, after choosing a nickname.

*Parameters*

nickname: "the nickname chosen by the user (string)"

A callback function: which accepts a single boolean parameter, stating if the username is available or not.
Example:
```js
socket.emit("newUser", "myName", function(available){
    if (available){
        // the username "myName" is not taken
    }
});

```

### createroom

The client should call this when a user jcreates a romm.

*Parameters*

A callback function: which returns the generated roomcode of the new room.
Example:
```js
socket.emit("createroom", function(roomcode){
    // the roomcode of the newly created room
});

```
The server emits **updateusers** (to all participants in the room).


### joinroom

The client should call this when a user joins a romm.

*Parameters*

rommcode: "the room code of the room to join"

A callback function: which returns wether joinin the room was successful or not.
Example:
```js
socket.emit("joinroom", function(success){
    if (success) {
        // joinin the room was successful
    }
});

```

The server responds by emitting **updateusers** (to all participants in the room).
