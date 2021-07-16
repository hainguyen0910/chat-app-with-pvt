const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema(
  {
    roomId: {
      type: String,
      trim: true,
      required: true,
    },
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    // receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    message: {
      type: String,
      trim: true,
      minlength: 1,
    },
    // read: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
