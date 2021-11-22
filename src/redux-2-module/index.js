// 루트 리듀서
// 두 가지의 리덕스 모듈을 한 프로젝트에서 한 리듀서로 합쳐서 사용해야 한다.
// 합쳐진 리듀서를 루트 리듀서라 한다.
// 리듀서를 합치는 작업은 리덕스에 내장되어있는 combineReducers 라는 함수를 사용한다.
import { combineReducers } from "redux";
import counter from "./counter";
import todos from "./todo";

const rootReducer = combineReducers({
    counter,
    todos,
});

export default rootReducer;
