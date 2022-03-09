import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

import { motion } from 'framer-motion'
import { variants } from '../utils/motion/variants'

import { SystemMessage } from '../message/SystemMessage'
import { LoadingButton } from '../buttons/LoadingButton'
import { WorkPlace } from '../workPlace/WorkPlace'

import './main.css'


const Home = () => {
    const redirect = useSelector(state => state.app.redirectLink)

    if(redirect){
        return <Navigate to={redirect} />
    }
    

    return(
        <>
        <motion.div 
            initial={variants.hidden}
            animate={variants.visible}
            variants={variants}
            transition={{
                duration: 0.5
            }}
        >
            <div class="">
                <LoadingButton />
                <WorkPlace />
            </div>
            <SystemMessage />
        </motion.div>


        </>
    )
}

export { Home };