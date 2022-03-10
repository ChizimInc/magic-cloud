import React, {useState} from 'react';
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Navigate , useLocation } from 'react-router-dom'

import { motion } from 'framer-motion';

import { variants } from '../utils/motion/variants';
import { Loader } from '../utils/loader/Loader'
import { Input } from "../utils/input/Input";

import { login } from "../../actions/user";

import {  SystemMessage } from '../message/SystemMessage';


const Login = () => {

    const [email, setEmail]       = useState("")
    const [password, setPassword] = useState("")

    const dispatch = useDispatch()
    const location = useLocation()
  
    const redirect = useSelector(state => state.app.redirectLink)
    const fromPage = location.state?.from?.pathname || "/"


    if(redirect){
        return <Navigate to={redirect} />
    }

    return (
        <>
        <motion.div 
          className="container-md mt-5 login-form"
          initial={variants.hidden}
          animate={variants.visible}
          variants={variants}
          transition={{
            duration: 0.5
          }}
          style={{maxWidth: '80%'}}
          onKeyPress={(e) => e.key === 'Enter' && dispatch(login(email, password))}
        >
            <h3>Login</h3>

            <Form className="">
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Input type="email" placeholder="email" value={email} setValue={setEmail}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Input type="password" placeholder="password" value={password} setValue={setPassword} />
                </Form.Group>
                <Button
                  onClick={() => dispatch(login(email, password))}
                  variant="primary"
                >
                Log in
                </Button>
            </Form>

            <Loader />
            
            
        </motion.div>
        <SystemMessage />
        </>
    );
};

export { Login };