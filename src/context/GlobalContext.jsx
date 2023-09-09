/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */

import React from 'react';
import { useReducer } from 'react';
import { createContext, useContext, useEffect } from 'react';
import axios from 'axios';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../firebase';

const contextGlobal = createContext();

const initialDentistState = {
  dentistsList: [],
  dentist: {},
  dentistLike: JSON.parse(localStorage.getItem('dentistLikeStorage')) || [],
  dentistTheme: true,
  dentistNombre: '', // Cambio aquí
  isAuthenticated: false, // Agregar nuevo valor al estado global
  userAuth:{
    email:'',
    name:'',
    lastname:'',
    role: '',

  }
  
};

const dentistReducer = (state, action) => {
  switch (action.type) {
    case 'GET_LIST':
      return { ...state, dentistsList: action.payload };
    case 'GET_DENTIST':
      return { ...state, dentist: action.payload };

    case 'DENTIST_LIKE':
      return { ...state, dentistLike: [...state.dentistLike, action.payload] };

    case 'DENTIST_DELETE':
      return { ...state, dentistLike: action.payload };
    case 'THEME':
      return { ...state, dentistTheme: action.payload };
    case 'SET_DENTIST_NOMBRE': // Acción para establecer el nombre del producto
      return { ...state, dentistNombre: action.payload };
    
      case 'SAVE_USER_AUTH': // Acción para establecer el nombre del producto
      return { ...state, userAuth: action.payload };

      case 'SET_AUTHENTICATED': // Agregar nueva acción para establecer el estado de autenticación del usuario
      return { ...state, isAuthenticated: action.payload };
    default:
      throw new Error();
  }
};

const Context = ({ children }) => {
  const [dentistState, dentistDispatch] = useReducer(dentistReducer, initialDentistState);

  const urlList = 'http://localhost:8080/productos';

  useEffect(() => {
    axios(urlList).then((res) => dentistDispatch({ type: 'GET_LIST', payload: res.data }));
  }, [urlList]);

  useEffect(() => {
    localStorage.setItem('dentistLikeStorage', JSON.stringify(dentistState.dentistLike));
  }, [dentistState.dentistLike]);

  return (
    <contextGlobal.Provider value={{ dentistState, dentistDispatch }}>
      {children}
    </contextGlobal.Provider>
  );

};






export default Context;

export const usecontextGlobal = () => useContext(contextGlobal);
