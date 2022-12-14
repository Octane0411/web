Function.prototype.myCall = function (thisArg = window, ...args) {
    if (typeof this !== 'function') {
        throw new Error('expected function')
    }
    if (thisArg === null) {
        thisArg = window
    }
    thisArg.fn = this
    const res = thisArg.fn(...args)
    delete thisArg.fn
    return res
}

Function.prototype.myApply = function (thisArg = window, args) {
    if (thisArg === null) {
        thisArg = window
    }
    thisArg.fn = this
    const res = thisArg.fn(...args)
    delete thisArg.fn
    return res
}

Function.prototype.myBind = function (thisArg = window, ...args) {
    const fn = this
    return function newFn(...newArgs) {
        if (this instanceof newFn) {
            return new fn(...args, ...newArgs)
        }
        return fn.apply(thisArg, [...args, ...newArgs])
    }
}
const echo = function (str) {
    console.log(this)
    console.log(str)
}

let obj = {
    name: "dog"
}

echo.myCall(obj, 'hello')