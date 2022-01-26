import React from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import Counter from "./Counter";
import { increase, decrease, setDiff } from "../redux-2-module/counter";

function CounterContainer() {
    const { number, diff } = useSelector((state) => ({
        number: state.counter.number,
        diff: state.counter.diff,
    }));
    // -> 매번 렌더링 될때마다 새로운 객체를 만들기 때문에 상태가 바뀐것을 확인할 수 없어서 낭비 렌더링이 이루어 진다.

    // 해결 방법 1, useSelector를 여러번 사용
    const _diff = useSelector((state) => state.counter.diff);
    const _number = useSelector((state) => state.counter.number);

    // 해결 방법 2, react-redux의 shallowEqual 함수를 useSelector의 두번째 인자로 전달한다.
    const { __number, __diff } = useSelector(
        (state) => ({
            number: state.counter.number,
            diff: state.counter.diff,
        }),
        shallowEqual
    );
    // useSelector의 두번째 파라미터, equlityFn?: (left: any, right: any) => boolean
    // 이전값과 다음값을 비교하여 true일 경우 리렌더링, false일 경우 리렌더링 X
    // 단 객체의 가장 겉에 있는값들만 비교해준다.
    const object = {
        a: {
            x: 3,
            y: 2,
            z: 1,
        },
        b: 1,
        c: [{ id: 1 }],
    };
    // -> 여기서 object.a, object.b, object.c 들을 비교하지만
    // object.x 또는 object.c[0] 과 같은 값들은 비교하지 않는다.

    const dispatch = useDispatch();

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
