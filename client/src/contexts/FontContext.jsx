import { createContext, useCallback, useContext, useReducer } from 'react';

const FontContext = createContext();

const initialState = {
  font: 'sans-serif',
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_FONT':
      return { ...state, font: action.payload };

    default:
      return state;
  }
}

const FontProvider = ({ children }) => {
  const [{ font }, dispatch] = useReducer(reducer, initialState);

  const applyFontClass = useCallback((selectedFont) => {
    const html = document.documentElement;

    html.classList.remove('font-sans', 'font-serif', 'font-mono');
    switch (selectedFont) {
      case 'sans-serif':
        html.classList.add('font-sans');
        break;
      case 'serif':
        html.classList.add('font-serif');
        break;
      case 'mono':
        html.classList.add('font-mono');
        break;
      default:
        html.classList.add('font-sans');
        break;
    }
  }, []);

  const handleFontChange = useCallback(
    (newFont) => {
      dispatch({
        type: 'SET_FONT',
        payload: newFont,
      });

      applyFontClass(newFont);
    },
    [dispatch, applyFontClass]
  );

  const handleServerTheme = useCallback(
    (serverTheme) => {
      dispatch({
        type: 'SET_THEME',
        payload: serverTheme,
      });

      handleFontChange(serverTheme);
    },
    [dispatch, handleFontChange]
  );

  return (
    <FontContext.Provider
      value={{
        font,
        handleFontChange,
        handleServerTheme,
      }}
    >
      {children}
    </FontContext.Provider>
  );
};

const useFont = () => {
  const context = useContext(FontContext);
  if (context === undefined) throw new Error('Font context can not be used outside font provider');
  return context;
};

export { FontProvider, useFont };
