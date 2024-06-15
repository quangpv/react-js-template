import {useScope, withScope} from "../domain/helper/scope";
import {LoginScope, useLogin, useNavigateToRegister, useUpdateLoginOnMounted} from "../domain/usecase/login.case";
import React from "react";

function LoginPage() {
    useUpdateLoginOnMounted();
    const [state, setState] = useScope(LoginScope)
    const login = useLogin()
    const register = useNavigateToRegister()

    return <div style={{display: "flex", flexDirection: "column", gap: 10, margin: 20}}>
        <h1>Login</h1>
        <input
            type={"text"}
            defaultValue={state.email}
            onChange={e => setState(v => ({...v, email: e.target.value}))}
        />
        {state.error && <div style={{color: "red"}}>{state.error}</div>}
        <button onClick={login}>Submit</button>
        <button onClick={register}>Register</button>
    </div>
}

export default withScope(LoginScope, LoginPage)
