import axios from "axios";

export const createNote = async (newNote) => {
  try {
    const response = await axios.post(
      "/api/new-note",
      {
        ...newNote,
      },
      { withCredentials: true },
    );
    return response.data;
  } catch (err) {
    throw err.response.data;
  }
};

export const getNotes = async () => {
  try {
    const response = await axios.get("/api/notes", {
      withCredentials: true,
    });
    return response.data;
  } catch (err) {
    throw err.response.data;
  }
};

export const getNoteById = async (id) => {
  try {
    const response = await axios.get(`/api/note/${id}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (err) {
    throw err.response.data;
  }
};

export const editNote = async ({ id, updatedContent }) => {
  try {
    const response = await axios.put(
      `/api/note/edit/${id}`,
      { ...updatedContent },
      { withCredentials: true },
    );
    return response.data;
  } catch (err) {
    throw err.response.data;
  }
};

export const deleteNote = async (id) => {
  try {
    const response = await axios.delete(`/api/note/del/${id}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (err) {
    throw err.response.data;
  }
};
