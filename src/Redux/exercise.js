import { createStore } from "redux";

// 리덕스에서 관리 할 상태 정의
const initialState = {
    counter: 0,
    text: "",
    list: [],
};

// 액션 타입 정의
const INCREASE = "INCREASE";
const DECREASE = "DECREASE";
const CHANGE_TEXT = "CHANGE_TEXT";
const ADD_TO_LIST = "ADD_TO_LIST";

// 액션 생성함수 정의
const increase = () => ({
    type: INCREASE,
});

const decrease = () => ({
    type: DECREASE,
});

const changeText = (text) => ({
    type: CHANGE_TEXT,
    text,
});

const addToList = (item) => ({
    type: INCREASE,
    item,
});

// 리듀서 만들기
// 위 액션 생성함수들을 통해 만들어진 객체들을 참조하여 새로운 상태를 만드는 함수를 만든다.
// 주의: 리듀서는 불변성을 지켜야한다.
function reducer(state, action) {
    switch (action.type) {
        case INCREASE:
            return {
                ...state,
                counter: state.counter + 1,
            };

        case DECREASE:
            return {
                ...state,
                counter: state.counter - 1,
            };
        case CHANGE_TEXT:
            return {
                ...state,
                text: action.text,
            };
        case ADD_TO_LIST:
            return {
                ...state,
                list: state.list.concat(action.item),
            };
        default:
            return state;
    }
}

// 스토어 만들기
const store = createStore(reducer);

// 스토어 안에 들어있는 상태를 조회
console.log(store.getState());

// 스토어 안에 들어있는 상태가 바뀔 때 마다 호출되는 listener 함수
const listener = () => {
    const state = store.getState();
    console.log(state);
};

// 구독을 해제하고 싶을 때는 unsubscribe를 호출한다.
const unsubscribe = store.subscribe(listener);

// 액션 디스패치
store.dispatch(increase());
store.dispatch(decrease());
store.dispatch(changeText("안녕요"));
store.dispatch({ id: 1, text: "오잇" });
