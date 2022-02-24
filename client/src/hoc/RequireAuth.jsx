import { useSelector, useDispatch } from "react-redux"
import { useLocation, Navigate } from "react-router"

import { auth } from "../actions/user"


const RequireAuth = ({ children }) => {
    const location = useLocation()
    const dispatch = useDispatch()
    const isAuth = useSelector(state => state.user.isAuth)

    if(!isAuth && location.state == null && localStorage.getItem('refresh')){
        dispatch(auth())

        if(!isAuth){
            return <Navigate to="/login" />
        }
        return <Navigate to={location.pathname} />
        
    }
    if(!isAuth){
        return <Navigate to="/login" state={{ from: location }} />
    }

    return children
}

export { RequireAuth }