import axios from "axios";

export async function loginUser(data) {
  try {
    await axios.post("/api/login", data);
  } catch (err) {
    if (err) console.log(err.response.data.error);
  }
}
