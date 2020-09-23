export const truncate = (
    str: string,
    n: number,
    useWordBoundary: boolean = true
) => {
    if (str.length <= n) {
        return str
    }
    const subString = str.substr(0, n - 1)
    return (
        (useWordBoundary
            ? subString.substr(0, subString.lastIndexOf(' '))
            : subString) + '...'
    )
}
