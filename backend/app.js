require('dotenv').config();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const createError = require('http-errors');
const express = require('express');
const socket_io = require('socket.io');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const socketio = require('socket.io');
const User = require('./models/User');

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

// api route
const apiRoute = require('./routes/apis');

const app = express();

const server = require('http').createServer(app);
corsOptions = {
  cors: true,
  origins: ['http://localhost:3000'],
};
const io = socketio(server, corsOptions);

io.use(async (socket, next) => {
  if (socket.handshake.query.token && socket.handshake.query.token) {
    const decoded = jwt.verify(
      socket.handshake.query.token,
      process.env.JWT_SECRET
    );
    const user = await User.findById(decoded.id);
    socket.user = user;
    next();
  } else {
    next(new Error('Authentication error'));
  }
}).on('connection', (client) => {
  console.log('Client connected...');
  client.on('join', (roomId) => {
    console.log(roomId);
    client.join(roomId);
  });

  client.on('message', (data) => {
    client.emit('thread', data);
    client.broadcast.emit('thread', data);
  });

  client.on('disconnect', () => {
    console.log('disconnected');
  });
});
// io.use((socket, next) => {
//   if (socket.handshake.query && socket.handshake.query.token) {
//     const token = socket.handshake.query.token.split(' ')[1];
//     jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
//       if (err) return next(new Error('Authentication error'));
//       socket.userData = decoded;
//       next();
//     });
//   } else {
//     next(new Error('Authentication error'));
//   }
// }).on('connection', (socket) => {
//   // Connection now authenticated to receive further events
//   socket.join(socket.userData.userId);
//   io.in(socket.userData.userId).clients((err, clients) => {
//     userController.changeStatus(socket.userData.userId, clients, io);
//     //console.log(clients);
//   });
//   socket.on('typing', (data) => {
//     socket.to(data.userId).emit('typing', { roomId: data.roomId });
//   });
//   socket.on('stoppedTyping', (data) => {
//     socket.to(data.userId).emit('stoppedTyping', { roomId: data.roomId });
//   });
//   socket.on('disconnect', () => {
//     socket.leave(socket.userData.userId);
//     io.in(socket.userData.userId).clients((err, clients) => {
//       userController.changeStatus(socket.userData.userId, clients, io);
//       //console.log(clients);
//     });
//   });
// });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors(corsOptions));

app.use('/', indexRouter);
app.use('/users', usersRouter);
//api route
app.use('/api', apiRoute);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

server.listen(8081);

module.exports = app;
