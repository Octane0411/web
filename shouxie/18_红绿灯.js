let timer = null

const process = (time, light) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(light)
            resolve()
        }, time)
    })
}

const main = () => {
    process(1000, 'red').then(() => {
        return process(2000, 'yellow')
    }).then(() => {
        return process(3000, 'red')
    })
}