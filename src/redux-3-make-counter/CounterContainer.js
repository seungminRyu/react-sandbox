// 컨테이너 컴포넌트
// 컨테이너 컴포넌트란, 리덕스 스토어의 상태를 조회하거나, 액션을 디스패치 할 수 있는 컴포넌트를 의미한다.
// 그리고 HTML 태그들을 사용하지 않고 다른 프리젠테이셔널 컴포넌트들을 불러와서 사용한다.
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Counter from "./Counter";
import { increase, decrease, setDiff } from "../redux-2-module/counter";

function CounterContainer() {
    // useSelector 는 리덕스 스토어의 상태를 조회하는 Hook이다.
    // state의 값은 store.getState() 함수를 호출했을 때 나타나는 결과물과 동일하다.

    const { number, diff } = useSelector((state) => ({
        number: state.counter.number,
        diff: state.counter.diff,
    }));

    // useDispatch 는 리덕스 스토어의 dispatch를 함수에서 사용 할 수 있게 해주는 Hook이다.
    const dispatch = useDispatch();

    // 각 액션을 디스패치하는 함수들이다.
    const onIncrease = () => dispatch(increase());
    const onDecrease = () => dispatch(decrease());
    const onSetDiff = (diff) => dispatch(setDiff(diff));

    return (
        <Counter
            // 상태와
            number={number}
            diff={diff}
            // 액션을 디스패치하는 함수를 props로 넣어준다.
            onIncrease={onIncrease}
            onDecrease={onDecrease}
            onSetDiff={onSetDiff}
        />
    );
}

export default CounterContainer;
