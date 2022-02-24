import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import userReducer from "./userReducer";
import fileReducer from "./fileReducer";
import appReducer from "./appReducer";
import cloudReducer from "./cloudReducer";

const rootReducer = combineReducers({
    user: userReducer,
    files: fileReducer,
    app: appReducer,
    cloud: cloudReducer
})

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))