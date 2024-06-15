import {createScope, useScope} from "../helper/scope";
import {useLocation, useNavigate} from "react-router-dom";
import {AppScope} from "./app.case";
import {useEffect} from "react";

export const LoginScope = createScope({email: '', error: ''})

export function useUpdateLoginOnMounted() {
    const location = useLocation()
    const [, setState] = useScope(LoginScope)

    useEffect(() => {
        setState(state => ({...state, email: location?.state?.name || ''}))
    }, [location, setState])
}

export function useLogin() {
    const [, , {repository}] = useScope(AppScope)
    const [{email}, setState] = useScope(LoginScope)
    const navigate = useNavigate()
    return async () => {
        if (email === "test") {
            await repository.login()
            navigate("/")
            return
        }
        setState(state => ({...state, error: "Login failure"}))
    }
}

export function useNavigateToRegister() {
    const navigate = useNavigate()
    return () => {
        navigate('/register')
    }
}