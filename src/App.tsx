import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {withScope} from "./domain/helper/scope";
import {AppScope, useUpdateAppOnLifecycleEvents} from "./domain/usecase/app.case";
import {MainPage} from "./presentation/MainPage";
import ErrorPage from "./presentation/ErrorPage";
import RegisterPage from "./presentation/RegisterPage";
import LoginPage from "./presentation/LoginPage";


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