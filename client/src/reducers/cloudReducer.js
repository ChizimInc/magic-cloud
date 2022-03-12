const SET_MAIN_FOLDER = 'SET_MAIN_FOLDER'
const SET_CURRENT_FOLDER = 'SET_CURRENT_FOLDER'
const SET_FILES = 'SET_FILES'
const ADD_FILES = 'ADD_FILES'
const SET_SELECTED = 'SET_SELECTED'
const SET_RENAME = 'SET_RENAME'
const SET_INPUT_ERROR = 'SET_INPUT_ERROR'
const PUSH_TO_STACK = 'PUSH_TO_STACK'
const CLEAR_STACK = 'CLEAR_STACK'
const SET_UPLOAD_STATUS = 'SET_UPLOAD_STATUS'
const SET_PROGRESS_UPLOAD = 'SET_PROGRESS_UPLOAD'


const defaultState = {
    main_folder: false,
    current_folder: 0,
    files: [],
    selected: null,
    input_error: false,
    rename: null,
    dirStack: [],
    uploadFileStatus: false,
    progress: 0
}

export default function cloudReducer(state=defaultState, action){
    switch(action.type){
        case SET_MAIN_FOLDER:
            return{
                ...state,
                main_folder: true
            }

        case SET_CURRENT_FOLDER:
            return {
                ...state,
                current_folder: action.payload
            }

        case SET_FILES:
            return {
                ...state,
                files: action.payload
            }

        case ADD_FILES:
            return {
                ...state,
                files: [action.payload, ...state.files]
            }

        case SET_SELECTED:
            return {
                ...state,
                selected: action.payload
            }

        case SET_INPUT_ERROR:
            return {
                ...state,
                input_error: action.payload
            }

        case SET_RENAME:
            return {
                ...state,
                rename: action.payload
            }

        case PUSH_TO_STACK:
            return {
                ...state,
                dirStack: [...state.dirStack, action.payload]
            }

        case CLEAR_STACK:
            return {
                ...state,
                dirStack: []
            }

        case SET_UPLOAD_STATUS:
            return {
                ...state,
                uploadFileStatus: action.payload
            }

        case SET_PROGRESS_UPLOAD:
            return {
                ...state,
                progress: action.payload
            }
        
        default:
            return state
    }
}

export const setMainFolder = () => ({type: SET_MAIN_FOLDER})
export const setCurrentFolder = dir => ({type: SET_CURRENT_FOLDER, payload: dir})
export const setFiles = files => ({type: SET_FILES, payload: files})
export const addFiles = file => ({ type:  ADD_FILES, payload: file})
export const setSelected = id => ({ type: SET_SELECTED, payload: id })
export const setRename = bool => ({ type: SET_RENAME, payload: bool })
export const setInputError = bool => ({ type: SET_INPUT_ERROR, payload: bool })
export const pushToStack = dir => ({ type: PUSH_TO_STACK, payload: dir })
export const clearStack = () => ({ type: CLEAR_STACK })
export const setUploadFileStatus = bool => ({ type: SET_UPLOAD_STATUS, payload: bool})
export const setProgressUpload = int => ({type:  SET_PROGRESS_UPLOAD, payload: int})