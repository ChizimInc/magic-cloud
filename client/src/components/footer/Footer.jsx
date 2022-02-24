import { useSelector } from 'react-redux'

import { AiOutlineCloud } from 'react-icons/ai'
import { FooterElement } from './FooterElement'

import './main.css'

const Footer = () => {
    const dirStack = useSelector(state => state.cloud.dirStack)
    const selected = useSelector(state => state.cloud.selected)
    const files = useSelector(state =>  state.cloud.files)

    const footerElements = dirStack.map((elem) => <FooterElement type='dir' stack={elem} />)

    return (
        <>
            <div className="footer-container">
                <div className='footer-align-center'>
                    <div className="footer-first-element">
                        <AiOutlineCloud />
                        <div className='footer-first-element-title'>Magic Cloud</div>
                    </div>
                    {footerElements}
                </div>
            </div>
        </>
    )
}

export { Footer }