import { motion } from "framer-motion"
import { variants } from "../motion/variants"

import { NavLink } from "react-router-dom"


const NotFound = () => {
    return(
        <motion.div
            initial={variants.hidden}
            animate={variants.visible}
            transition={{
                duration: 0.5
            }}
        >
            <h2>Page not Found</h2>
            <NavLink to="/">Return to home page</NavLink>
        </motion.div>
    )
}

export { NotFound }