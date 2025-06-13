import { createContext, useCallback, useContext, useReducer } from 'react';

import PropTypes from 'prop-types';

const ThemeContext = createContext();

const initialState = {
  themeColor: 'light',
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_THEME':
      return { ...state, themeColor: action.payload };

    default:
      return state;
  }
};

const ThemeProvider = ({ children }) => {
  const [{ themeColor }, dispatch] = useReducer(reducer, initialState);

  const handleServerTheme = useCallback(
    (serverTheme) => {
      dispatch({
        type: 'SET_THEME',
        payload: serverTheme,
      });

      applyTheme(serverTheme);
    },
    [dispatch]
  );

  const handleChangeTheme = useCallback(
    (theme) => {
      dispatch({ type: 'SET_THEME', payload: theme });
      applyTheme(theme);
    },
    [dispatch]
  );

  const applyTheme = (selectedTheme) => {
    const html = document.documentElement;

    if (selectedTheme === 'dark') html.classList.add('dark');
    else {
      html.classList.remove('dark');
    }
  };
  return (
    <ThemeContext.Provider value={{ themeColor, handleChangeTheme, handleServerTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined)
    throw new Error('Theme context can not be used outside theme provider');
  return context;
};

export { ThemeProvider, useTheme };

ThemeProvider.propTypes={
  children:PropTypes.node
}