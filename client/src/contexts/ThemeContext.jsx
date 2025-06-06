import { createContext, useContext, useEffect, useReducer } from "react";
import { useGetSettings } from "../features/accountSettings/useGetSettings";

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
  const { getAccountSettings, isPending } = useGetSettings();

  useEffect(() => {
    if (isPending || !getAccountSettings) return;

    // use theme from server or default
    const serverTheme = getAccountSettings?.data.colorTheme || "light";
    // Save to localStorage for future sessions
    localStorage.setItem("colorTheme", serverTheme);

    dispatch({
      type: "SET_THEME",
      payload: serverTheme,
    });

    applyTheme(serverTheme);
  }, [getAccountSettings, isPending]);

  const handleChangeTheme = (theme) => {
    dispatch({ type: "SET_THEME", payload: theme });
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
