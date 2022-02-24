import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { motion } from 'framer-motion'
import { variants } from '../motion/variants'

import { RenameFile } from '../../../actions/cloud'
import { setRename } from '../../../reducers/cloudReducer'


const RenameInput = ({title, id}) => {
    const [value, setValue] = useState(title)
    const dispatch = useDispatch()
    const current_folder = useSelector(state => state.cloud.current_folder)
    const files = useSelector(state => state.cloud.files)
    const error = useSelector(state => state.cloud.input_error)

    const keyPressHandler = (e) => {
        if(e.charCode == 13){
            dispatch(RenameFile(e.target.value, id, current_folder, files))
            setRename(false)
        }
        
    }

    return (
        <motion.input
            initial={variants.hidden}
            animate={variants.visible}
            variants={variants}
            transition={{
                duration: 0.5
            }}
            type="text"
            style={{ borderBottom: error ? '2px solid #e91e63' : '2px solid #87d9fd' }}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyPress={keyPressHandler}
            autoFocus
        />
        
    )
}

export { RenameInput }