add = (a) => {
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

add2 = (...a) => {
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


console.log(add(1)(2)(3)().toString())
console.log(add2(1)(2, 3)(4)().toString());