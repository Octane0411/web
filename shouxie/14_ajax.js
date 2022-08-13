let XMLHttpRequest = require('xhr2')
let xhr = new XMLHttpRequest()
xhr.open('GET', 'https://www.baidu.com')
xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
        if (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {
            console.log('success')
        } else {
            console.log('fail')
        }
    }
}
xhr.onload = () => {
    console.log('得到内容')
}
xhr.onerror = () => {
    console.log('失败了')
}
xhr.send('{"name":"frank"}')
