import {createScope, useScope} from "../helper/scope";
import {useEffect} from "react";
import {lookup} from "../../serviceProvider";
import {Repository} from "../../data/repository";
import {useNavigate} from "react-router-dom";

export const AppScope = createScope({},
    () => ({repository: lookup(Repository)}))

export function useLogout() {
    const [, , {repository}] = useScope(AppScope)
    const navigate = useNavigate()
    return () => {
        repository.logout()
        navigate('/login')
    }
}

export function useUpdateAppOnLifecycleEvents() {
    // useCheckAuthOnMounted()
}

function useCheckAuthOnMounted() {
    const [, , {repository}] = useScope(AppScope)
    const navigate = useNavigate()

    useEffect(() => {
        const path = window.location.pathname

        const authPaths = ['/login', '/register']

        const isPrivatePath = authPaths.find(it => path.includes(it)) == null;

        if (isPrivatePath) {
            if (!repository.isLoggedIn()) {
                navigate('/login');
                return
            }
            return;
        }

        if (repository.isLoggedIn()) {
            navigate('/');
        }
    }, [navigate, repository])
}

