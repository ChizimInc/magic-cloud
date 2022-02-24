import { Link, useMatch } from "react-router-dom"


const CustomLink = ({ children, to, ...props }) => {

    const match = useMatch(to)

    return(
        <Link
            to={to}
            style={{
                color: match ? 'blue' : 'black',
            }}
            {...props}
        >
            { children }
        </Link>
    )
}

export { CustomLink }