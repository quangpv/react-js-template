import {useNavigate} from "react-router-dom";
import React, {useCallback, useMemo} from "react";

export function useNavigateToTab() {
    const navigate = useNavigate()

    return useCallback((newValue: React.SetStateAction<string>) => {
        if (newValue instanceof Function) {
        } else {
            navigate(newValue)
        }
    }, [navigate])
}

export function useSelectedTab() {
    const path = window.location.pathname
    return useMemo(() => {
        const tab = path.split("/")[1]
        if (tab.trim().length === 0) return "home"
        return tab
    }, [path])
}
