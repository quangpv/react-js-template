import {createScope, useScope} from "../lib/scope";
import {useNavigate} from "react-router-dom";

export const RegisterScope = createScope({name: ''})

export function useRegister() {
    const [state] = useScope(RegisterScope)
    const navigate = useNavigate()
    return () => {
        navigate('/login', {state: {name: state.name}})
    }
}