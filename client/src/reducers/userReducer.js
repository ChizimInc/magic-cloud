const SET_USER = "SET_USER"
const LOGOUT = "LOGOUT"
const SET_TOKEN = 'SET_TOKEN'


const defaultState = {
    currentUser: {},
    isAuth: false, 
    access: '',
    refresh: ''
}

export default function userReducer(state = defaultState, action){
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                currentUser: action.payload,
                isAuth: true
            }

        
        case SET_TOKEN:
            return {
                ...state,
                isAuth: true,
                access: action.payload.access,
                refresh: action.payload.refresh
            }


        case LOGOUT:
            localStorage.removeItem('access')
            localStorage.removeItem('refresh')
            return {
                ...state,
                currentUser: {},
                isAuth: false,
                access: '',
                refresh: ''
            }

        default:
            return state
    }
}

export const setUser = user => ({type: SET_USER, payload: user})
export const setToken = token => ({type: SET_TOKEN, payload: token})
export const logout = () => ({type: LOGOUT})