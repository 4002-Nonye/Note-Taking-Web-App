import { createContext, useContext, useEffect, useReducer } from 'react';

import PropTypes from 'prop-types';

const ModalContext = createContext();

const initialState = {
  showModal: false,
  action: '',
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SHOW_MODAL':
      return { ...state, showModal: true, action: action.payload };
    case 'HIDE_MODAL':
      return { ...state, showModal: false, action: '' };
    default:
      state;
  }
};

function ModalProvider({ children }) {
  const [{ showModal, action }, dispatch] = useReducer(reducer, initialState);

  const handleShowModal = (action) => {
    dispatch({
      type: 'SHOW_MODAL',
      payload: action,
    });

    document.body.classList.add('no-scroll');
  };

  const handleHideModal = () => {
    dispatch({
      type: 'HIDE_MODAL',
    });
    document.body.classList.remove('no-scroll');
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') handleHideModal();
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <ModalContext.Provider
      value={{
        showModal,
        handleShowModal,
        handleHideModal,
        action,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}
const useModal = () => {
  const context = useContext(ModalContext);
  if (context === undefined) throw new Error('can not use ModalProvider outside ModalContext');
  return context;
};

export { ModalProvider,useModal };

ModalProvider.propTypes={
  children:PropTypes.node
}