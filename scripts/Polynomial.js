class Polynomial {
    constructor(equation, finaloutput) {
        this.polynomial = equation;
        this.tempoly = equation;
        this.arr = [];
        this.polynomials = [];
        this.constants = [];
        this.sortpolysresults = [];
        this.zerotest = [];
        this.polyfacts = [];
        this.constfacts = [];
        this.pZero = 0; // potential zero
        this.pZeroes = [];
        this.actZero = 0;
        this.dividends = [];
        this.finalString = finaloutput;
    }

    syntheticdivision() {
        console.log('The polynomial is: ' + this.polynomial);
        this.termsplit();
        console.log('The split terms are: ' + this.arr.toString());
        console.log('The current equation is: ' + this.finalString + '(' + this.polynomial + ')');

        this.polyorconst();
        console.log(this.polynomials.toString());
        console.log(this.constants.toString());
        this.sortpolysresults = this.expsplit();
        if (this.sortpolysresults[0] > 2) { // checks if the first term's exponent is greater than ^2
            console.log(this.sortpolysresults.toString());
            this.bubbleSort(this.sortpolysresults, this.polynomials);
            console.log(this.polynomials.toString());
            descartes(this.tempoly);
            this.zerotest = this.testTerms();
            this.getFactors();
            this.possibleZeros();
            this.cosplit();
            //this.pZero = this.possibleZeros();
            //this.dividends = cosplit();
            var next = this.synthetic();
            var pass = rejoin(next);
            let poly2 = new Polynomial(pass, this.finalString);
            poly2.syntheticdivision();
        } else { // quadratic needs to take place when the first term's exponent is ^2

        }
    }


    termsplit() {
        this.arr = this.polynomial.match(/(\+|\-)?[a-z0-9.^]+/gi); // splits polynomial into seperate terms
    }

    bubbleSort(items, actual) {
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


    polyorconst() {
        var constants = []
        var polynomials = []
        this.arr.forEach(function (term) { //                      seperates the constant from the terms containing variables
            //var constant = /^\d+$/.test(term);
            console.log(term);
            var constant = /^[-|+]?\d*\.?\d+$/.test(term);
            console.log(constant);
            if (constant == true) {
                constants.push(term);
            } else {
                polynomials.push(term);
            }
        });
        this.constants = constants;
        this.polynomials = polynomials;
    }

    expsplit() { // need to add zeores between powers
        var results = [];
        this.polynomials.forEach(function (poly) { // splits the exponent from the terms containing variables
            var power = 0;
            if (poly.includes('^')) {
                power = parseInt(poly.split('^')[1]);
            } else {
                power = 1;
            }
            results.push(power);
        })
        return results;
    }

    testTerms() { // takes the leading term of the polynomials and the constant term to pass to the getFactors method
        var zerotest = [];
        console.log(this.polynomials.toString());
        //console.log(polynomials[0]);
        var leadingterm = this.polynomials[0].split(/[a-zA-Z](.+)/)[0];
        console.log('The leading polynomial term is: ' + leadingterm);
        zerotest.push(leadingterm);
        if (this.constants[0] != null) {
            zerotest.push(this.constants[0]);
        }
        console.log(zerotest.toString());
        return zerotest;
    }

    getFactors() { // finds the common factors of the leading polynomial term and the constant term
        // console.log(zerotest[0]);
        //console.log(zerotest[1]);    
        var factoree1 = parseInt(this.zerotest[0]); // the leading coefficient of greatest power polynomial
        var factoree2 = parseInt(this.zerotest[1]); // the constant
        console.log(factoree1);
        console.log(factoree2);


        if (Math.sign(factoree1) == 1) { // loop for positive polynomial terms
            for (var x = 0; x <= factoree1; x++) {
                if (factoree1 % x == 0) {
                    this.polyfacts.push(x)
                }
            }
        } else if (Math.sign(factoree1) == -1) { // loop for factors of negative polynomial term
            for (var x = factoree1; x <= 0; x++) {
                if (factoree1 % x == 0) {
                    this.polyfacts.push(x)
                }
            }
        }
        if (Math.sign(factoree2) == 1) { // loop for factors of positive constant term
            for (var x = 0; x <= factoree2; x++) {
                if (factoree2 % x == 0) {
                    this.constfacts.push(x)
                }
            }
        } else if (Math.sign(factoree2) == -1) { // loop for factors of negative constant term
            for (var x = factoree2; x <= 0; x++) {
                if (factoree2 % x == 0) {
                    this.constfacts.push(x)
                }
            }
        }

        console.log(this.polyfacts.toString()); // factors of the polynomial coefficient
        console.log(this.constfacts.toString()); // factors of the constant
    }

    cosplit() { // not working properly needs to push zeores
        var results = [];
        console.log(this.polynomials.toString())
        for (var x = this.polynomials.length - 1; x >= 0; x--) {
            var pass = x + 1;
            console.log(pass);
            if (this.polynomials[x].search('^' + (pass).toString())) {
                results.push(this.polynomials[x].split('x')[0])
            } else {
                console.log('^' + (pass).toString())
                results.push('0')
            }
        }
        results.unshift(this.constants);
        console.log(results.toString())
        this.dividends = results;
    }

    synthetic() { // works fine until division step
        var polynomials = '';
        var constants = '';
        var dividends = [];
        var results = [];
        this.dividends.forEach(function (element, i) {
            element = parseInt(element);
            //console.log(element);
            dividends[i] = element;
        });
        this.dividends = dividends;
        this.actualZero();
        console.log('The divisor is: ' + this.actZero.toString())
        console.log('The dividends are: ' + this.dividends.toString())
        console.log(this.dividends.toString())

        results = this.division();
        console.log(results.toString())
        if (Math.sign(this.actZero) == 1) {
            this.actZero = Math.abs(this.actZero);
            this.finalString = this.finalString + '(x - ' + this.actZero.toString() + ')';
        }
        if (Math.sign(this.actZero) == -1) {
            this.actZero = Math.abs(this.actZero);
            this.finalString = this.finalString + '(x + ' + this.actZero.toString() + ')';
        }
        console.log('The final equation is currently: ' + this.finalString + '(' + rejoin(results) + ')');
        return results;
    }

    division() {
        length = this.dividends.length;
        console.log(this.actZero);
        var results = [];
        var carry = 0;

        for (var x = length - 1; x >= 0; x--) {
            //console.log('This is the ' + x + ' iteration of the loop');
            if (x == length - 1) {
                carry = this.dividends[x];
                results.push(carry)
                //console.log('This is the ' + length + ' element')
            } else {
                console.log(carry);
                carry = (this.dividends[x] + (carry * this.actZero))
                if (x != 0 && carry != 0) {
                    console.log(carry);
                    results.push(carry);
                    console.log('Pushing onto the stack ' + carry.toString())
                } else {
                    break;
                }
            }
        }
        concatexponents(results);
        console.log('The results are: ' + results.toString());
        return results;
    }


    possibleZeros() {
        var bigVar = 0;
        var smallVar = 0;
        var result = 0;
        var negRes = 0;
        var res = []
        if (this.constfacts.length > this.polyfacts.length) { // find out which has more factors and use it as dividend
            bigVar = this.constfacts.length
            smallVar = this.polyfacts.length
        } else {
            bigVar = this.polyfacts.length
            smallVar = this.constfacts.length
        }
        for (var y = 0; y < smallVar; y++) { // loop runs until smallest array is done
            for (var x = 0; x < bigVar; x++) { // loop runs through biggest array on each increment of first loop
                result = this.constfacts[x] / this.polyfacts[y]
                res.push(math.fraction(result))
                negRes = (result - (result * 2))
                res.push(math.fraction(negRes))
                //console.log('push to new array: ', res[x])
            }
        }
        console.log('printing', res.toString())
        this.pZeroes = res;
    }

    actualZero() {
        length = this.dividends.length;
        console.log(this.pZero);
        console.log('Testing the dividends: ' + this.dividends.toString());        
        var results = [];
        var carry = 0;
        var foundZero = false;
        var z = 0;
        while (z < this.pZeroes.length) {
            this.pZero = this.pZeroes[z];
            console.log('Currently testing pZero: ' + this.pZero);
            for (var x = length - 1; x >= 0; x--) {
                //console.log('This is the ' + x + ' iteration of the loop');
                if (x == length - 1) {
                    carry = this.dividends[x];
                    results.push(carry)
                    //console.log('This is the ' + length + ' element')
                } else {
                    console.log('X is currently: ' + x);
                    console.log('Carry is at first: ' + carry);
                    console.log('The current dividend is: ' + this.dividends[x]);
                    carry = (this.dividends[x] + (carry * this.pZero))
                    console.log('Carry is now: ' + carry);                    
                    if (x != 0 && carry != 0) {
                        console.log(carry);
                        results.push(carry);
                        console.log('Search continues.');
                        //console.log('Pushing onto the stack ' + carry.toString())
                    } else if (x == 0 && carry == 0) {
                        console.log('Ending search for actZero.');
                        this.actZero = this.pZero;
                        foundZero = true;
                        break;
                    }
                }
            }
            if(foundZero) { break;}
            z++;
        }
    }

}

function rejoin(partsofpoly) {
    var newequation = '';
    console.log(partsofpoly.length)
    for (x = 0; x < partsofpoly.length; x++) {
        current = partsofpoly[x];
        if (x + 1 < partsofpoly.length) {
            next = partsofpoly[x + 1];
            console.log(next);
            if (next.charAt(0) == '-') {
                newequation = newequation + current;
            } else {
                newequation = newequation + current + '+';
            }
        } else {
            newequation = newequation + current;
        }
    }
    partsofpoly = newequation;
    console.log('The new equation is: ' + partsofpoly);
    return partsofpoly;
}

function concatexponents(results) {
    results.reverse();
    length = results.length - 1;
    console.log(length)
    for (var x = length; x >= 0; x--) {
        //console.log('This is the ' + x + ' iteration of the loop.');
        if (x > 1) {
            results[x] = results[x].toString() + 'x^' + x.toString();
            console.log('The concated term is: ' + results[x]);
        } else if (x == 1) {
            results[x] = results[x].toString() + 'x';
            console.log('The concated term is: ' + results[x]);
        } else if (x == 0) {
            results[x] = results[x].toString();
            console.log('The concated term is: ' + results[x]);
        }
    }
    results.reverse();
}