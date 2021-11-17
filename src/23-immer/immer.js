// 벨로퍼트 리액트 21/11/17
// 23 - Immer를 사용한 더 쉬운 불변성관리

import produce from "immer";

// 리액트에서 배열이나 객체를 업데이트 해야 할 때에는 직접 수정하는 것이 아닌 불변성을 지키는 업데이트를 해주어야 한다.
// 아래과 같은 코드처럼 하면 안된다.
const obj = {
    a: 1,
    b: 2,
};

obj.b = 3; // 불변성 X

// 아래와 같이 spread 연산자를 사용하여 새로운 객체를 만들어야 한다.
const nextObj = {
    ...obj,
    b: 3,
};

// 배열도 마찬가지로 push, splice 등의 함수를 사용하거나 n 번째 항목을 직접 수정하면 안되고
// concat, filter, map 등의 함수를 사용해야 한다.

// 대부분의 경우 spread 연산자 또는 배열 내장함수를 사용하는건 그렇게 어렵지 않지만 데이터의 구조가 까다로워지면
// 불변성을 지키가면서 새로운 데이터를 생성해내는 코드가 조금 복잡해 진다.

const state = {
    posts: [
        {
            id: 1,
            title: "제목",
            body: "내용",
            comment: [
                {
                    id: 1,
                    text: "진짜 재밌어요! ㅎㅎ",
                },
            ],
        },
        {
            id: 2,
            title: "제목",
            body: "내용",
            comment: [
                {
                    id: 1,
                    text: "ㄹㅇㅋㅋㅋㅋㅋ",
                },
            ],
        },
    ],
    selectedId: 1,
};

// posts 안의 배열에 id가 post객체를 찾아서, comments 댓글에 객체를 추가해준다고 할때
// 아래와 같이 된다.

const nextState = {
    ...state,
    posts: state.posts.map((post) =>
        post.id === 1
            ? {
                  ...post,
                  comments: post.comments.concat({
                      id: 3,
                      test: "새로운 댓글",
                  }),
              }
            : post
    ),
};

// 어렵진 않지만 한눈에 들어오지 않는다.
// immer를 사용하여 다음과 같이 구현할 수 있다.

const newNextState = produce(state, (draft) => {
    const post = draft.posts.find((post) => post.id === 1);
    post.comments.push({
        id: 3,
        text: "새로운 댓글",
    });
});
