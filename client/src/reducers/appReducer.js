const REDIRECT = 'REDIRECT'
const SET_MODAL_MSG = 'SET_MODAL_MSG'
const CLOSE_MODAL_MSG = 'CLOSE_MODAL_MSG'
const SET_LOADER = 'SET_LOADER'
const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS'
const SET_SHOW_DELETE_BTN = 'SET_SHOW_DELETE_BTN' 

const defaultState = {
    msg: null,
    redirectLink: null,
    loader: false,
    deleteBtn: false
}

export default function appReducer(state=defaultState, action){
    switch (action.type) {
        case REDIRECT:
            return {
                ...state,
                redirectLink: action.payload
            }

        case SET_MODAL_MSG:
            return {
                ...state,
                msg: action.payload
            }

        case SIGN_UP_SUCCESS:
            return {
                ...state,
                msg: action.payload.msg,
                redirectLink: action.payload.link
            }

        case CLOSE_MODAL_MSG:
            return {
                ...state,
                msg: null
            }

        case SET_LOADER:
            return {
                ...state,
                loader: action.payload
            }

        case SET_SHOW_DELETE_BTN:
            return {
                ...state,
                deleteBtn: action.payload
            }
    
        default:
            return state
    }
}

export const redirect = link => ({ type: REDIRECT, payload: link })
export const setModalMsg = msg => ({ type: SET_MODAL_MSG, payload: msg })
export const signupSuccess = data => ({ type: SIGN_UP_SUCCESS, payload: data })
export const closeModalMsg = () => ({ type: CLOSE_MODAL_MSG })
export const setLoader = loader => ({ type: SET_LOADER, payload: loader })
export const setShowDeleteButton = bool => ({ type: SET_SHOW_DELETE_BTN, payload: bool })
