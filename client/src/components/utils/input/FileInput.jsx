import { useDispatch, useSelector } from 'react-redux'
import { UploadFile } from '../../../actions/cloud'

import { AiOutlineCloudUpload } from 'react-icons/ai'


const  FileInput = ({current_folder}) => {
    const dispatch = useDispatch()
    const dirStack =  useSelector(state => state.cloud.dirStack)

    const handleFile = (e) => {
        const file = e.target.files[0]

        const formData = new FormData()
        formData.append("file", file)
        formData.append("name", file.name)
        formData.append("type", 'file')
        if(dirStack[dirStack.length - 1]?.current != 'undefined'){
            if(dirStack.length == 0){
                return dispatch(UploadFile(file, formData, '0'))
            }
            formData.append("parent_id", dirStack[dirStack.length - 1]?.current)
            dispatch(UploadFile(file, formData, dirStack[dirStack.length - 1]?.current))
            e.target.value = null
        }
        
    }


    return (
        <>
        <label onChange={handleFile} htmlFor="formId">
            <input type="file" id="formId" hidden />
            <AiOutlineCloudUpload className="item-active" />
        </label>
        </>
    )
}

export { FileInput }