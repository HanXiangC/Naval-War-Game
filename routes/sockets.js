
 
var connectionList = {};
var userIDList = [];
var rooms = 1;

const express = require('express');
const app = express();
const userController = require('../controllers/user');

module.exports = (io) => {

  io.on('connection', (socket) => {


/* User connection operations */

    var client = {
      socketID: socket.id,
      userID: socket.request.user._id,
      userDetails: socket.request.user
    }

    var userID = socket.request.user._id;

    if(connectionList[userID] == undefined){
      userIDList.push(userID);
    }

    connectionList[userID] = client;

    var clientDetails = {
      clientIDs: userIDList,
      clientList: connectionList
    }

    io.emit('newUserConnected', clientDetails);

/* User disconnection operations */

  socket.on('client disconnect', () => {
    console.log("refreshed");
  });

/* User matchmaking operations */

    socket.on('send invite', (data) => {

      io.to(connectionList[data].socketID).emit('receive invite', socket.request.user._id);
      io.to(connectionList[socket.request.user._id].socketID).emit('sent invite', data);

    });

    socket.on('game accepted', (data) => {
    
      var gamePackage = {
        player1: data,
        player2: socket.request.user._id
      }

      io.to(connectionList[data].socketID).emit('start game', gamePackage);
      io.to(connectionList[socket.request.user._id].socketID).emit('start game', gamePackage);

    });


    socket.on('ready', (data) => {
    
      socket.join("Room " + rooms); 
      io.in("Room " + rooms).emit('room entered', "succulent");
    });

    socket.on('user ready', (data) => {
      readyCheck += 1;
      io.in("Room " + rooms).emit('room entered', "still in room");
      if(readyCheck == 2){
        readyCheck = 0;
        io.in("Room " + rooms).emit('begin game', data);
      }
    });

    socket.on('game exit', () => {
      userController.matchLost(socket.request.user);
      io.in("Room " + rooms).emit('reload');
    });
/* User gane control operations */

    socket.on('keyCode', (data) => {

      var userID = socket.request.user._id;
      console.log(data + " : " + userID);
      if (data == 37) {
          io.in("Room " + rooms).emit('left', userID);
      } else if (data == 38) {
          io.in("Room " + rooms).emit('up', userID);
      } else if (data == 39) {
          io.in("Room " + rooms).emit('right', userID);
      } else if (data == 40) {
          io.in("Room " + rooms).emit('down', userID);
      }       
    });

    socket.on('up', (data) => {

      var userID = socket.request.user._id;

      if (data == 37) {
          io.in("Room " + rooms).emit('stopLeft', userID);
      } else if (data == 38) {
          io.in("Room " + rooms).emit('jump', userID);
      } else if (data == 39) {
          io.in("Room " + rooms).emit('stopRight', userID);
      } else if (data == 40) {
          io.in("Room " + rooms).emit('crouch', userID);
      }       
    });


    socket.on('newMessage', (data) => {
      var test = {
        user: socket.request.user,
        message: data
      };



      io.emit('broadcast message', test);
    });

  });


}
