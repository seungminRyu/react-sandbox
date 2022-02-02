import { delay, put, takeEvery, takeLatest } from "redux-saga/effects";

const INCREASE = "INCREASE";
const DECREASE = "DECREASE";
const INCREASE_ASYNC = "INCREASE_ASYNC";
const DECREASE_ASYNC = "DECREASE_ASYNC";

export const increase = () => ({ type: INCREASE });
export const decrease = () => ({ type: DECREASE });
export const increaseAsync = () => ({ type: INCREASE_ASYNC });
export const decreaseAsync = () => ({ type: DECREASE_ASYNC });

//  초기 상태 선언
const initialState = 0;

export default function counter(state = initialState, action) {
    switch (action.type) {
        case INCREASE:
            return state + 1;
        case DECREASE:
            return state - 1;
        default:
            return state;
    }
}

// 기본적인 액션과 리듀서를 만든 후 제너레이터 함수를 만든다.
// redux-saga 에서 이를 "사가" 라고 부른다.
function* increaseSaga() {
    yield delay(1000); // 1초를 기다린다.
    yield put(increase()); // put은 특정 액션을 디스패치 한다.
}

function* decreaseSaga() {
    yield delay(1000); // 1초를 기다린다.
    yield put(decrease()); // put은 특정 액션을 디스패치 한다.
}

// 그 다음에는 takeEvery, takeLatest 라는 유틸함수들을 사용한다.
// 이 함수들은 액션을 모니터링 하는 함수이다. takeEvery는 특정 액션 타입에 대해서 디스패치되는 모든 액션들을 처리하는 것이고,
// takeLatest는 특정 액션타입에 대하여 디스패치된 가장 마지막 액션만을 처리하는 함수이다. 예를 들어 특정 액션을 처리하고 있는 동안 동일한
// 타입의 새로운 액션이 디스패치되면 기존에 하던 작업을 무시 처리하고 새로운 작업을 시작한다.
export function* counterSaga() {
    yield takeEvery(INCREASE_ASYNC, increaseSaga);
    yield takeLatest(DECREASE_ASYNC, decreaseSaga);
}
// 사가들을 모두 합칠 루트 사가를 만들어야 한다.
