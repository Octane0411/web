function test() {
    var x = {name: 'x'};
    var y = {name: 'y', content: "-----这里很长，有一万三千五百个字符那么长----" }
    return function fn() {
        return x;
    };
}

const myFn = test() // myFn 就是 fn 了
const myX = myFn() // myX 就是 x 了
// 请问，y 会消失吗？