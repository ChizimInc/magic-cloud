import { useSelector } from 'react-redux'

import { AiOutlineCloud } from 'react-icons/ai'
import { FooterElement } from './FooterElement'

import { ProgressBar } from 'react-bootstrap'

import './main.css'

const Footer = () => {
    const dirStack = useSelector(state => state.cloud.dirStack)
    const progress = useSelector(state => state.cloud.progress)
    const uploadFileStatus = useSelector(state => state.cloud.uploadFileStatus)
    const footerElements = dirStack.map((elem) => <FooterElement type='dir' stack={elem} key={elem.current} />)

    return (
        <>
            <div className="footer-container">
                <div className='footer-align-center'>
                    <div className='footer-left'>
                        <div className="footer-first-element">
                            <AiOutlineCloud />
                            <div className='footer-first-element-title'>Magic Cloud</div>
                        </div>
                        {footerElements}
                    </div>
                    <div>
                        <div class="progress">
                            { uploadFileStatus && <ProgressBar now={progress} />}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export { Footer }