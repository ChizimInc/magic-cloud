import { 
    ButtonGroup,
    Navbar,
    Container,
    NavDropdown,
    Nav,
    Overlay,
    Popover
} from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { useState, useRef, useEffect } from "react"

import { 
    AiOutlineLink, 
    AiOutlineCloudDownload, 
    AiOutlineCloudUpload,
    AiOutlineFolderAdd
} from "react-icons/ai"
import { BiRename } from "react-icons/bi"
import { MdDeleteOutline } from 'react-icons/md'

import { CreateFolder, DeleteFile } from "../../actions/cloud"
import { setShowDeleteButton } from "../../reducers/appReducer"
import { FileInput } from '../utils/input/FileInput'
import { DownloadFile } from "../../actions/cloud"


const ControlButtons = ({onRename}) => {
    const dispatch = useDispatch()
    const parent = useSelector(state => state.cloud.current_folder)
    const selected = useSelector(state => state.cloud.selected)
    const files = useSelector(state => state.cloud.files)
    const show = useSelector(state => state.app.deleteBtn)

    const [target, setTarget] = useState(null);
    const [activeBtn, setActiveBtn] = useState('item-disable')
    const [activeDownloadBtn, setActiveDownloadBtn] = useState('item-disable')
    const [fileName, setFileName] = useState('')
    const ref = useRef(null);

    useEffect( () => {

        for(let i = 0; i < files.length; i++){
            if(files[i].id == selected){
                if(files[i].childs === ''){
                    if(files[i].type == 'file'){
                        setActiveDownloadBtn('item-active')
                        setFileName(files[i].name)
                    }
                    return setActiveBtn('item-active')
                    break
                }else{
                    setActiveBtn('item-disable')
                    setActiveDownloadBtn('item-disable')
                }
            }else{
                setActiveBtn('item-disable')
                setActiveDownloadBtn('item-disable')
            }
        }
    }, [selected])


    const checkFileChilds = () => {
        let status = false
        files.map( (file) => {
            if(file.id === selected){
                if(file.childs === ''){
                    status = false
                }else{
                    status = true
                }
            }
        })
        return status
    }
  
    const deleteHandleClick = (event) => {
        event.stopPropagation()
        if(selected && !checkFileChilds()){
            dispatch(setShowDeleteButton(!show))
            setTarget(event.target);
        }
    };


    const createFolderHandle = (e) => {
        e.preventDefault()
        dispatch(CreateFolder(parent, files))
    }

    const deleteFolderHandler = () => {
        if(selected && !checkFileChilds()){
            dispatch(setShowDeleteButton(!show))
            dispatch(DeleteFile(selected, parent))
        }
    }

    const downloadHandler = () => {
        if(selected){
            dispatch(DownloadFile(selected, fileName))
        }
    }

    const renameClickHandler = (e) => {
        e.preventDefault()
        files.map( (file) => {
            if(file.id === selected){
                if(file.childs === ''){
                    onRename(selected)
                }
            }
        })
    }

    return (
        <>
           <Navbar expand="lg" className="pt-0 work-place-navbar">
                <Container>
                <NavDropdown title="My Cloud" id="nav-dropdown">
                    <NavDropdown.Item>Create file</NavDropdown.Item>
                    <NavDropdown.Item>Something else here</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item>Separated link</NavDropdown.Item>
                </NavDropdown>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto"></Nav>
                    <Nav>
                        <ButtonGroup ref={ref} aria-label="Basic example" className="work-place-navbar-button-group">
                            <AiOutlineFolderAdd onClick={createFolderHandle} className="item-active" />
                            <FileInput current_folder={parent}  />
                            <MdDeleteOutline onClick={deleteHandleClick} className={activeBtn} />
                            <Overlay
                                show={show}
                                target={target}
                                placement="bottom"
                                container={ref}
                            >
                                <Popover id="popover-positioned-bottom">
                                    <Popover.Header as="h3" onClick={deleteFolderHandler}>
                                        <div>Delete</div>
                                    </Popover.Header>
                                </Popover>
                            </Overlay>
                            
                            <BiRename onClick={renameClickHandler} className={activeBtn} />
                            <AiOutlineCloudDownload onClick={downloadHandler} className={activeDownloadBtn } />
                        </ButtonGroup>   
                    </Nav>
                </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export { ControlButtons }
