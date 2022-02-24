import axios from "axios"

import { 
    setSelected, 
    setFiles, 
    setCurrentFolder, 
    setInputError, 
    setRename,
    setUploadFileStatus
} from "../reducers/cloudReducer"

import { setModalMsg, setLoader } from "../reducers/appReducer"
import { tokenRefresh } from "./user"
import { auth } from "./user"

import uuid from 'react-uuid'


export const createMainFolder = () => {
    
    return async dispatch => {
        const link = "http://localhost:8000/api/v1/cloud/main-directory/create"
        axios.post(link, {}, {
            headers: {
                'Authorization': 'JWT ' + localStorage.getItem('access')
            }
        })
        .then(function(response){
            if( response.status == 201){
                dispatch(auth())
            }
        })
        .catch(function(error){
            
            if(error.response.status == 401){
                dispatch(tokenRefresh())
                return dispatch(createMainFolder())
                
            }
            
            return dispatch(setModalMsg('An error has occurred, please restart or re-register'))
            
        })
    } 
}

export const CreateFolder = (parent_id, files) => {
    return async dispatch => {
        dispatch(setLoader(true))

        const type = 'dir'
        let initial_name = 'folder'
        let i = 1
        let name

        const folderNameFunc = () => {
            if(files.length == 0){
                name = initial_name
            }
            files.map( (file) => {
                
                name  = initial_name + String(i)
                if(file.name == name){
                    i++
                    return folderNameFunc()
                }
            })
        }
        folderNameFunc()

        axios.post("http://localhost:8000/api/v1/cloud/directory/create", {
            type,
            name,
            parent_id
        }, {
            headers: {
                'Authorization': 'JWT ' + localStorage.getItem('access')
            }
            
        })
        .then(function(response){
            dispatch(GetFolder(parent_id))
            dispatch(setSelected(response.data.id))
            dispatch(setRename(response.data.id))
            dispatch(setLoader(false))
        })
        .catch(function(error){
            
            if(error.response.status == 401){
                dispatch(tokenRefresh())
                dispatch(setLoader(false))
                return dispatch(CreateFolder(type, name, parent_id))
                
            }
            dispatch(setLoader(false))
            return dispatch(setModalMsg('An error has occurred, please restart'))
            
        })
    }
}

export const GetFolder = (folder_id = 0) => {
    return async dispatch => {
        dispatch(setLoader(true))
 
        axios.get(`http://localhost:8000/api/v1/cloud/directory/get/${folder_id}`, {
            headers: {
                'Authorization': "JWT " + localStorage.getItem('access')
            }
        })
        .then(function(response){
            dispatch(setFiles(response.data))
            dispatch(setCurrentFolder(folder_id))
            dispatch(setLoader(false))
            dispatch(setSelected(false))
        })
        .catch(function(error){
            if(error.response.status == 401){
                dispatch(tokenRefresh())
                dispatch(GetFolder(folder_id))
                dispatch(setLoader(false))
            }
        })
    }
}

export const RenameFile = (title, id, current_folder, files) => {
    return async dispatch => {
        let exist = false

        files.map( (file) => {
            if(file.name == title){
                if(file.id == id){
                    dispatch(setInputError(false))
                    return dispatch(setRename(false))
                }
                exist = true
            }
        })

        if(exist){
            return dispatch(setInputError(true))
        }

        dispatch(setLoader(true))
        axios.post("http://localhost:8000/api/v1/cloud/directory/rename", {
            title,
            id
        },{
            headers:  {
                'Authorization': "JWT " + localStorage.getItem('access')
            }
        })
        .then(function(response){
            dispatch(GetFolder(current_folder))
            dispatch(setInputError(false))
            dispatch(setRename(false))
            dispatch(setLoader(false))
        })
        .catch(function(error){
            if(error.response.status == 401){
                dispatch(tokenRefresh())
                dispatch(setLoader(false))
                dispatch(setInputError(false))
                return dispatch(RenameFile(title, id, current_folder, files))
                
            }else if(error.response.status === 404){
                dispatch(setLoader(false))
                return dispatch(setRename(false))
            }
            
            return dispatch(setModalMsg('This folder name is allready exist'))
        })
    }
}


export const DeleteFile = (id, current_folder) => {
    return async dispatch => {
        dispatch(setLoader(true))

        axios.post("http://localhost:8000/api/v1/cloud/directory/delete", {
            id
        },{
            headers:  {
                'Authorization': "JWT " + localStorage.getItem('access')
            }
        })
        .then(function(response){
            dispatch(GetFolder(current_folder))
            dispatch(setLoader(false))
            dispatch(setSelected(false))
        })
        .catch(function(error){
            if(error.response.status == 401){
                dispatch(tokenRefresh())
                dispatch(setLoader(false))
                return dispatch(DeleteFile(id, current_folder))
                
            }
            dispatch(setLoader(false))
            dispatch(GetFolder(current_folder))
        })
    }
}

export const UploadFile = (path, name) => {
    return async dispatch => {
        dispatch(setFiles([{'id': uuid(), 'name': name, 'type': 'file', 'src': path}]))
        dispatch(setUploadFileStatus(true))
    }
}