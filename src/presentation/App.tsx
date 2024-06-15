import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {withScope} from "../domain/helper/scope";
import {AppScope, useUpdateAppOnLifecycleEvents} from "../domain/usecase/app.case";
import {MainPage} from "./MainPage";
import ErrorPage from "./ErrorPage";
import RegisterPage from "./RegisterPage";
import LoginPage from "./LoginPage";


function AppRoutes() {
    useUpdateAppOnLifecycleEvents()

    return <Routes>
        <Route path="/login" Component={LoginPage}/>
        <Route path="/register" Component={RegisterPage}/>
        <Route path="/*" Component={MainPage}/>
        <Route path="*" Component={ErrorPage}/>
    </Routes>
}

function App() {
    return (
        <Router>
            <AppRoutes/>
        </Router>
    );
}

export default withScope(AppScope, App);