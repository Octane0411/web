// 一层的浅拷贝
function shallowCopy(obj) {
    if (typeof obj !== 'object') return
    let newObj = obj instanceof Array ? [] : {}
    for (let key in obj) {
        // 使用hasOwnProperty来判断是否是自身属性
        // 只拷贝自身属性，不拷贝原型链上的属性，即继承属性
        if (obj.hasOwnProperty(key)) {
            newObj[key] = obj[key]
        }
    }
    return newObj
}


let target = {
    name: 'John',
    age: 20,
    friend: {
        name: 'Michel',
        age: 30
    }
}

// 深拷贝 JSON
// 使用JSON.stringify不能将方法和undefined转化为字符串，会丢失
let newObj = JSON.parse(JSON.stringify(target))
// 为了解决上面的问题
// 但是for...in拿不到symbol属性
const deepCopy = (obj) => {
    const res = Array.isArray(obj) ? [] : {}
    // 用 Reflect.ownKeys可以获取Symbol属性，用for...of来循环数组
    for (let key of Reflect.ownKeys(obj)) {
        if (obj.hasOwnProperty(key)) {
            // 如果属性也是对象，递归调用自身
            //用Object.getOwnPropertySymbols和Reflect.ownKeys。
            // Object.getOwnPropertySymbols会返回对象的Symbol属性列表
            //Reflect.ownKeys会返回对象的所有自有属性，包括Symbol属性和不可枚举属性，但是不包括继承属性。
            if (obj[key] && typeof obj[key] === "object") {
                res[key] = deepCopy(obj[key])
            } else {
                res[key] = obj[key]
            }
        }
    }
    return res
}
