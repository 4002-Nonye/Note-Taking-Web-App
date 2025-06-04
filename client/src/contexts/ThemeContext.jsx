import { createContext, useContext, useEffect, useReducer } from "react";

const ThemeContext = createContext();

const initialState = {
  themeColor: "light",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_THEME":
      return { ...state, themeColor: action.payload };

    default:
      return state;
  }
};

const ThemeProvider = ({ children }) => {
  const [{ themeColor }, dispatch] = useReducer(reducer, initialState);

  // persist theme to local storage
  useEffect(() => {
    const savedTheme = localStorage.getItem("colorTheme") || "light";
    applyTheme(savedTheme); // apply theme on initial load
    dispatch({
      type: "SET_THEME",
      payload: savedTheme,
    });
  }, []);

  const handleChangeTheme = (theme) => {
    dispatch({ type: "SET_THEME", payload: theme });
    localStorage.setItem("colorTheme", theme);
    applyTheme(theme); //apply theme when user changes it
  };
  return (
    <ThemeContext.Provider value={{ themeColor, handleChangeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

const applyTheme = (selectedTheme) => {
  const html = document.documentElement;
  // Always remove first to avoid duplicate classes
  html.classList.remove("dark", "light");
  if (selectedTheme === "dark") html.classList.add("dark");
  else {
    html.classList.remove("dark");
  }
};

const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined)
    throw new Error("Theme context can not be used outside theme provider");
  return context;
};

export { ThemeProvider, useTheme };
