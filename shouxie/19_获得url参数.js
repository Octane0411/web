/*
(1) 指定参数名称，返回该参数的值 或者 空字符串
(2) 不指定参数名称，返回全部的参数对象 或者 {}
(3) 如果存在多个同名参数，则返回数组
(4) 不支持URLSearchParams方法

示例
输入
http://www.nowcoder.com?key=1&key=2&key=3&test=4#hehe key

输出
[1, 2, 3]*/

let getParams = (url, keyName) => {
    let kvs = url.split("?")[1]?.split("#")[0]?.split("&")
    if (!keyName) {

    }
    let res = []
    kvs.
    console.log(kvs)
}

getParams("http://www.nowcoder.com?key=1&key=2&key=3&test=4#hehe key")
