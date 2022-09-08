// 获取url中的参数
let u = "http://www.nowcoder.com?key=1&key=2&key=3&test=4#hehe key"
const getParams = (url) => {

}



// mergeObject

const mergeObject = (obj1, obj2) => {
    let ret = {}
    for (const key in obj1) {
        ret[key] = obj1[key]
    }
    for (const key in obj2) {
        if (obj2[key] instanceof Object) {
            ret[key] = mergeObject(ret[key], obj2[key])
        } else {
            ret[key] = obj2[key]
        }
    }
    return ret
}

var obj1 = {
    a: 1,
    b: {
        c: 2,
        d: 3
    },
    e: 4,
    h: {
        i: 5
    }
}
var obj2 = {
    a: 111,
    b: {
        c: 222,
        f: 333
    },
    g: 444,
    h: 666
}

console.log(mergeObject(obj1, obj2))