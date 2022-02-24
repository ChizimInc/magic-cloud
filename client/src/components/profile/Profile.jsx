import { motion } from "framer-motion"
import { variants } from "../utils/motion/variants"

import { useSelector } from 'react-redux'


const Profile = () => {

    const user = useSelector(state => state.user.currentUser)

    return(
        <motion.div
            initial={variants.hidden}
            animate={variants.visible}
            variants={variants}
            transition={{
                duration: 0.5
            }}
        >
            <h1>User Profile page</h1>

            <h2>Username: {user.username}</h2>
            <h2>Email: {user.email}</h2>

        </motion.div>
    )
}

export { Profile }