// 리액트에 리덕스를 적용하기위해 리덕스 모듈을 만든다. 리덕스 모듈은 다음 항목들이 모두 있는 js 파일을 의미한다.
// - 액션 타입
// - 액션 생성함수
// - 리듀서
// 리듀서와 액션 관련 코드들을 하나의 파일에 몰아서 작성한다. 이를 Duck 패턴이라고 한다.

// counter 모듈
// 액션 타입 만들기
// Ducks 패턴을 따를 때는 액션의 이름에 접두사를 넣어준다.
// 이렇게 하면 다른 모듈과 액션 이름이 중복되는 것을 방지 할 수 있다.
const SET_DIFF = "counter/SET_DIFF";
const INCREASE = "counter/INCREASE";
const DECREASE = "counter/DECREASE";

// 액션 생성함수 만들기
// 액션 생성함수를 만들고 export 키워드를 사용해서 내보내준다.
export const setDiff = (diff) => ({ type: SET_DIFF, diff });

export const increase = () => ({ type: INCREASE });

export const decrease = () => ({ type: DECREASE });

//  초기 상태 선언
const initialState = {
    number: 0,
    diff: 1,
};

// 리듀서 선언
// 리듀서는 export default로 내보낸다.
export default function counter(state = initialState, action) {
    switch (action.type) {
        case SET_DIFF:
            return {
                ...state,
                diff: action.diff,
            };
        case INCREASE:
            return {
                ...state,
                number: state.number + state.diff,
            };
        case DECREASE:
            return {
                ...state,
                number: state.number - state.diff,
            };
        default:
            return state;
    }
}
