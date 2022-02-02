import React from "react";
import {
    increaseAsync,
    decreaseAsync,
} from "../redux-middleware-10-redux-saga/modules/counter";
import { useSelector, useDispatch } from "react-redux";
import Counter from "./Counter";

function CounterContainer() {
    const number = useSelector((state) => state.counter);
    const dispatch = useDispatch();

    const onIncrease = () => dispatch(increaseAsync());
    const onDecrease = () => dispatch(decreaseAsync());

    return (
        <Counter
            number={number}
            onIncrease={onIncrease}
            onDecrease={onDecrease}
        />
    );
}

export default CounterContainer;
