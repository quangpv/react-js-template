import {createScope, useScope} from "../helper/scope";
import {useCallback, useEffect} from "react";
import {AppScope} from "./app.case";
import {lookup} from "../../serviceProvider";
import {ApiService} from "../../data/apiService";

export const CounterScope = createScope({count: 0}, () => ({apiService: lookup(ApiService)}))

export function useUpdateCountOnMounted() {
    const [, setState] = useScope(CounterScope)
    const [, , {repository}] = useScope(AppScope)
    useEffect(() => {
        const latestCount = repository.getLatestCount()
        setState(state => ({...state, count: latestCount}))
    }, [repository, setState])
}

export function useAddCount() {
    const [, , {repository}] = useScope(AppScope)
    const [, setState] = useScope(CounterScope)

    return useCallback(() => {
        setState(prev => {
            const count = prev.count + 1;
            repository.setLatestCount(count)
            return {...prev, count}
        })
    }, [repository, setState])
}

export function useReduceCount() {
    const [, setState] = useScope(CounterScope)
    const [, , {repository}] = useScope(AppScope)

    return useCallback(() => {
        setState(prev => {
            const count = prev.count - 1;
            repository.setLatestCount(count)
            return {...prev, count}
        })
    }, [repository, setState])
}