let add = (a) => {
    let addf = (b) => {
        if (b === undefined) {
            return add(a)
        }
        return add(a + b)
    }
    addf.toString = () => {
        return a
    }
    return addf
}

let add2 = (...a) => {
    let sum = a.reduce((prev, cur) => {return prev+ cur})
    let addf = (...b) => {
        if (b.length < 1) {
            return add2(a)
        }
        sum += b.reduce((prev, cur) => {return prev + cur})
        return add2(sum)
    }
    addf.toString = () => {
        if (sum instanceof Array) {
            return sum[0]
        }
        return sum
    }
    return addf
}

// 观察上诉柯里化调用发现，它其实就是把参数都搜集起来了，每次调用搜集几个参数
// 当搜集的参数足够时执行主方法
const curry = (fn) => {
    // 先记录主方法原始的参数个数，fn.length就是函数接收的参数个数
    const paramsLength = fn.length

    return execFun = (...args) => {
        if (args.length >= paramsLength) {
            return fn(...args)
        } else {
            return (...args2) => {
                //// 注意executeFun接收的参数是平铺的，需要将数组解构
                return execFun(...args.concat(args2))
            }
        }
    }
}


console.log(add(1)(2)(3)().toString())
console.log(add2(1)(2, 3)(4)().toString());