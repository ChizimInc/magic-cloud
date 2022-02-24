import React, {useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useDropzone } from 'react-dropzone';
import { UploadFile } from '../../../actions/cloud';

const Dropzone = () => {
    const dispatch = useDispatch()
    const current_folder =  useSelector(state => state.cloud.current_folder)

    const onDrop = useCallback(acceptedFiles => {
        acceptedFiles.map( (file) => {
            const formData = new FormData()
            formData.append("file", file)
            dispatch(UploadFile(file, formData, current_folder))
            
        })

    }, [])

    const {acceptedFiles, getRootProps, getInputProps} = useDropzone({onDrop});


    return (
        <section className="container">
            <div {...getRootProps({className: 'dropzone'})}>
                <input {...getInputProps()} />
                <h3>This folder is empty</h3>
                <h6>Drag 'n' drop some files here, or click to select files</h6>
            </div>
            <div>
            </div>
        </section>
    );
}

export { Dropzone }