import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { Routes, Route } from "react-router-dom";

import { Layout } from "./layout/Layout";
import { RequireAuth } from "../hoc/RequireAuth"
import { OnlyGuest } from "../hoc/OnlyGuest";

import { Registration } from "./authorization/Registration";
import { Login } from "./authorization/Login";
import { Home } from "./home/Home";
import { Profile } from '../components/profile/Profile'
import { NotFound } from './utils/notFound/NotFound'

import { auth } from "../actions/user";


function App() {
    const dispatch = useDispatch()

    useEffect(() => {
        if(localStorage.getItem('access')){
            dispatch(auth())
        }
    }, [])


    return (

            <div className="app container">

                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={
                            <RequireAuth>
                                <Home />
                            </RequireAuth>
                        }  
                        />
                        <Route path={"registration"} element={
                            <OnlyGuest>
                                <Registration />
                            </OnlyGuest>
                            
                        } />
                        <Route path={"login"} element={
                            <OnlyGuest>
                                <Login />
                            </OnlyGuest>   
                        } />
                        <Route path={"cloud"} element={
                            <RequireAuth>
                                <Home />
                            </RequireAuth>
                        } />
                        <Route path="profile" element={
                            <RequireAuth>
                                <Profile />
                            </RequireAuth>
                        } />
                        <Route path="*" element={<NotFound />} />
                    </Route>
                </Routes>

            </div>

    );
}

export default App;
