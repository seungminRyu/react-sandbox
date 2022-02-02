import * as postsAPI from "../../redux-middleware-5-promise/api/posts";
import {
    reducerUtils,
    handleAsyncActions,
    handleAsyncActionsById,
    createPromiseSaga,
    createPromoiseSagaById,
} from "../../redux-middleware-5-promise/lib/asyncUtils";
import { takeEvery, getContext } from "redux-saga/effects";

/* 액션 타입 */

// 포스트 여러개 조회하기
// 포스트 여러개 조회하기
const GET_POSTS = "GET_POSTS"; // 요청 시작
const GET_POSTS_SUCCESS = "GET_POSTS_SUCCESS"; // 요청 성공
const GET_POSTS_ERROR = "GET_POSTS_ERROR"; // 요청 실패

// 포스트 하나 조회하기
const GET_POST = "GET_POST";
const GET_POST_SUCCESS = "GET_POST_SUCCESS";
const GET_POST_ERROR = "GET_POST_ERROR";

const GO_TO_HOME = "GO_TO_HOME";

export const getPosts = () => ({ type: GET_POSTS });
// payload는 파라미터 용도, meta는 리듀서에서 id를 알기위한 용도
export const getPost = (id) => ({ type: GET_POST, payload: id, meta: id });
export const goToHome = () => ({ type: GO_TO_HOME });

const initialState = {
    posts: reducerUtils.initial(),
    post: reducerUtils.initial(),
};

// function* getPostsSaga() {
//     try {
//         // call 을 사용하면 특정 함수를 호출하고 결과물이 반환될때 까지 기다려 줄수있다.
//         const posts = yield call(postsAPI.getPosts);
//         yield put({
//             type: GET_POSTS_SUCCESS,
//             payload: posts,
//         }); // 성공 액션 디스패치
//     } catch (e) {
//         yield put({
//             type: GET_POSTS_SUCCESS,
//             error: true,
//             payload: e,
//         }); // 실패 액션 디스패치
//     }
// }
// ->
const getPostsSaga = createPromiseSaga(GET_POSTS, postsAPI.getPosts);

// function* getPostSaga(action) {
//     const param = action.payload;
//     const id = action.meta;
//     try {
//         // API함수에 넣어주고 싶은 인자는 call함수의 두번째 인자부터 순서대로 넣어주면 된다.
//         const post = yield call(postsAPI.getPostById, param);
//         yield put({
//             type: GET_POST_SUCCESS,
//             payload: post,
//             meta: id,
//         });
//     } catch (e) {
//         yield put({
//             type: GET_POST_ERROR,
//             error: true,
//             payload: e,
//             meta: id,
//         });
//     }
// }
// ->
const getPostSaga = createPromoiseSagaById(GET_POST, postsAPI.getPostsById);

function* goToHomeSaga() {
    const history = yield getContext("history");
    history.push("/");
}

export function* postsSaga() {
    yield takeEvery(GET_POSTS, getPostsSaga);
    yield takeEvery(GET_POST, getPostSaga);
    yield takeEvery(GO_TO_HOME, goToHome);
}

// 3번째 인자를 사용하면 withExtraArgument 에서 넣어준 값들을 사용 할 수 있다.
export const goHome =
    () =>
    (dispatch, getState, { history }) => {
        history.push("/");
    };

export default function posts(state = initialState, action) {
    switch (action.type) {
        case GET_POSTS:
        case GET_POSTS_SUCCESS:
        case GET_POSTS_ERROR:
            return handleAsyncActions(GET_POSTS, "posts")(state, action);
        case GET_POST:
        case GET_POST_SUCCESS:
        case GET_POST_ERROR:
            return handleAsyncActions(GET_POST, "post")(state, action);
        default:
            return state;
    }
}
