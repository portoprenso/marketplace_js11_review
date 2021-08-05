import axios from 'axios';
import React, { createContext, useContext, useReducer } from 'react';
import { ACTIONS, AUTH_API_LOGIN } from '../helpers/consts';
import { AUTH_API_REG } from './../helpers/consts';
import jwt_decode from "jwt-decode";
import { useHistory } from 'react-router';

const authContext = createContext()

const INIT_STATE = {
  user: {}
}

const reducer = (state = INIT_STATE, action) => {
  switch(action.type){
    case ACTIONS.GET_USER:
      return {
        ...state,
        user: action.payload
      }
  }
}

export const useAuth = () => {
  return useContext(authContext)
}

const AuthContextProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE)
  const history = useHistory()
  const registerUser = async (e, newUser) => {
    e.preventDefault()
    try {
      const res = await axios.post(AUTH_API_REG, newUser)
      if (res.status == 200){
        alert("Пользователь успешно создан")
        history.push('/login')
      } else {
        console.log(res)
        alert('Посмотрите в статус response')
      }
    } catch (error) {
      console.error(error)
      alert('Ошибка, посмотрите в консоль')
    }
  }

  const loginUser = async (e, user) => {
    e.preventDefault()
    try {
      const res = await axios.post(AUTH_API_LOGIN, user)
      console.log(res)
      const decoded = jwt_decode(res.data.token)
      console.log(decoded)
      const decodedUser = {
        email: decoded.id,
        id: decoded.email,
        exp: decoded.exp,
        iat: decoded.iat
      }
      dispatch({
        type: ACTIONS.GET_USER,
        payload: decodedUser
      })
    } catch (error) {
      console.log(error)
      alert('Ошибка, посмотрите в консоль')
    }
  }

  const value = {
    registerUser,
    loginUser
  }

  return (
    <authContext.Provider value={value}>
      {children}
    </authContext.Provider>
  );
};

export default AuthContextProvider;