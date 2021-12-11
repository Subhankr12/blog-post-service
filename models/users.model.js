const mongoose = require('mongoose');
const { ROLES } = require('../utils/constants');

const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: { type: String, required: true },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true,
    },
    roles: {
      type: [String],
      required: true,
      enum: Object.values(ROLES),
      default: ROLES.USER,
    },
  },
  { timestamps: true },
);

const userModel = model('users', userSchema);

module.exports = userModel;
