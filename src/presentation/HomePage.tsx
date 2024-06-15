import React from "react";
import {withScope} from "../domain/helper/scope";
import {HomeScope} from "../domain/usecase/home.case";
import {useLogout} from "../domain/usecase/app.case";


function HomePage() {
    const logout = useLogout()

    return <div>
        <button onClick={logout}>Logout</button>
        <h1> Welcome to the app</h1>
    </div>;
}

export default withScope(HomeScope, HomePage)