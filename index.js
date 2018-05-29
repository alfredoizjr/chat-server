var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/chats');
 
  // schema 

var chatSchema = mongoose.Schema({
     name:{type:String},
     message:{type:String},
     created: {type: Date, default: Date.now}
  });

var Chat = mongoose.model('Chat',chatSchema);

io.sockets.on('connection', (socket) => {

Chat.find({},(err, oldMessage) =>{
      io.emit('old-message', oldMessage);
  });

  socket.on('add-message', (data) => {
    let setChat = new Chat(data);
    setChat.save((err)=>{
      if(err) throw err;
    });
    io.emit('message', data);
  });

});


 
var port = process.env.PORT || 3000;
 
http.listen(port, function(){
   console.log('listening in http://localhost:' + port);
});