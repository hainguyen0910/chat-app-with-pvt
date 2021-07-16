const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      min: 5,
    },
    password: {
      type: String,
      required: true,
    },
    fullname: {
      type: String,
      required: true,
      min: 5,
    },
    sex: {
      type: String,
      enum: ['male', 'female', 'unknown'],
      default: 'unknown'
    },
    avatar: {
      type: String,
      default:
        'https://res.cloudinary.com/pvt-cloud/image/upload/c_thumb,h_300,w_300/v1626445822/chat-app-with-pvt/avatars/defaults/unknown_cctkxu.jpg',
    },
    birthday: {
      type: Date,
      default: Date.now,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

userSchema.pre('save', function (next) {
  const user = this;
  if (!user.isModified('password')) return next();

  const salt = 10;
  bcrypt.hash(user.password, salt, (err, hash) => {
    if (err) return next(err);
    user.password = hash;
    next();
  });
});

userSchema.methods.comparePassword = function (password, cb) {
  bcrypt.compare(password, this.password, (err, isMatch) => {
    if (err) return cb(err);
    return cb(null, isMatch);
  });
};

const User = mongoose.model('User', userSchema);

module.exports = User;
