function possibleZeros(polyfacts, constfacts) {
    var bigVar = 0;
    var smallVar = 0;
    var res = []
    if (constfacts.length > polyfacts.length) {  // find out which has more factors and use it as dividend
        bigVar = constfacts.length
        smallVar = polyfacts.length
    }
    else {
        bigVar = polyfacts.length
        smallVar = constfacts.length
    }
    for (var y = 0; y < smallVar; y++) {        // loop runs until smallest array is done
        for (var x = 0; x < bigVar; x++) {      // loop runs through biggest array on each increment of first loop
            res.push(constfacts[x]/polyfacts[y])
            //console.log('push to new array: ', res[x])
        }
    }
    console.log('printing', res.toString())
    var temp = res[0]
    return temp
}