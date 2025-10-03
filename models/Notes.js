const mongoose = require('mongoose');
const { Schema } = mongoose;

const NoteSchema = new Schema(
  {
    content: String,
    title: String,
    tags: [String],
    lastEdited: String,
    archive: {
      type: Boolean,
      default: false,
    },
    _user: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

// To create a collection of notes (Table of notes)
mongoose.model('Notes', NoteSchema);
