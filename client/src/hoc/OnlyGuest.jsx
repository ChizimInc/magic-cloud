import { useSelector } from "react-redux"
import { Navigate } from "react-router"


const OnlyGuest  = ({ children }) => {
    const auth = useSelector(state => state.user.isAuth)

    if(auth){
        return <Navigate to="/cloud" />
    }


    return children
}

export { OnlyGuest }