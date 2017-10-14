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
    actual.reverse();
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

function expsplit(polynomials, results) { // need to add zeores between powers
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
    console.log(zerotest[0]);    
    var factoree1 = parseInt(zerotest[0]); // the leading coefficient of greatest power polynomial
    var factoree2 = parseInt(zerotest[1]); // the constant
    console.log(factoree1)
    

    for (var x = 0; x <= factoree1; x++) {
        if (factoree1 % x == 0) {
            polyfacts.push(x)
        }
    }

    for (var x = 0; x <= factoree2; x++) {
        if (factoree2 % x == 0) {
            constfacts.push(x)
        }
    }

    console.log(polyfacts.toString()); // factors of the polynomial coefficient
    console.log(constfacts.toString()); // factors of the constant
}

function cosplit(polynomials, constants) { // not working properly needs to push zeores
   results = [];
   console.log(polynomials.toString())
    for (var x=polynomials.length-1; x >= 0; x--) {
        var pass = x+1;
        console.log(pass);
        if(polynomials[x].search('^'+(pass).toString())) {
           results.push(polynomials[x].split('x')[0])
       }else 
       {
            console.log('^'+(pass).toString())
            results.push('0')
       }
   }
   results.unshift(constants);
   console.log(results.toString())
   return results;
}

function synthetic(gcf, dividends) { // works fine until division step
    results = [];
    console.log('The divisor is: ' + gcf.toString())
    console.log('The dividends are: ' + dividends.toString())
    dividends.forEach(function (element, i) {
        element = parseInt(element);
        console.log(element);
        dividends[i] = element;
    });
    console.log(dividends.toString())
    var divisor = gcf;
    var carry = 0;

    results = division(gcf, dividends);
    console.log(results.toString())   
}

function division(gcf, dividends) {
    length = dividends.length;
    console.log(gcf);
    results = [];
    var carry = 0;

    for(var x = length-1; x >= 0; x--) {
        console.log('This is the ' + x + ' iteration of the loop');
        if(x == length-1) {
            carry = dividends[x];
            results.push(carry)
            console.log('This is the ' + length + ' element')
        }else {
            console.log(carry);            
            carry = (dividends[x] + (carry * gcf))
            console.log(carry);
            results.push(carry);
            console.log('Pushing onto the stack ' + carry.toString())
        }
    }
    return results;
}