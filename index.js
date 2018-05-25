var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.send('good conection');
});

io.on('connection', function(socket){

    socket.on('set-nickname', (nickname) => {
        socket.nickname = nickname;
        io.emit('users-changed', {user: nickname, event: 'joined'});    
      });

    socket.on('add-message', (message) => {
        io.emit('message', {text: message.text, from: socket.nickname, created: new Date()});    
      });

    });

http.listen(3000, function(){
  console.log('listening on *:3000');
});
