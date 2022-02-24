import { useDispatch, useSelector } from "react-redux"
import { IoIosArrowBack } from 'react-icons/io'

import { setCurrentFolder, setSelected } from "../../reducers/cloudReducer"


const GoBack = () => {
    const dispatch = useDispatch()
    const current_folder = useSelector(state => state.cloud.current_folder)
    const dirStack = useSelector(state => state.cloud.dirStack)

    const goBackHandler = () => {
        const backDir = dirStack.pop()
        dispatch(setCurrentFolder(backDir.parent))
        dispatch(setSelected(backDir.current))
    }

    const backBtn = (
        <div className="goback-left" onClick={goBackHandler}>
            <IoIosArrowBack />
            <div>Back</div>
        </div>
    )
    
    return (
        <>
            <div className="goback-extra-container">
                <div className="goback-container">
                    {current_folder != 0 && backBtn}
                    <div> {dirStack[dirStack.length - 1]?.title} </div>
                    <div>Sort</div>
                </div>
            </div>
        </>
    )
}

export { GoBack }