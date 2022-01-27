import React from "react";
import {
    increase,
    decrease,
    increaseAsync,
    decreaseAsync,
} from "./modules/counter";
import { useSelector, useDispatch } from "react-redux";
import Counter from "./Counter";

function CounterContainer() {
    const number = useSelector((state) => state.counter);
    const dispatch = useDispatch();

    const onIncrease = () => dispatch(increase());
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
