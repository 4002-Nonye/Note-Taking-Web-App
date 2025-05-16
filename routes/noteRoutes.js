const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
require('../models/Notes');

const Notes = mongoose.model('Notes'); // to fetch the table of notes

module.exports = (app) => {
  app.post('/api/new-note', requireLogin, async (req, res) => {
    const { content, title, lastEdited, tags } = req.body;

    try {
      const newNote = new Notes({
        content,
        title,
        lastEdited,
        tags: tags.split(','), // returns an array of string
        _user: req.user.id,
      });

      await newNote.save();
      res.status(200).send({
        message: 'Note successfully created',
        note: newNote,
      });
    } catch (err) {
      res.status(500).send({
        error: 'Failed to create note',
      });
    }
  });

  app.put('/api/note/:id', requireLogin, async (req, res) => {
    try {
      const filter = { _id: req.params.id, _user: req.user.id };
      // params.id => the document _id (selects the document where the _id === id from the param)
      // user.id => the current user logged in (makes sure that the current user can only change his document)
      const { content, title, lastEdited, tags } = req.body;
      const updatedNote = await Notes.findOneAndUpdate(
        filter,
        { content, title, lastEdited, tags },
        { new: true }
      );

      // if there is an error in the id
      if (!updatedNote) res.status(404).send({ error: 'Note not found' });

      res.send({ message: 'Note updated successfully', note: updatedNote });
    } catch (err) {
      res.status(500).send({ error: 'Failed to update note' });
    }
  });
};
