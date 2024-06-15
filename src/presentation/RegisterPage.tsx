import React, {ChangeEvent} from "react";
import {useScope, withScope} from "../lib/scope";
import {RegisterScope, useRegister} from "../domain/register.case";

function RegisterPage() {
    const [, setState] = useScope(RegisterScope)
    const register = useRegister()

    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        setState({name: e.target.value})
    }
    return <div style={{display: "flex", flexDirection: "column"}}>
        <h1>Register</h1>
        <input onChange={handleInput}/>
        <button onClick={register}>Submit</button>
    </div>
}

export default withScope(RegisterScope, RegisterPage)