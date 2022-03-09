import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

import './main.css'


const Loader = ({status = false, file_id}) => {

    let loader = useSelector(state => state.app.loader)
    
    if(status == file_id && status != false){
        loader = true
    }
    

    return(
        <>
        { loader && (
            <div className="loader-container">
                <motion.div
                    animate={{
                        scale: [1, 2, 2, 1, 1],
                        rotate: [0, 0, 270, 270, 0],
                        borderRadius: ["20%", "20%", "50%", "50%", "20%"]
                    }}
                    transition={{
                        duration: 2,
                        ease: "easeInOut",
                        times: [0, 0.2, 0.5, 0.8, 1],
                        repeat: Infinity,
                        repeatDelay: 1
                    }}
                />
          </div>
        )}
        </>
    )
}

export { Loader };