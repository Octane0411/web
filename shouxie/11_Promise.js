/*
* 无then链式调用版
* */
/*
class Promise2 {
    callbacks = [] // [[onFulFilled, onRejected]]
    #status = 'pending'
    constructor(fn) {
        const resolve = (data) => {
            this.#status = 'fulfilled'
            const f1f2 = this.callbacks.shift()
            if (!f1f2 || !f1f2[0]) {
                return
            }
            const x = f1f2[0].call(undefined, data)
            if (x instanceof Promise2) {
                x.then((data) => {
                    // 调用下一个f1
                    resolve(data)
                }, (reason) => {
                    // 调用下一个f2
                    reject(reason)
                })
            } else {
                // 调用下一个f1
                resolve(x)
            }
        }
        const reject = (reason) => {
            this.#status = 'rejected'
            const f1f2 = this.callbacks.shift()
            if (!f1f2 || !f1f2[1]) {
                return
            }
            const x = f1f2[1].call(undefined, reason)
            if (x instanceof Promise2) {
                x.then((data) => {
                    // 调用下一个f1
                    resolve(data)
                }, (reason) => {
                    // 调用下一个f2
                    reject(reason)
                })
            } else {
                // 调用下一个f1
                resolve(x)
            }
        }
        fn.call(undefined, resolve, reject)
    }
    then(onFulFilled, onRejected) {
        this.callbacks.push([onFulFilled, onRejected])
    }
}

const p = new Promise2((resolve, reject) => {
    setTimeout(() => {
        reject('hi')
    },  3000)
})

p.then((data) => {
    console.log(data)
}, (reason) => {
    console.error(reason)
})*/

Promise.myAll = (list) => {
    const res = []
    let count = 0 // 成功的promise的数量
    return new Promise((resolve, reject) => {
        list.map((item, index) => {
            item.then((r) => {
                res[index] = r
                count++
                if (count === list.length) {
                    resolve(res)
                }
            }, (reason) => {
                reject(reason)
            })
        })
    })
}