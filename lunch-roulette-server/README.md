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

A callback function: which returns whether joining the room was successful or not.
Example:
```js
socket.emit("joinroom", "roomcode" function(success){
    if (success) {
        // joining the room was successful
    }
});

```

The server responds by emitting **updateusers** (to all participants in the room).

### submitsuggestion

The client should call this when a user submits a suggestion. A user can only submit one suggestion to a particular room.

*Parameters*

roomcode: "the room code the user is submitting the suggestion to"

suggestion: "the user's suggestion"

A callback function: which returns whether submitting the suggestion was successful or not.
Example:
```js
socket.emit("submitsuggestion", "roomcode", "suggestion", function(success){
    if (success) {
        // submitting the suggestion was successful
    }
});

```

The server emits **updatesuggestions** (to all participants in the room).

### showresults

The client should call this when a user, that is an operator, wants to show the results.

The server emits **results** (to all participants in the room).

### disconnect

When a user disconnects the server emits **updateusers** (to all participants in the room).
