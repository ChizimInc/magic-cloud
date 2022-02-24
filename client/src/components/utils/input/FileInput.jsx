import { useDispatch, useSelector } from 'react-redux'
import { UploadFile } from '../../../actions/cloud'

import { AiOutlineCloudUpload } from 'react-icons/ai'


const  FileInput = ({current_folder}) => {
    const dispatch = useDispatch()

    const handleFile = (e) => {
        const file = e.target.files[0]
        if(file.size > (1024 ** 2) * 5){
            console.log('Max file size is 5 MB')
        }else{
            const formData = new FormData()
            formData.append("file", file)
            dispatch(UploadFile(file, formData, current_folder))
        }
    }


    return (
        <label onChange={handleFile} htmlFor="formId">
            <input type="file" id="formId" hidden />
            <AiOutlineCloudUpload className="item-active" />
        </label>
    )
}

export { FileInput }