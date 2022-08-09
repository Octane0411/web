function debounce(func, time) {
    let timeout = null
    return function() {
        clearTimeout(timeout)
        timeout = setTimeout(() => {func.apply(this, args)}, time)
    }
}