import React from 'react';
import { Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';

import { motion } from 'framer-motion';

import { systemMessageAction } from "../../actions/app";
import { closeModalMsg } from '../../reducers/appReducer';

import './style.css'


const SystemMessage = () => {

   const dispatch = useDispatch()
   const msg = useSelector(state => state.app.msg)

   if(msg){
        setTimeout( () => dispatch(closeModalMsg()), 10000 )
   }

   const variants = {
       hidden: { opacity: 0 },
       visible: { opacity: 1 }
   }
   

    return (
        <>
        {msg && (
            <motion.div
                initial="hidden"
                animate="visible"
                variants={variants}
                transition={{
                    duration: 0.5
                }}
            >
                <Modal.Dialog>
                    <Modal.Header>
                        <Modal.Title>{msg}</Modal.Title>
                        <Button variant="secondary" onClick={() => dispatch(systemMessageAction())}>Close</Button>
                    </Modal.Header>
                </Modal.Dialog>
            </motion.div>
        )}
        </>
    );
};

export { SystemMessage };