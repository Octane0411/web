// reduce实现map

Array.prototype.myMap = function (fn, thisArg=[]) {
    let res = []
    res[0] = fn(this[0])
    this.reduce((pre, cur, index, arr) => {
        res.push(fn.call(thisArg, cur, index, arr))
    })
    return res
}

let a = [1, 2, 3, 5]

const b = a.myMap((item, index, arr) => {
    console.log(item)
    return item * 2
})

console.log(b)