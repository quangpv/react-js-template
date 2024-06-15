import React, {Fragment} from "react";
import {Link, Route, Routes} from "react-router-dom";
import HomePage from "./HomePage";
import CounterPage from "./CounterPage";
import {BottomNavigation, BottomNavigationAction} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import AddIcon from "@mui/icons-material/Add";
import ErrorPage from "./ErrorPage";
import {useNavigateToTab, useSelectedTab} from "../domain/main.case";

export function MainPage() {
    const navigateToTab = useNavigateToTab()
    const selectedTab = useSelectedTab()

    const handleChange = (event: any, newValue: React.SetStateAction<string>) => {
        navigateToTab(newValue)
    };
    return (
        <Fragment>
            <div style={{
                width: "100vw",
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
            }}>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    alignItems: "center"
                }}>
                    <Routes>
                        <Route path="" Component={HomePage}/>
                        <Route path="counter" Component={CounterPage}/>
                        <Route path="*" Component={ErrorPage}/>
                    </Routes>
                </div>
                <div style={{width: '100%', height: 1, backgroundColor: 'whitesmoke'}}></div>
                <BottomNavigation value={selectedTab} onChange={handleChange}>
                    <BottomNavigationAction
                        label="Home"
                        value="home"
                        icon={<HomeIcon/>}
                        component={Link} to="/"/>

                    <BottomNavigationAction
                        label="Counter"
                        value="counter"
                        icon={<AddIcon/>}
                        component={Link}
                        to="/counter"/>
                </BottomNavigation>
            </div>
        </Fragment>
    )
}