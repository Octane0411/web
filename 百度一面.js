// 给定一个只包括 '('，')'，'{'，'}'，'['，']'的字符串 s ，判断字符串是否有效。
// 有效字符串需满足：
// 左括号必须用相同类型的右括号闭合。
// 左括号必须以正确的顺序闭合。
const valid = (str) => {
    let stack = []
    for (let i = 0; i < str.length; i++) {
        let cur = str[i]
        if (cur === '(' || cur === '[' || cur === '{') {
            stack.push(cur)
        } else {
            let top = stack.pop()
            if ((top === '(' && cur === ')' )
                || (top === '[' && cur === ']' )
                || (top === '{' && cur === '}') ) {
                continue
            } else {
                return false
            }
        }
    }
    return stack.length === 0
}

let debounce = (fn, time, thisArg) => {
    let timer = null
    return (...args) => {
        if (timer !== null) {
            clearTimeout(timer)
        }
        timer = setTimeout(() => {
            fn.call(thisArg, ...args)
            timer = null
        }, time)
    }
}