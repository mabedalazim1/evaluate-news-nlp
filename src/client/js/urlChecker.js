function checkURL(input) {
    var testRegex = input.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);

     if(testRegex == null){
        return 0
     } else {
        return 1
     }
 }

 export { checkURL }
