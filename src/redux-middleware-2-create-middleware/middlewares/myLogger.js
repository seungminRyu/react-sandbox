const myLogger = (store) => (next) => (action) => {
    console.log(action); // 액션 출력
    const result = next(action); // 다음 미들웨어 (또는 리듀서) 에게 액션 전달.

    console.log("\t", store.getState());

    return result; // 여기서 반환하는 값은 dispatch의 결과물이 된다.
};

// 액션 값을 객체가 아닌 함수도 받아오게 만들어서 액션이 함수타입이면 이를 실행시키게끔 할 수 있다.
// 이게 react-thunk가 하는 일
// const thunk = store => next => action =>
//     typeof action === "function"
//         ? action(store.dispatch, store.getState)
//         : next(action);

// const myThunk = () => (dispatch, getState) => {
//     dispatch({ type: "HELLO"});
//     dispatch({type: "BYE"});
// }

// dispatch(myThunk());

export default myLogger;
