import axios from "axios";

// 액션 타입
const INCREASE = "INCREASE";
const DECREASE = "DECREASE";

// 액션 생성 함수
export const increase = () => ({ type: INCREASE });
export const decrease = () => ({ type: DECREASE });

export const increaseAsync = () => async (dispatch) => {
    const response = await axios.get(
        "https://dd4e85e7-9286-4729-93bf-0bcae7acd922.mock.pstmn.io//api/v2/fundings/2/"
    );
    console.log(response);
    dispatch(increase());
};

export const decreaseAsync = () => (dispatch) => {
    setTimeout(() => dispatch(decrease()), 1000);
};

// 초깃값 (상태가 객체가 아니라 그냥 숫자여도 상관 없습니다.)
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
