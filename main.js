// reduce实现map

function foo() {
    this.a = "a"
    console.log(this === global)
}

foo()

let f = new foo()