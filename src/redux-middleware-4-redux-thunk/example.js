// redux-thunk를 사용하면 함수를 디스패치 할 수 있다. 함수를 디스패치 할 때에는, 해당함수에서 dispatch 와
// getState 를 파라미터로 받아와 주어야 한다. 이 함수를 만들어 주는 함수를 우리는 thunk 라고 한다.

import axios from "axios";

// const getCommnets = () => (dispatch, getState) => {
//     // 이 안에서는 액션을 dispatch 할 수도 있고
//     // getState를 사용하여 현재 상태도 조회 할 수 있다.
//     const id = getState().post.activeId;

//     // 요청이 시작했음을 알리는 액션
//     dispatch({ type: "GET_COMMENTS" });

//     // 댓글을 조회하는 프로미스를 반환하는 getComment 가 있다고 가정하자.
//     api.getCommnets(id) // 요청을 하고
//         .then((comments) =>
//             dispatch({ typd: "GET_COMMENTS_SUCCESS", id, comments })
//         ) // 성공시
//         .catch((e) => dispatch({ type: "GET_COMMENTS_ERROR", error: e })); // 실패시
// };

// -> thunk 함수에서 async/await를 사용해도 상관없다.
const getCommnets = () => async (dispatch, getState) => {
    const id = getState().post.activeId;
    dispatch({ type: "GET_COMMENTS" });
    try {
        const comments = await axios.get({}).getComments(id);
        dispatch({ type: "GET_COMMENTS_SUCCESS", id, comments });
    } catch (e) {
        dispatch({ type: "GET_COMMENTS_ERROR", error: e });
    }
};
