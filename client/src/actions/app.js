import { redirect, closeModalMsg } from "../reducers/appReducer"


export const systemMessageAction = () => {
    return async dispatch => {
        dispatch(closeModalMsg())
    }
}

export const redirectAction = (link) => {
    return async dispatch => {
        dispatch(redirect(link))
        dispatch(redirect(null))
    }
}