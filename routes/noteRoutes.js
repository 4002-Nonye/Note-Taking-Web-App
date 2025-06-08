const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const sanitizeHtml = require('../utils/sanitizeHtml');

require('../models/Notes');

const Notes = mongoose.model('Notes'); // to fetch the table of notes

// select('-_user -__v')=> excludes the __v and _user field

module.exports = (app) => {
  // fetch all notes
  app.get('/api/notes', requireLogin, async (req, res) => {
    const notes = await Notes.find({ _user: req.user.id }).select(
      '-_user -__v'
    );
    res.status(200).send({ notes });
  });

  // fetch archived notes
  app.get('/api/notes/archive', requireLogin, async (req, res) => {
    const archivedNotes = await Notes.find({
      archive: true,
      _user: req.user.id,
    }).select('-_user -__v');
    res.status(200).send({ notes: archivedNotes });
  });

  // fetch note by id
  app.get('/api/note/:id', requireLogin, async (req, res) => {
    try {
      const note = await Notes.findOne({
        _id: req.params.id,
        _user: req.user.id,
      }).select('-_user -__v');
      if (!note) {
        return res.status(404).send({ error: 'Note not found' });
      }
      res.status(200).send({ data: note });
    } catch (err) {
      res.status(500).send({
        error: 'Failed to fetch note',
      });
    }
  });

  // create new note
  app.post('/api/new-note', requireLogin, async (req, res) => {
    const { content, title, lastEdited, tags } = req.body;

    // sanitize content to prevent xss attacks
    const sanitizedContent = sanitizeHtml(content);
    console.log(sanitizedContent);

    try {
      const newNote = new Notes({
        content: sanitizedContent,
        title,
        lastEdited,
        tags,
        _user: req.user.id,
      });

      await newNote.save();

      const { __v, ...safeToSendNotes } = newNote._doc;
      res.status(200).send({
        message: 'Note successfully created',
        note: safeToSendNotes,
      });
    } catch (err) {
      res.status(500).send({
        error: 'Failed to create note',
      });
    }
  });

  // edit a note
  app.put('/api/note/edit/:id', requireLogin, async (req, res) => {
    try {
      const filter = { _id: req.params.id, _user: req.user.id };
      // params.id => the document _id (selects the document where the _id === id from the param)
      // user.id => the current user logged in (makes sure that the current user can only change his document)
      // $set => updates only the fields provided in req.body to avoid overwriting unchanged data
      const updatedNote = await Notes.findOneAndUpdate(
        filter,
        { $set: req.body },
        { new: true }
      ).select(' -__v');

      // if there is an error in the id
      if (!updatedNote) res.status(404).send({ error: 'Note not found' });

      res.send({ message: 'Note updated successfully', note: updatedNote });
    } catch (err) {
      res.status(500).send({ error: 'Failed to update note' });
    }
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
