import React, {useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { useDropzone } from 'react-dropzone';
import { UploadFile } from '../../../actions/cloud';

const Dropzone = () => {
    const dispatch = useDispatch()

    const onDrop = useCallback(acceptedFiles => {
        acceptedFiles.map( (file) => {
            const reader = new FileReader()
            reader.onload = function(e) {
                dispatch(UploadFile(e.target.result, file.name))
            }
            reader.readAsDataURL(file);
            return file;
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