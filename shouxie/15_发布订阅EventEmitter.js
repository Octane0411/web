const eventHub = {
    queueMap: {},
    on: (name, fn) => {
        // 将事件加入队列
        eventHub.queueMap[name] = eventHub.queueMap[name] || []
        eventHub.queueMap[name].push(fn)
        return undefined
    },
    emit: (name, data) => {
       const q = eventHub.queueMap[name]
        if (!q) return
        q.map((f) => {f.call(undefined, data)})
        return undefined
    },
    off: (name, fn) => {
        if (!eventHub.queueMap[name]) {return}
        for (let i = 0; i < eventHub.queueMap[name].length; i++) {
            let item = eventHub.queueMap[name][i]
            if (fn === item || fn === item.fn) {
                eventHub.queueMap[name].splice(i, 1)
                return
            }
        }
    },
    once: (name, fn) => {
        const o = (...args) => {
            eventHub.off(name, fn)
            fn(...args)
        }
        o.fn = fn
        eventHub.on(name, o)
    }
}

eventHub.once('click', console.log)
eventHub.once('click', console.error)

setTimeout(() => {
    eventHub.emit('click', 'frank')
    eventHub.emit('click', 'frank')
}, 1000)
