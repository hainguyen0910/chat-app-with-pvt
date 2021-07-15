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
const Message = require('./models/Message');

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

const corsServerOptions = {
  origin: process.env.REACT_APP_URL,
  optionsSuccessStatus: 200,
};

corsSocketOptions = {
  cors: true,
  origins: [process.env.REACT_APP_URL],
};

const io = socketio(server, corsSocketOptions);

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
  // connect to socket
  console.log('Client connected...');
  //join room
  client.on('join', (roomId) => {
    client.join(roomId);
  });

  // get all message
  client.on('sendAllMessages', async (roomId) => {
    const messages = await Message.find({ roomId }).populate(
      'sender',
      'fullname username -_id'
    );

    io.to(roomId).emit('receiveAllMessages', messages);
  });

  // new message
  client.on('sendNewMessage', async (data) => {
    const { roomId, message: content } = data;
    const newMessage = await Message.create({
      roomId,
      message: content,
      sender: socket.user._id,
    });
    const message = await Message.findById(newMessage._id).populate(
      'sender',
      'fullname username -_id'
    );
    io.to(roomId).emit('receiveNewMessage', message);
  });

  //disconnect socket client
  client.on('disconnect', () => {
    console.log('disconnected');
  });
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors(corsServerOptions));

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

server.listen(process.env.PORT || 8080);

module.exports = app;
