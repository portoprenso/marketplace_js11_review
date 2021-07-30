import axios from "axios";
import React, { createContext, useContext, useReducer } from "react";
import { useHistory } from "react-router";
import { ACTIONS, JSON_API_PRODUCTS } from "../helpers/consts";

export const productContext = createContext();

export const useProducts = () => {
  return useContext(productContext)
}

const INIT_STATE = {
  productsData: [],
  productDetails: {},
};

console.log('main')

const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case ACTIONS.GET_PRODUCTS:
      return { ...state, productsData: action.payload };
    case ACTIONS.GET_PRODUCT_DETAILS:
      return { ...state, productDetails: action.payload };
    default:
      return state;
  }
};

const ProductContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);
  const history = useHistory()
  const getProductsData = async () => {
    const { data } = await axios(JSON_API_PRODUCTS)
    dispatch({
      type: ACTIONS.GET_PRODUCTS,
      payload: data
    })
  }

  const getProductDetails = async (id) => {
    const { data } = await axios(`${JSON_API_PRODUCTS}/${id}`)
    dispatch({
      type: ACTIONS.GET_PRODUCT_DETAILS,
      payload: data
    })
  }

  const values = {
    history,
    productsData: state.productsData,
    productDetails: state.productDetails,
    getProductsData,
    getProductDetails,
  }

  return <productContext.Provider value={values}>
    {children}
  </productContext.Provider>;
};

export default ProductContextProvider;
