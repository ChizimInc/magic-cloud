import { useEffect, useState, useRef } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Card } from "react-bootstrap"

import { ControlButtons } from "./ControlButtons"
import { FileBlock } from "./FileBlock"
import { GoBack } from "./GoBack"
import { Footer } from "../footer/Footer"
import { Loader } from "../utils/loader/Loader"
import { Dropzone } from "../utils/dropzone/Dropzone"

import { setSelected, setRename } from "../../reducers/cloudReducer"
import { setShowDeleteButton } from "../../reducers/appReducer"
import { GetFolder } from "../../actions/cloud"

import './style.css'

import 'react-perfect-scrollbar/dist/css/styles.css';
import PerfectScrollbar from 'react-perfect-scrollbar'


const WorkPlace = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user.currentUser)
    const currentFolder = useSelector(state => state.cloud.current_folder)

    useEffect(() => {
        dispatch(GetFolder(currentFolder))
    }, [currentFolder])


    const files = useSelector(state => state.cloud.files).map( (file) => {
        return <FileBlock key={file.id} id={file.id} type={file.type} title={file.name} /> 
    })

    const onRename = (selected) => {
        dispatch(setRename(selected))
    }

    const cancelHandler = () => {
        dispatch(setSelected(null))
        dispatch(setRename(null))
        dispatch(setShowDeleteButton(false))
    }


    if(!user.main_folder){
        return null
    }

    return(
        <>
            <div className="container d-flex justify-content-center mt-3" >
                <Card className="work-place-main-card" onClick={()=> dispatch(setShowDeleteButton(false))}>
                    <ControlButtons onRename={onRename} />
                    <GoBack />
                    <Card.Body onClick={cancelHandler}>
                        <PerfectScrollbar>
                        <div className='work-place-file-block-container'>
                            {files.length > 0 ? files : <Dropzone />}
                        </div>
                        </PerfectScrollbar>
                    </Card.Body>
                </Card>
            </div>
            <Footer />
        </>
    )
}

export { WorkPlace }