import { createContext, useContext, useEffect, useReducer } from "react";

const FontContext = createContext();

const initialState = {
  font: "sans-serif",
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_FONT":
      return { ...state, font: action.payload };

    default:
      return state;
  }
}

const FontProvider = ({ children }) => {
  const [{ font }, dispatch] = useReducer(reducer, initialState);

  // persist font
  useEffect(() => {
    const savedFont = localStorage.getItem("fontTheme") || "sans-serif";
    applyFontClass(savedFont);
    dispatch({
      type: "SET_FONT",
      payload: savedFont,
    });

 
  }, []);

  const handleFontChange = (newFont) => {
    dispatch({
      type: "SET_FONT",
      payload: newFont,
    });

    localStorage.setItem("fontTheme", newFont);
    applyFontClass(newFont)
  };

  // Apply font class to HTML element
  const applyFontClass = (selectedFont) => {
    const html = document.documentElement;

    html.classList.remove("font-sans", "font-serif", "font-mono");
    switch (selectedFont) {
      case "sans-serif":
        html.classList.add("font-sans");
        break;
      case "serif":
        html.classList.add("font-serif");
        break;
      case "mono":
        html.classList.add("font-mono");
        break;

      default:
        html.classList.add("font-sans");
        break;
    }
  };

  return (
    <FontContext.Provider
      value={{
        font,
        handleFontChange,
        
      }}
    >
      {children}
    </FontContext.Provider>
  );
};

const useFont = () => {
  const context = useContext(FontContext);
  if (context === undefined)
    throw new Error("Font context can not be used outside font provider");
  return context;
};

export { FontProvider, useFont };
