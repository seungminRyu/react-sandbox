// asyncUtils 를 이용하여 기존의 함수 리펙터링
import * as postAPI from "../api/posts";
import {
    createPromiseThunk,
    handleAsyncActions,
    reducerUtils,
} from "../lib/asyncUtils";

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

// 아주 쉽게 thunk 함수를 만들 수 있게 된다.
export const getPosts = createPromiseThunk(GET_POSTS, postAPI.getPosts);
export const getPost = createPromiseThunk(GET_POST, postAPI.getPostById);

const initialState = {
    posts: reducerUtils.initial(),
    post: reducerUtils.initial(),
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
