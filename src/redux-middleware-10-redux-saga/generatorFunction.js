// Generator 문법의 핵심은 함수를 작성 할 때 함수를 특정 구간에 멈춰놓을 수도 있고, 원할 때 다시 돌아가게 할 수도 있다.
// 그리고 결과값을 여러번 반환 할 수도 있다.

function weirdFunction() {
    return 1;
    return 2;
    return 3;
    return 4;
    return 5;
}

// 위와 같은 함수에서 값을 여러번에 걸쳐 반환하는 것은 불가능 하다.
// 하지만, 제너레이터 함수를 사용하면 함수에서 값을 순차적으로 반환할 수 있다.
function* generatorFunction() {
    console.log("안녕");
    yield 1;
    console.log("hi again");
    yield 2;
    console.log("제너레이터");
    yield 3;
    return 4;
}

// next를 호출할때 인자를 전달하여 이를 제너레이터 함수 내부에서 사용할 수 있다.
function* sumGenerator() {
    console.log("start sumGenerator");
    let a = yield;
    console.log("get a value");
    let b = yield;
    console.log("get b value");
    yield a + b;
}

const sum = sumGenerator();
sum.next(); // "start sumGenerator"
sum.next(2); // a = 2 / "get a value"
sum.next(3); // b = 3 / "get b value"
sum.next(); // => 5;

// generator로 모니터링 하기
function* watchGenerator() {
    console.log("모니터링 시작");
    while (true) {
        const action = yield;
        if (action.type === "HELLO") {
            console.log("안녕하세요");
        }
        if (action.type === "BYE") {
            console.log("안녕히가세요");
        }
    }
}
