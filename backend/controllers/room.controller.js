const status = require('http-status');
const shortId = require('shortid');
const Room = require('../models/Room');

shortId.characters(
  '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@'
);

module.exports.get = async (req, res) => {
  const rooms = await Room.find({
    members: { $in: [req.userId] },
  }).sort({ updatedAt: -1 });

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
    const room = await Room.create({
      name,
      members: [req.userId],
      roomId: shortId.generate(),
    });

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
    const room = await Room.findOne({ roomId });
    if (!room) {
      return res.status(status.NOT_FOUND).json({
        message: 'Room not found',
      });
    }
    room.set({ members: [...room.members, req.userId] });
    await room.save();

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
