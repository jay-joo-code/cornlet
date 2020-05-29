const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = Schema({
  uid: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  photoURL: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  bm: {
    listings: {
      type: [{
        type: Schema.Types.ObjectId,
        ref: 'Listing',
      }],
      default: [],
    },
    notif: {
      type: Boolean,
      default: false,
    },
  },
  chatrooms: {  // add only
    type: [{
      type: Schema.Types.ObjectId,
      ref: 'Chatroom',
    }],
    default: []
  },
  createdAt: {
    type: Date,
    required: true,
    default: new Date,
  },
});

module.exports = mongoose.model('User', userSchema);
