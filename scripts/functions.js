function termsplit(polynomial) {
    arr = polynomial.match(/(\+|\-)?[a-z0-9.^]+/gi); // splits polynomial into seperate terms
    return arr;
}


function bubbleSort(items, actual) {
    var length = items.length;
    for (var i = 0; i < length; i++) { //Number of passes
        for (var j = 0; j < (length - i - 1); j++) { //Notice that j < (length - i)
            //Compare the adjacent positions
            if (items[j] > items[j + 1]) {
                //Swap the numbers
                var tmp = items[j]; //Temporary variable to hold the current number
                items[j] = items[j + 1]; //Replace current number with adjacent number
                items[j + 1] = tmp; //Replace adjacent number with current number

                var tmp2 = actual[j]; //Temporary variable to hold the current number
                actual[j] = actual[j + 1]; //Replace current number with adjacent number
                actual[j + 1] = tmp2; //Replace adjacent number with current number
            }
        }
    }
}

function GCF(array1, array2) {
    var gcf = 0;
    array1.forEach(function (element) {
        if (array2.includes(element)) {
            gcf = parseInt(element);
        }
    });
    return gcf;
}

function polyorconst(arr, constants, polynomials) {

    arr.forEach(function (term) { //                      seperates the constant from the terms containing variables
        var constant = /^\d+$/.test(term);
        var constant = /^[-|+]?\d*\.?\d+$/.test(term);
        if (constant == true) {
            constants.push(term);
        } else {
            polynomials.push(term);
        }
    });
}

function expsplit(polynomials, results) {
    polynomials.forEach(function (poly) { // splits the exponent from the terms containing variables
        var power = 0;
        if (poly.includes('^')) {
            power = parseInt(poly.split('^')[1]);
        } else {
            power = 1;
        }
        results.push(power);
    })
}

function zerotester(polynomials, constants) {
    var zerotest = [];
    console.log(polynomials.toString());
    console.log(polynomials[0]);
    var leadingterm = polynomials[0].split(/[a-zA-Z](.+)/)[0];
    console.log(leadingterm);
    zerotest.push(leadingterm);
    if (constants[0] != null) {
        zerotest.push(constants[0]);
    }
    console.log(zerotest.toString());
    return zerotest;
}

function getFactors(zerotest, polyfacts, constfacts) {
    var factoree1 = parseInt(zerotest[0]); // the leading coefficient of greatest power polynomial
    var factoree2 = parseInt(zerotest[1]); // the constant

    for (x = 0; x <= factoree1; x++) {
        if (factoree1 % x == 0) {
            polyfacts.push(x)
        }
    }

    for (x = 0; x <= factoree2; x++) {
        if (factoree2 % x == 0) {
            constfacts.push(x)
        }
    }

    console.log(polyfacts.toString()); // factors of the polynomial coefficient
    console.log(constfacts.toString()); // factors of the constant
}