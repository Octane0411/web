const fibonacci = (x) => {
    if(x === 1 || x === 2){
        return 1;
    }

    return fibonacci(x - 1) + fibonacci(x - 2);
}

const memo = (fn, hasher) => {
    const memoFunc = function () {
        const cache = memoFunc.cache
        const args = [].slice.apply(arguments)
        const hashKey = hasher?hasher.apply(this, arguments): args[0]
        if (!cache[hashKey]) {
            cache[hashKey] = fn.apply(this, arguments)
        }
        return cache[hashKey]
    }
    memoFunc.cache = {}
    return memoFunc
}


const cachedFibonacci = memo(fibonacci);

// 然后看下效果
let startTime = new Date().getTime();
cachedFibonacci(40);
let needTime = new Date().getTime() - startTime;

console.log(needTime); // 第一次运行时间还是959毫秒

// 再调一次
startTime = new Date().getTime();
cachedFibonacci(40);
needTime = new Date().getTime() - startTime;

console.log(needTime); // 时间直接变为0了，直接取缓存，快到1毫秒都不要