const status = require('http-status');
const { indexOf } = require('lodash');
const shortId = require('shortid');
const Room = require('../models/Room');

shortId.characters(
  '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@'
);

module.exports.get = async (req, res) => {
  const rooms = await Room.find({
    members: { $in: [req.userId] },
  })
    .sort({ updatedAt: -1 })
    .populate('members', 'fullname username sex avatar birthday _id');

  return res.json({ rooms });
};

module.exports.create = async (req, res) => {
  const { name } = req.body;
  while (true) {
    const randomId = shortId.generate();
    const checkRandomId = await Room.findOne({ roomId: randomId });
    if (!checkRandomId) break;
  }
  try {
    let room = await Room.create({
      name,
      members: [req.userId],
      roomId: shortId.generate(),
    });

    room = await Room.findById(room._id).populate(
      'members',
      'fullname username sex avatar birthday _id'
    );

    return res.json({ room });
  } catch (err) {
    return res.status(status.INTERNAL_SERVER_ERROR).json({
      message: err.message,
    });
  }
};

module.exports.join = async (req, res) => {
  const { roomId } = req.body;

  try {
    let room = await Room.findOne({ roomId });
    if (!room) {
      return res.status(status.NOT_FOUND).json({
        message: 'Room not found',
      });
    }

    if (room.members.includes(req.userId)) {
      return res.status(status.BAD_REQUEST).json({
        message: 'You have joined this room!',
      });
    }

    room.set({ members: [...room.members, req.userId] });
    await room.save();

    room = await Room.findOne({ roomId }).populate(
      'members',
      'fullname username sex avatar birthday _id'
    );

    return res.json({ room });
  } catch (err) {
    return res.status(status.INTERNAL_SERVER_ERROR).json({
      message: err.message,
    });
  }
};

module.exports.leave = async (req, res) => {
  const { roomId } = req.params;
  try {
    let room = await Room.findOne({ roomId });
    if (!room) {
      return res.status(status.NOT_FOUND).json({
        message: 'Room not found',
      });
    }

    const indexOfCurrentUser = room.members.findIndex(
      (member) => member == req.userId
    );
    if (indexOfCurrentUser === -1) {
      return res.status(status.BAD_REQUEST).json({
        message: "You haven't joined this room!",
      });
    }
    room.set({
      members: [
        ...room.members.splice(0, indexOfCurrentUser),
        ...room.members.splice(indexOfCurrentUser + 1),
      ],
    });
    await room.save();

    room = await Room.findOne({ roomId }).populate(
      'members',
      'fullname username sex avatar birthday _id'
    );

    return res.json({ room });
  } catch (err) {
    return res.status(status.INTERNAL_SERVER_ERROR).json({
      message: err.message,
    });
  }
};

module.exports.getById = async (req, res) => {
  const { roomId } = req.params;
  try {
    const room = await Room.findOne({ roomId }).populate(
      'members',
      'fullname username sex avatar birthday _id'
    );

    if (!room) {
      return res.status(status.NOT_FOUND).json({
        message: 'Room not found',
      });
    }
    return res.json({ room });
  } catch (err) {
    return res.status(status.INTERNAL_SERVER_ERROR).json({
      message: err.message,
    });
  }
};

module.exports.search = async (req, res) => {
  const { q } = req.body;

  const rooms = await Room.find({
    name: new RegExp(`.*${q}.*`),
    members: { $nin: [req.userId] },
  });

  return res.json({ rooms });
};
