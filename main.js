// reduce实现map

Array.prototype.myReduce = function (fn, initialValue=this[0]) {
    let res = initialValue
    let arr = this
    let preValue = initialValue
    for (let i = 0; i < arr.length; i++) {
        const item = arr[i]
        preValue = fn(preValue, item, i, arr)
    }
    return preValue
}

let a = [1, 2, 3, 5]

const b = a.reduce((pre, cur) => {
    return pre + cur
})

console.log(b)