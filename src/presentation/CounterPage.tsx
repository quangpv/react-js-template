import React from "react";
import {useScope, withScope} from "../lib/scope";
import {CounterScope, useAddCount, useReduceCount, useUpdateCountOnMounted} from "../domain/counter.case";

function CounterPage() {
    useUpdateCountOnMounted()
    const [state,] = useScope(CounterScope);
    const addCount = useAddCount()
    const reduceCount = useReduceCount()

    return <div style={{display: 'flex', flexDirection: "column"}}>
        <h1>Counter</h1>
        <p>Count: {state.count}</p>
        <button onClick={addCount}>Increment</button>
        <button onClick={reduceCount}>Decrement</button>
    </div>
}

export default withScope(CounterScope, CounterPage);
