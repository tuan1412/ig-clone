const mongoose = require('mongoose');

const UserSchema = mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
    },
    password: String,
    oauthId: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', UserSchema);
