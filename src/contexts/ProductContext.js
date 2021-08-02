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
  cart: []
};

const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case ACTIONS.GET_PRODUCTS:
      return { ...state, productsData: action.payload };
    case ACTIONS.GET_PRODUCT_DETAILS:
      return { ...state, productDetails: action.payload };
    case ACTIONS.GET_CART:
      return { ...state, cart: action.payload };
    default:
      return state;
  }
};

const ProductContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);
  const history = useHistory()
  const getProductsData = async () => {
    const search = new URLSearchParams(history.location.search)
    history.push(`${history.location.pathname}?${search.toString()}`)
    const { data } = await axios(`${JSON_API_PRODUCTS}/${window.location.search}`)
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

  const addProduct = async (product) => {
    const data = await axios.post(JSON_API_PRODUCTS, product)
    getProductsData()
  }

  const deleteProduct = async (id) => {
    const data = await axios.delete(`${JSON_API_PRODUCTS}/${id}`)
    getProductsData()
  }

  const saveEditedProduct = async (id, editedProduct) => {
    const data = await axios.patch(`${JSON_API_PRODUCTS}/${id}`, editedProduct)
    history.push('/')
  }

  const getCart = () => {
    let cart = JSON.parse(localStorage.getItem('cart'))
    if (!cart){
      localStorage.setItem('cart', JSON.stringify({
        products: [],
        totalPrice: 0
      }))
      cart = {
        products: [],
        totalPrice: 0
      }
    }
    dispatch({
      type: ACTIONS.GET_CART,
      payload: cart
    })
  }

  const addProductToCart = (product) => {
    let cart = JSON.parse(localStorage.getItem('cart'))
    if (!cart){
      cart = {
        products: [],
        totalPrice: 0
      }
    }
    let newProduct = {
      item: product,
      count: 1,
      subPrice: 0
    }

    let productToFind = cart.products.filter(item => item.item.id === product.id)
    console.log(productToFind)
    if(productToFind.length == 0) {
      cart.products.push(newProduct)
    } else {
      cart.products = cart.products.filter(item => item.item.id !== product.id)
    }
    localStorage.setItem('cart', JSON.stringify(cart))
  }

  const values = {
    history,
    productsData: state.productsData,
    productDetails: state.productDetails,
    cart: state.cart,
    getProductsData,
    getProductDetails,
    deleteProduct,
    addProduct,
    saveEditedProduct,
    getCart,
    addProductToCart
  }

  return <productContext.Provider value={values}>
    {children}
  </productContext.Provider>;
};

export default ProductContextProvider;
