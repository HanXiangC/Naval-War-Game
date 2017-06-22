
var newGame;
var userObject = {};
var userIDs = [];

$(document).ready(function() {

  socket = io.connect('/', {secure: true, transports: ['websocket']});

  function processData(connectionObject){
    userIDs = connectionObject.clientIDs;
    userObject = connectionObject.clientList;
  };



  socket.on('newUserConnected', function (data) {
      processData(data);

    $('#lobbyList').empty();

      for(var i = 0; i < userIDs.length; i++){

        var tpl = $('#playerNameTemplate').html();
        tpl = tpl.replace('{{userName}}', userObject[userIDs[i]].userDetails.username);
        tpl = tpl.replace('{{rank}}', 'Seventh Kyu');

        $('#lobbyList').append(tpl);


      };

      var lobbyChildren = $('#lobbyList').children();
      for(var i = 0; i < lobbyChildren.length; i++){
        var a = $(lobbyChildren[i]);
        a.attr('id', userIDs[i]);
      }

      for(var i = 0; i < lobbyChildren.length; i++){

        $('#' + userIDs[i] + " button").on('click', function(){
          socket.emit('send invite', $(this).parent().attr('id'))
        });
      }
      
  });


  socket.on('sent invite', function (data) {
    $('#' + data + " button").text("Invite Sent");
  });

  socket.on('receive invite', function (data) {

    var tpl = $('#gameInviteTemplate').html();
    tpl = tpl.replace('{{userName}}', userObject[data].userDetails.username);

    $('#gameInvite').append(tpl);  

    $('#accept').on('click', function(){
      socket.emit('game accepted', data);
    });

  });

  socket.on('start game', function (data) {
    $('#characterElements').empty();

    var tpl = $('#gameScreenTemplate').html();

    $('#characterElements').append(tpl);
    socket.emit('ready', data);

    $('#ready').on('click', function(){
      socket.emit('user ready', data);
    });

    $('#quit').on('click', function(){
      socket.emit('game exit');
    });

  });

  socket.on('reload', function (data) {
    location.reload();
  });

  socket.on('begin game', function (data) {
    newGame = new gameObject(data);
  });


  //Populate player list

  socket.on('right', function (data) {
    newGame.moveRight(data);
  });
  

  // Room Creation

  $('#createRoom').on('click', function(){
     socket.emit('create');
  });




  $(document).keydown(function(e) {
    socket.emit('keyCode', e.keyCode);
  });

  $(document).keyup(function(e) {
    socket.emit('up', e.keyCode);
  });


  socket.on('left', function (data) {
    newGame.moveLeft(data);
  });

 
  socket.on('stopLeft', function (data) {
    newGame.stopLeft(data);
  });

  socket.on('right', function (data) {
    newGame.moveRight(data);
  });

  socket.on('stopRight', function (data) {
    newGame.stopRight(data);
  });

  // Chat Functions

  socket.on('broadcast message', function (data) {
    var msg = $('<div>').text(data.user.username + ": " + data.message);
    $('#messageBox').append(msg);

  });

  $('#chat button').on('click', function(e){
      e.preventDefault();
      var message = $('#chat input').val();
      socket.emit('newMessage', message);
      $('#chat input').val('');
  });

});

