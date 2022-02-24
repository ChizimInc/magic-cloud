import { useDispatch, useSelector } from 'react-redux'

import { motion } from 'framer-motion'
import { setCurrentFolder } from '../../reducers/cloudReducer'

import { VscFile } from 'react-icons/vsc'
import { IoIosArrowRoundForward } from 'react-icons/io'
import './main.css'

const FooterElement = ({type, stack}) => {
    const dispatch = useDispatch()
    const dirStack = useSelector(state => state.cloud.dirStack)

    const clickHandler = () => {
        dispatch(setCurrentFolder(stack.current))
        let i = 0
        for(let i = 0; i < dirStack.length; i++){
            if(dirStack[i].current == stack.current){
                dirStack.splice(i + 1, dirStack.length)
                break
            }
        }
    }

    return (
        <>
            <motion.div className="footer-element">
                <IoIosArrowRoundForward />
                { type == 'dir' && <div className='footer-element-image folder'></div> }
                { type == 'file' && <div className='footer-element-image'><VscFile /></div> }
                <div className='footer-element-title' onClick={clickHandler}>{stack.title}</div>
            </motion.div>
        </>
    )
}

export { FooterElement }