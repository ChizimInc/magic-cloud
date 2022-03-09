import React, {useState} from 'react';
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom'

import { motion } from 'framer-motion';

import { Loader } from '../utils/loader/Loader'
import { Input } from "../utils/input/Input";

import { registration } from "../../actions/user";
import { SystemMessage } from '../message/SystemMessage';
import { variants } from '../utils/motion/variants';



const Registration = () => {

    const [email, setEmail]           = useState("")
    const [password, setPassword]     = useState("")
    const [rePassword, setRePassword] = useState("")
    const [username, setUsername]     = useState("")

    const dispatch = useDispatch()
    const redirect = useSelector(state => state.app.redirectLink)

    if(redirect){
        return <Navigate to={redirect} />
    }

    return (
        <motion.div 
          className="container-sm mt-5"
          initial={variants.hidden}
          animate={variants.visible}
          variants={variants}
          transition={{
            duration: 0.5
          }}
          style={{maxWidth: '80%'}}
        >
            <h3>Registration</h3>

            <Form >
                <Form.Group className="mb-3 mt-4" controlId="formBasicEmail">
                    <Input type="email" placeholder="email" value={email} setValue={setEmail}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicUsername">
                    <Input type="text" placeholder="username" value={username} setValue={setUsername}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Input type="password" placeholder="password" value={password} setValue={setPassword} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicRePassword">
                    <Input type="password" placeholder="re_password" value={rePassword} setValue={setRePassword} />
                </Form.Group>
                <Button
                  onClick={() => dispatch(registration(email, username, password, rePassword))}
                  variant="primary"
                >
                    Submit
                </Button>
            </Form>

            <Loader />
            <SystemMessage />
            
        </motion.div>
    );
};

export { Registration };