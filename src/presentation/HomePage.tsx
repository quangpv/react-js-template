import React from "react";
import {withScope} from "../lib/scope";
import {HomeScope} from "../domain/home.case";
import {useLogout} from "../domain/app.case";


function HomePage() {
    const logout = useLogout()

    return <div>
        <button onClick={logout}>Logout</button>
        <h1> Welcome to the app</h1>
    </div>;
}

export default withScope(HomeScope, HomePage)