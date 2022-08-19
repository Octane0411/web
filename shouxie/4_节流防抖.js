const d = () => {
    console.log(11111)
}

/*
* 我们有一个需求：实现一个搜索框，当用户连续输入的时候不发请求去搜索，
* 只有当用户输入暂停超过500毫秒才发请求。实现这个需求就需要我们的防抖函数了，
* 因为是等待500毫秒才发起请求，我们很容易就想到了setTimeout，如果timer存在，
* 又触发了这个方法，就把timer清了继续等，知道方法不再触发，timer执行
* */


/*
* 节流函数和防抖函数很像，但是针对的需求不一样，比如onScorll方法可能会触发的很频繁，
* 我们不能每次触发的时候都去调回调，会浪费大量性能，我们可能需要每50ms调用一次，那就需要节流函数了
* */



const debounce = (fn, time) => {
    let timer = null
    return (...args) => {
        if (timer) {
            clearTimeout(timer)
        }
        // 立即执行放这里
        timer = window.setTimeout(() => {
            // 延时执行放这里
            fn(...args)
            timer = null
        }, time)
    }
}

const throttle = (fn, time) => {
    let running = false
    return (...args) => {
        if (running) {
            return
        }
        running = true
        // 立即执行放这里
        window.setTimeout(() => {
            running = false
            fn(...args) // 延迟执行放这里
        }, time)
    }
}