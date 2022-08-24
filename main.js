let a = {
    first: 1,
    second: {
        third: 2
    }
}

let b = {...a}
b.second.third = 3
b.first = 4
console.log(a)
