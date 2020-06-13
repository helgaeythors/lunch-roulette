## Get started

To start the server execute the following commands in the command line:

**npm install** | To install dependencies.

**node server.js** | To start up the socket io server on port 8080.

## Commands

**adduser**

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
**joinroom**

The client should call this when a user joins a romm.

*Parameters*

rommcode: "the room code of the room to join, , undefined if the user is creating a new room"

The server responds by emitting "updateusers" (to all participants in the room).