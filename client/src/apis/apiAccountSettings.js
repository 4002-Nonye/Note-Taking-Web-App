import axios from "axios";

export const getAccountSettings = async () => {
  try {
    const response = await axios.get("/api/account/settings", {
      withCredentials: true,
    });
    return response.data;
  } catch (err) {
    throw err.response.data;
  }
};

export const editAccountSettings = async ({ fontTheme, colorTheme }) => {
  try {
    const response = await axios.put(
      "/api/account/settings",
      {
        fontTheme,
        colorTheme,
      },
      {
        withCredentials: true,
      },
    );
   
    return response.data;
  } catch (err) {
    throw err.response.data;
  }
};
