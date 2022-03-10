import { useDispatch, useSelector } from 'react-redux';

import { motion } from 'framer-motion'

import { GetFolder } from '../../actions/cloud';
import { setSelected, pushToStack } from '../../reducers/cloudReducer';
import { RenameInput } from '../utils/input/RenameInput';
import { variants } from '../utils/motion/variants'
import { Loader } from '../utils/loader/Loader';

import './style.css'


const FileBlock = ({id, type, title}) => {
    const dispatch = useDispatch()
    const selected = useSelector(state => state.cloud.selected)
    const rename = useSelector(state => state.cloud.rename)
    const currentFolder = useSelector(state => state.cloud.current_folder)
    const uploadFileStatus = useSelector(state => state.cloud.uploadFileStatus)

    const folderClickHandle = (e) => {
        e.preventDefault()
        e.stopPropagation()
        const parent = currentFolder
        const current = selected
        switch(e.detail){
            case 1:
                dispatch(setSelected(id))
                break;
            
            case 2:
                if(type == 'dir'){
                    dispatch(GetFolder(id))
                    dispatch(pushToStack({parent, current, title}))
                }
                break;
        }
        
    }

    const getExtensionRegExp = /\.[0-9a-z]+$/i

    let match = getExtensionRegExp.exec(title)
    let ext = 0
    if(match?.length){
        ext = match[0]
    }
    
    let style = 0

    const FileExtensions = {
        '.word': 'msword',
        '.docx': 'msword',
        '.pptx': 'msppoint',
        '.ppt':  'msppoint',
        '.xls':  'msexcel',
        '.xml':  'msexcel',
        '.xlsx': 'msexcel',
        '.xlsm': 'msexcel',
        '.xlsb': 'msexcel',
        '.jpg':  'jpg',
        '.mp3':  'audio',
        '.wav':  'audio',
        '.wma':  'audio',
        '.acc':  'audio',
        '.m4a':  'audio',
        '.mp4':  'video',
    }

    if(ext){
        if(FileExtensions[match[0]]){
            style = FileExtensions[match[0]]
        }
          
    }

    const FileIcon = (
        <div className={`file-icon ${style}`}>
            <div className='file-icon-text'>
            { style == 0 && ext }
            </div>
        </div>
    )

    return(
        <>
            <motion.div
                initial={variants.hidden}
                animate={variants.visible}
                variants={variants}
                className={`work-place-file-block ${selected == id ? 'selected' : ''}`}
                transition={{
                    duration: 0.5
                }}
                onClick={folderClickHandle}
            >
                <div className='showcase-container'>
                    { type == 'file' && <div className='showcase-item file'>
                        { uploadFileStatus 
                            ? 
                                uploadFileStatus == id 
                                    ?
                                        <Loader status={uploadFileStatus} file_id={id}/> 
                                    :
                                        FileIcon
                            : 
                                FileIcon
                        }
                    </div>
                    }

                    { type == 'dir' && <div className='showcase-item folder'>
                        { id == selected && <Loader /> }
                    </div>}
                    
                    { rename && rename == id ? <RenameInput id={id} title={title} /> : <center className="showcase-title">{title}</center>}
                </div>
            </motion.div>
        </>
    )
}

export { FileBlock }