import React, { createContext, useLayoutEffect, useReducer } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import AuthReducer from '../Reducers/AuthReducer'

export const AuthContext = createContext()

const AuthContextProvider = (props) =>{
  const inialState = {
    email : "",
    token : "",
    loading : true,
    error : ""
  }
  const [state, dispatch] = useReducer(AuthReducer, inialState)
  
  const history = useHistory()

  let headers = {
    Authorization: "Bearer " + state.token
  }
   
  useLayoutEffect(() => logged(), [])

  const logged = async () => {
    try {
      const existed = localStorage.getItem("token")
      if(existed && existed !== ""){
        const res = await axios.get("/user/me",{ 
          headers : { 
            Authorization: "Bearer " + existed 
          }
        })

        const payload = {
          email : res.data.email,
          token : existed
        }

        dispatch({ type : "LOGIN", payload })
        history.push("/")
      }
    } catch (error) {
      console.log(error)
      dispatch({ type : "ERROR" })
    }
  }

  const login = async (formData) => {
    try {
      const res = await axios.post("/user/login", formData)
      const data = await res.data

      const payload = {
        email : formData.email,
        token : data
      }

      localStorage.setItem("token", data)
      dispatch({ type : "LOGIN", payload })
      history.push("/")                    
    } catch (error) {
      console.log(error)
      dispatch({ type : "ERROR" })
    }
  }
  
  const logout = async () =>{
    try {
      await axios.post("/user/logout",{},{headers})
      localStorage.removeItem("token")
      dispatch({ type : "LOGOUT" })
      history.push("/login")
    } catch (error) {
      console.log(error)
      dispatch({ type : "ERROR" })
    }
  }
  
  return(
      <AuthContext.Provider value={{
        email : state.email, 
        token : state.token, 
        headers, 
        login, 
        logout
      }}>
          {props.children}
      </AuthContext.Provider>
  );
}

export default AuthContextProvider