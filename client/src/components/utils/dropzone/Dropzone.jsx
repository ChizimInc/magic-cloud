import React, {useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useDropzone } from 'react-dropzone';
import { UploadFile } from '../../../actions/cloud';

const Dropzone = () => {
    const dispatch = useDispatch()
    const dirStack =  useSelector(state => state.cloud.dirStack)
    
    const onDrop = useCallback(acceptedFiles => {
        acceptedFiles.map( (file) => {
            const formData = new FormData()
            formData.append("file", file)
            formData.append("name", file.name)
            formData.append("type", 'file')
            if(dirStack[dirStack.length - 1]?.current != 'undefined'){
                formData.append("parent_id", dirStack[dirStack.length - 1]?.current)
                dispatch(UploadFile(file, formData, dirStack[dirStack.length - 1]?.current))
            }
            
        })

    }, [])

    const {acceptedFiles, getRootProps, getInputProps} = useDropzone({onDrop});

    return (
        <section className="container">
            <div {...getRootProps({className: 'dropzone'})}>
                <input {...getInputProps()} />
                <h3>This folder is empty</h3>
                <h6>Drag 'n' drop file here, or click to select files</h6>
            </div>
            <div>
            </div>
        </section>
    );
}

export { Dropzone }