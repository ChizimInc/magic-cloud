import axios from "axios";

import { setToken, setUser, logout } from "../reducers/userReducer";
import { setModalMsg, setLoader, signupSuccess, redirect } from "../reducers/appReducer"

const REACT_APP_SERVER_URL = "https://34.141.197.205/"


export const registration = (email, username, password, re_password) => {

    const strong_password = new RegExp('^(?=.*?[A-Za-z])(?=.*?[0-9]).{8,}$')

    if (password !== re_password){
        return dispatch => dispatch(setModalMsg("Password mismatch"))
    }else if(!strong_password.test(password)){
        return dispatch => dispatch(setModalMsg("Password: use latters and numbers and min 8 symbol"))
    }else if(password.length < 8){
        return dispatch => dispatch(setModalMsg("Password is to short"))
    }
    
    return async dispatch => {

        dispatch(setLoader(true))

        axios.post(REACT_APP_SERVER_URL + "api/auth/users/", {
            email,
            username,
            password,
            re_password
        })
        .then(function (response) {
            
            dispatch(signupSuccess(
                {
                    msg: "User created successful, now please login",
                    link: "/login"
                }
            ))
            dispatch(redirect(null))
            dispatch(setLoader(false))

            

            
        })
        .catch(function (error){
            Object.entries(error.response.data).map((err) => dispatch(setModalMsg(err[1][0])))
            dispatch(setLoader(false))
        })
    }
}


export const login = (email, password) => {
    return async dispatch => {
            dispatch(setLoader(true))
            axios.post(REACT_APP_SERVER_URL + "api/auth/jwt/create/", {
                email,
                password
            })
            .then(function (response) {
            
                
                dispatch(setToken(response.data))
                localStorage.setItem('access', response.data.access)
                localStorage.setItem('refresh', response.data.refresh)
                dispatch(auth())
                dispatch(setLoader(false))
                dispatch(redirect('/cloud'))
                dispatch(redirect(null))


            })
            .catch(function (error){

                if(error.request.status === 401){
                    dispatch(setModalMsg("Login or password is incorrectly"))
                }else{
                    dispatch(setModalMsg("Server not response"))
                }

                dispatch(setLoader(false))
                
            })
    }
}

export const auth = () => {

    return async dispatch => {

        axios.get(REACT_APP_SERVER_URL + "api/auth/users/me/",
            {
                headers:{
                    'Authorization': `JWT ${localStorage.getItem('access')}`,
                    'Content-Type': 'application/json',
                    'accept': 'application/json'
                }
                
            }
        )
        .then(function (response) { 
            dispatch(setUser(response.data)) 
            dispatch(setToken({access: localStorage.getItem('access'), refresh: localStorage.getItem('refresh')}))

        })
        .catch(function (error) {
            
            if(error.response?.status === 401){
                const refresh = localStorage.getItem('refresh')
                
                axios.post(REACT_APP_SERVER_URL + "api/auth/jwt/refresh/",{
                    refresh
                })
                .then(function (response){
                    localStorage.setItem('access', response.data['access'])
                    dispatch(auth())
                })
            }

        })
        
    }
}

export const tokenRefresh = () => {
    const refresh = localStorage.getItem('refresh')

    return async dispatch => {
        axios.post(REACT_APP_SERVER_URL + "api/auth/jwt/refresh/", {
            refresh
        })
        .then(function(response){
            localStorage.setItem('access', response.data['access'])
            dispatch(setToken({access: response.data['access'], refresh: localStorage.getItem('refresh')}))
        })
        .catch(function(error){
            if(error.response?.status === 401){
                dispatch(logout())
            }
        })
    }
}
