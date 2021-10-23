function checkURL(input) {
    let testRegex = /^(http|https):\/\/[^ "]+$/
    return testRegex.test(input)
 }

 export { checkURL }
