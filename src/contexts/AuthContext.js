import axios from 'axios';
import React, { createContext, useContext, useReducer } from 'react';
import { ACTIONS, AUTH_API_LOGIN } from '../helpers/consts';
import { AUTH_API_REG } from './../helpers/consts';
import jwt_decode from 'jwt-decode';
import { useHistory } from 'react-router';
import { actions } from 'react-table';

const authContext = createContext();

const INIT_STATE = {
  user: null,
  loading: false,
  success: false,
  errorMessage: null,
};

const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case ACTIONS.AUTH_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        errorMessage: null,
        user: action.payload,
      };
    case ACTIONS.AUTH_LOADING:
      return {
        ...state,
        loading: true,
      };
    case ACTIONS.AUTH_ERROR:
      return {
        ...state,
        loading: false,
        user: null,
        success: false,
        errorMessage: action.payload,
      };
    case ACTIONS.CLEAR_AUTH_STATE:
      return {
        ...state,
        loading: false,
        success: false,
        errorMessage: null,
      };

    case ACTIONS.AUTH_LOGOUT:
      return {
        user: null,
        loading: false,
        success: false,
        errorMessage: null,
      };

    default:
      return state;
  }
};

export const useAuth = () => {
  return useContext(authContext);
};

const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);
  const registerUser = async (newUser) => {
    try {
      dispatch({
        type: ACTIONS.AUTH_LOADING,
      });
      const res = await axios.post(AUTH_API_REG, newUser);
      if (res.status >= 200 && res.status <= 299) {
        dispatch({
          type: ACTIONS.AUTH_SUCCESS,
          payload: null,
        });
      } else {
        console.log('worked error');
        dispatch({
          type: ACTIONS.AUTH_ERROR,
          payload: res.data.message,
        });
      }
    } catch (error) {
      dispatch({
        type: ACTIONS.AUTH_ERROR,
        payload: error.response.data.message,
      });
    }
  };

  const loginUser = async (user) => {
    try {
      dispatch({ type: ACTIONS.AUTH_LOADING });
      const res = await axios.post(AUTH_API_LOGIN, user);
      const decoded = jwt_decode(res.data.token);
      const decodedUser = {
        email: decoded.id,
        id: decoded.email,
        exp: decoded.exp,
        iat: decoded.iat,
      };
      localStorage.setItem('token', res.data.token);
      dispatch({
        type: ACTIONS.AUTH_SUCCESS,
        payload: decodedUser,
      });
    } catch (error) {
      dispatch({
        type: ACTIONS.AUTH_ERROR,
        payload: error.response.data.message,
      });
    }
  };

  const checkAuth = () => {
    const token = localStorage.getItem('token');
    const decoded = jwt_decode(token);
    if (Date.now() > token.exp * 1000) {
      return;
    }
    dispatch({
      type: ACTIONS.AUTH_SUCCESS,
      payload: {
        email: decoded.id,
        id: decoded.email,
        exp: decoded.exp,
        iat: decoded.iat,
      },
    });
  };

  const logout = () => {
    localStorage.removeItem('token');
    dispatch({
      type: ACTIONS.AUTH_LOGOUT,
    });
  };

  const clearState = () => {
    dispatch({
      type: ACTIONS.CLEAR_AUTH_STATE,
    });
  };

  const value = {
    registerUser,
    loginUser,
    user: state.user,
    loading: state.loading,
    errorMessage: state.errorMessage,
    success: state.success,
    clearState,
    checkAuth,
    logout,
  };

  return <authContext.Provider value={value}>{children}</authContext.Provider>;
};

export default AuthContextProvider;
