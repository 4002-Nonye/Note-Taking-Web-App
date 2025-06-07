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
