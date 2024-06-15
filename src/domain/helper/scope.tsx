import React, {createContext, Dispatch, SetStateAction, useContext, useEffect, useMemo, useState} from "react";

type ContextType<T, V> = [T, Dispatch<SetStateAction<T>>, V]
type DefaultValue<T> = T | (() => T)
type Deps<T> = () => T

export interface Closable {
    close(): void
}

interface Scope<T, V> {
    Context: React.Context<ContextType<T, V>>
    defaultValue: DefaultValue<T>
    deps?: Deps<V>
}

export function createScope<T, V>(
    defaultValue: DefaultValue<T>,
    deps: Deps<V> = () => ({} as V)
): Scope<T, V> {
    const context = createContext<ContextType<T, V>>(
        [{} as never, () => {
        }, {} as V]
    )
    return {
        Context: context,
        defaultValue,
        deps
    }
}

export function useScope<T, V>(scope: Scope<T, V>) {
    return useContext(scope.Context)
}

export function withScope<T, V>(
    scope: Scope<T, V>,
    Page: React.FC,
): React.FC {
    if (!scope.deps) {
        return (params: any) => {
            const [state, setState] = useState(scope.defaultValue)
            return <scope.Context.Provider value={[state, setState, {} as V]}>
                <Page {...params}/>
            </scope.Context.Provider>
        }
    }
    return (params: any) => {
        const [state, setState] = useState(scope.defaultValue)
        const deps = useMemo(() => scope.deps!(), [])

        useEffect(() => {
            return () => {
                if (deps instanceof Object) Object.values(deps).forEach(it => {
                    (it as Closable)?.close();
                });
            }
        }, [deps])
        return <scope.Context.Provider value={[state, setState, deps]}>
            <Page {...params}/>
        </scope.Context.Provider>
    }
}