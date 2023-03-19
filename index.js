
const express=require('express');
const socket=require("socket.io");
const path=require("path");
const Port=8080;

const app=express();
app.use(express.static(path.join(__dirname, "./public")));

app.get("/", function(req,res){
    res.sendFile(__dirname + "./public/index.html");
});
const server =app.listen(Port,function (){
    console.log("Server is listening to  Port 8080");
});

const io=socket(server,{cors:{origin:"*"}});

const users={};

io.on("connection", socket=>{
    socket.on("new-user",name=>{
        console.log("New User",name);
        users[socket.id]=name;
        socket.broadcast.emit("user-join",name);
    });

socket.on("send",message =>{
    socket.broadcast.emit("recieve",{message:message,name:users[socket.id]});

})  ;
 socket.on("disconnect",message =>{
    socket.broadcast.emit("left",users[socket.id]);
    delete users[socket.id];
 }) ;
})


// const express = require('express');
// const socket = require('socket.io');
// const path = require('path');
// const PORT = 8080;

// const app = express();
// app.use(express.static(path.join(__dirname, './public')));

// app.get('/', function(req,res){
//     res.sendFile(__dirname + './public/index.html');
// })

// const server = app.listen(PORT, function(){
//     console.log(`Server is running at http://localhost:${PORT}`)
// });

// const io = socket(server, {cors: {origin : "*"}});

// const users = {};

// io.on('connection', socket => {
//     socket.on('new-user-joined', name => {
//         console.log('New User', name);
//         users[socket.id] = name;
//         socket.broadcast.emit('user-joined', name);
//     });

//     socket.on('send', message => {
//         socket.broadcast.emit('recieve', {message: message, name: users[socket.id]});
//     });

//     socket.on('disconnect', message => {
//         socket.broadcast.emit('left', users[socket.id]);
//         delete users[socket.id];
//     });
// })