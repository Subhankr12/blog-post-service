const mongoose = require('mongoose');

const { Schema, model } = mongoose;
const { ObjectId } = Schema.Types;

const blogSchema = new Schema(
  {
    title: { type: String, requird: true },
    content: { type: String },
    userId: { type: ObjectId, ref: 'users' },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true },
);

// for efficient filtering
blogSchema.index({ title: 1 });
blogSchema.index({ author: 1 });

const blogModel = model('blogs', blogSchema);

module.exports = blogModel;
