const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
require('../models/Notes');

const Notes = mongoose.model('Notes'); // to fetch the table of notes

module.exports = (app) => {
  // fetch all notes
  app.get('/api/notes', requireLogin, async (req, res) => {
    const notes = await Notes.find({ _user: req.user.id });
    res.status(200).send({ notes });
  });

  // create new note
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

  // edit a note
  app.put('/api/note/:id', requireLogin, async (req, res) => {
    try {
      const filter = { _id: req.params.id, _user: req.user.id };
      // params.id => the document _id (selects the document where the _id === id from the param)
      // user.id => the current user logged in (makes sure that the current user can only change his document)
      // $set => updates only the fields provided in req.body to avoid overwriting unchanged data
      const updatedNote = await Notes.findOneAndUpdate(
        filter,
        { $set: req.body },
        { new: true }
      );

      // if there is an error in the id
      if (!updatedNote) res.status(404).send({ error: 'Note not found' });

      res.send({ message: 'Note updated successfully', note: updatedNote });
    } catch (err) {
      res.status(500).send({ error: 'Failed to update note' });
    }
  });

  // fetch archived notes
  app.get('/api/notes/archive', requireLogin, async (req, res) => {
    const archivedNotes = await Notes.find({
      archive: true,
      _user: req.user.id,
    });
    res.status(200).send({ notes: archivedNotes });
  });

  // delete a note
  app.delete('/api/note/del/:id', requireLogin, async (req, res) => {
    try {
      const deletedNote = await Notes.findOneAndDelete({
        _id: req.params.id,
        _user: req.user.id,
      });
      if (!deletedNote)
        res.status(404).send({ error: 'Note not found or unauthorized' });

      res.status(200).send({ message: 'Note successfully deleted' });
    } catch (err) {
      res.status(500).send('Failed to delete note');
    }
  });
};
