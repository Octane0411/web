const add = x => x + 10;
const multiply = x => x * 10;


// compose函数可以将需要嵌套执行的函数平铺
// 例如 multiply(add(10))
const compose = function () {
    // 将接受的参数存到一个数组, args=[multiply,add]
    const args = [].slice.apply(arguments)
    return function (x) {
        return args.reduceRight((res, callback) => callback(res), x)
    }
}
const composeES6 = (...args) => x => args.reduceRight((res, callback) => callback(res), x)
// 将参数平铺，从右往左嵌套执行
let myFn = compose(multiply, add)
console.log(myFn(10));
console.log(multiply(add(10)))

//pipe函数跟compose函数的左右是一样的，也是将参数平铺，只不过他的顺序是从左往右。我们来实现下，只需要将reduceRight改成reduce就行了
const pipe = function(){
    const args = [].slice.apply(arguments);
    return function(x) {
        return args.reduce((res, cb) => cb(res), x);
    }
}