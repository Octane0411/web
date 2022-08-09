// 实现一个数组的map

Array.prototype.myMap = function(fn, thisArg=[]) {
    let res = []
    let arr = this
    for (let i = 0; i < arr.length; i++) {
        res.push(fn.call(thisArg, arr[i], i, arr))
    }
    return res
}

const a = [1, 2, 3]
const b = a.myMap((item) => {return item * 2})

console.log(b)