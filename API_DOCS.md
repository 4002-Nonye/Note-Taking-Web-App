# API Documentation

This document describes the available API endpoints for the MERN note-taking app.

## Authentication

### POST /api/login

- Logs in a user.
- **Request Body:** `{ email, password }`
- **Response:** User object or error

### POST /api/register

- Registers a new user.
- **Request Body:** `{ email, password }`
- **Response:** User object or error

---

## Notes

### GET /api/notes

- Fetch all notes belonging to the logged-in user.

### GET /api/note/:id

- Fetch a note by id belonging to the logged-in user.

### POST /api/new-note

- Create a new note.
- **Request Body:** `{ title, content, tags, archive }`

### PUT /api/note/edit/:id

- Update a note by ID.
- **Request Body (any field):** `{ title, content, tags, archive, lastEdited }`

### DELETE /api/note/del/:id

- Delete a note by ID.

---

## Archive

### GET /api/notes/archive

- Get all archived notes.

---

## Settings

### PUT /api/account/settings

- Update user settings.
- **Request Body (any of):** `{ fontTheme, colorTheme }`

---

## Password

### PUT /api/account/passwordchange

- Update user password.
- **Request Body:** `{ oldPassword, newPassword }`
- Will fail if user is registered only with Google.

---

## Notes

- All routes (except login/signup) require authentication (`requireLogin` middleware).
- Returns responses with `message`, `data`, or `error` keys.
