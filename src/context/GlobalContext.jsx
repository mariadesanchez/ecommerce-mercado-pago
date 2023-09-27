/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */

import React from 'react';
import { useReducer } from 'react';
import { createContext, useContext, useEffect } from 'react';



const contextGlobal = createContext();

const initialProductState = {
  shipmentCost: '',
  productLike: JSON.parse(localStorage.getItem('productLikeStorage')) || [],

  
};

const productReducer = (state, action) => {
  switch (action.type) {
  

    case 'PRODUCT_LIKE':
      return { ...state, productLike: [...state.productLike, action.payload] };

    case 'PRODUCT_DELETE':
    return { ...state, productLike: action.payload };

    case 'SHIPMENT_COST':
      return { ...state,shipmentCost: action.payload };

   
    default:
      throw new Error();
  }
};

const Context = ({ children }) => {
  const [productState, productDispatch] = useReducer(productReducer, initialProductState);


  useEffect(() => {
    localStorage.setItem('productLikeStorage', JSON.stringify(productState.productLike));
  }, [productState.productLike]);

  return (
    <contextGlobal.Provider value={{ productState, productDispatch }}>
      {children}
    </contextGlobal.Provider>
  );

};

export default Context;

// eslint-disable-next-line react-refresh/only-export-components
export const usecontextGlobal = () => useContext(contextGlobal);