var math = require('./math.js');



export class Polynomial {
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
        this.steps = [];
    }

    syntheticdivision() {
        console.log('The polynomial is: ' + this.polynomial);
        this.steps.push(this.polynomial)
        if (hasNumbers(this.polynomial) == false) {
            throw 'InvalidPolynomial'; //throw keyword is used here            
        }
        this.termsplit(); // is currently removing the added ones for some reason
        this.addOnes();
        console.log('The split terms are: ' + this.arr.toString());
        console.log('The current equation is: ' + this.finalString + '(' + this.polynomial + ')');

        this.polyorconst();
        console.log(this.polynomials.toString());
        console.log(this.constants.toString());
        this.sortpolysresults = this.expsplit();
        console.log(this.sortpolysresults.toString());
        this.bubbleSort(this.sortpolysresults, this.polynomials);
        console.log(this.sortpolysresults.toString());
        if (this.sortpolysresults[0] > 2) { // checks if the first term's exponent is greater than ^2
            this.steps.push("The exponent of the leading term is greater than two so we do synthetic division.");
            console.log(this.sortpolysresults.toString());
            console.log(this.polynomials.toString());
            descartes(this);
            this.zerotest = this.testTerms();
            this.getFactors();
            this.possibleZeros();
            this.cosplit();
            var next = this.synthetic();
            var pass = rejoin(next);
            this.steps.push("The polynomial is currently: " + pass + this.finalString);
            let poly2 = new Polynomial(pass, this.finalString);
            printSteps(this.steps);
            poly2.syntheticdivision();
        } else { // quadratic needs to take place when the first term's exponent is ^2
            this.steps.push("The exponent of the leading term is less than two so we do the quadratic equation.");
            this.quadratic();
            printSteps(this.steps);
        }

    }

    addOnes() {
        for (var z = 0; z < this.arr.length; z++) {
            var tempoly = this.arr[z].match(/\S/g);
            for (var x = 0; x < tempoly.length; x++) {
                var current = tempoly[x];
                var prev = tempoly[x - 1];
                if (current == 'x') {
                    var result = /^[^0-9]+$/g.test(prev);
                    if (result == true) {
                        tempoly.splice(x, 0, '1');
                    }
                }
            }
            this.arr[z] = tempoly.join("");
        }
    }

    quadratic() {
        this.steps.push("The quadratic formula is: x = (-b" + decodeURI('%C2%B1') + decodeURI('%E2%88%9A') + '(b^2-4ac))/(2a)');
        this.cosplit();
        console.log(this.dividends.toString());
        var a = parseInt(this.dividends[2]);
        console.log(a);
        var b = parseInt(this.dividends[1]);
        console.log(b);
        var c = parseInt(this.dividends[0]);
        console.log(c);
        this.steps.push("a is equal to : " + a + " b is equal to: " + b + " c is equal to: " + c);
        if (isNaN(a) == true || isNaN(b) == true || isNaN(c) == true) {
            throw 'InvalidPolynomial';
        }
        var testpos = ((b * b) + ((-4 * a) * c));
        console.log("The root test gives me this: " + testpos);
        var posroot = Math.sqrt(testpos);
        this.steps.push('The positve root is: ' + posroot.toString());
        var negroot = -1 * (Math.sqrt(testpos));
        this.steps.push('The negative root is: ' + negroot.toString());

        var posx = ((-1 * b) + posroot) / (2 * a);
        this.steps.push('The positive x is: (-' + b + '+' + posroot + ')/(2*' + a + ') = ' + posx.toString());

        var negx = ((-1 * b) + negroot) / (2 * a);
        this.steps.push('The negative x is: (-' + b + negroot + ')/(2*' + a + ') = ' + negx.toString());

        var firstx = '';
        var secx = '';

        if (Math.sign(posx) == 1) {
            posx = Math.abs(posx);
            firstx = firstx + '(x - ' + posx.toString() + ')';
        }
        if (Math.sign(posx) == -1) {
            posx = Math.abs(posx);
            firstx = firstx + '(x + ' + posx.toString() + ')';
        }

        if (Math.sign(negx) == 1) {
            negx = Math.abs(negx);
            secx = secx + '(x - ' + negx.toString() + ')';
        }
        if (Math.sign(negx) == -1) {
            negx = Math.abs(negx);
            secx = secx + '(x + ' + negx.toString() + ')';
        }
        this.finalString = this.finalString + firstx + secx;
        this.steps.push("The factored polynomial is: " + this.finalString);

        console.log(this.finalString);
    }


    termsplit() {
        this.arr = this.polynomial.match(/(\+|\-)?[a-z0-9.^]+/gi); // splits polynomial into seperate terms
        var string = "The array of split terms is: " + this.arr.toString()
        console.log(string);
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
        items.reverse();
    }


    polyorconst() {
        var constants = []
        var polynomials = []
        this.arr.forEach(function (term) { // seperates the constant from the terms containing variables
            console.log(term);
            var constant = /^[-|+]?\d*\.?\d+$/.test(term);
            console.log(constant);
            if (constant == true) {
                constants.push(term);
            } else {
                polynomials.push(term);
            }
        });
        if (constants === undefined || constants.length == 0) {
            constants.push('0');
        }
        var sum = 0;
        constants.forEach(function (term) {
            console.log("The term is: " + term);
            sum += parseInt(term);
        });
        this.constants.push(sum);
        this.steps.push("The constant term is: " + this.constants.toString());
        this.polynomials = polynomials;
        this.steps.push("The terms that contain variables are: " + this.polynomials.toString());

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
        this.steps.push("The exponents of the polynomial terms are: " + results.toString());
        return results;
    }

    testTerms() { // takes the leading term of the polynomials and the constant term to pass to the getFactors method
        var zerotest = [];
        console.log(this.polynomials.toString());
        this.steps.push('The leading polynomial term is: ' + this.polynomials[0]);

        var leadingterm = this.polynomials[0].split(/[a-zA-Z](.+)/)[0];
        zerotest.push(leadingterm);
        if (this.constants[0] != null) {
            zerotest.push(this.constants[0]);
        }
        console.log(zerotest.toString());
        return zerotest;
    }

    getFactors() { // finds the common factors of the leading polynomial term and the constant term
        var factoree1 = parseInt(this.zerotest[0]); // the leading coefficient of greatest power polynomial
        var factoree2 = parseInt(this.zerotest[1]); // the constant
        this.steps.push("The coefficient of the leading term of the polynomial is: " + factoree1);
        this.steps.push("The constant term of the polynomial is: " + factoree2);


        if (Math.sign(factoree1) == 1) { // loop for positive polynomial terms
            for (var x = 0; x <= factoree1; x++) {
                if (factoree1 % x == 0) {
                    this.polyfacts.push(x)
                }
            }
        } else if (Math.sign(factoree1) == -1) { // loop for factors of negative polynomial term
            for (var x = factoree1; x <= 0; x++) {
                if (factoree1 % x == 0) {
                    this.polyfacts.push(x);
                }
            }
        }
        if (Math.sign(factoree2) == 1) { // loop for factors of positive constant term
            for (var x = 0; x <= factoree2; x++) {
                if (factoree2 % x == 0) {
                    this.constfacts.push(x);
                }
            }
        } else if (Math.sign(factoree2) == -1) { // loop for factors of negative constant term
            for (var x = factoree2; x <= 0; x++) {
                if (factoree2 % x == 0) {
                    this.constfacts.push(x);
                }
            }
        }

        this.steps.push("The factors of the coefficent of the leading polynomial term are: " + this.polyfacts.toString()); // factors of the polynomial coefficient
        this.steps.push("The factors of the polynomial's constant term are: " + this.constfacts.toString()); // factors of the constant
    }

    cosplit() { // splits coefficients from terms in polynomial
        var results = [];
        console.log(this.polynomials.toString())
        for (var x = this.polynomials.length - 1; x >= 0; x--) { // there is a problem here somewhere
            var pass = x + 1;
            console.log(pass);
            this.polynomials[x].replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            console.log(this.polynomials[x].toString());
            if (x >= 0) {
                results.push(this.polynomials[x].split('x')[0]);
                console.log(this.polynomials[x].split('x')[0]);
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
            dividends[i] = element;
        });
        this.dividends = dividends;
        this.actualZero();
        if (this.actZero == 0) {
            throw 'InvalidPolynomial'; //throw keyword is used here
        }
        console.log('The divisor is: ' + this.actZero.toString())
        console.log('The dividends are: ' + this.dividends.toString())
        console.log(this.dividends.toString())

        results = this.division();
        console.log(results.toString());
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
        var length = this.dividends.length;
        console.log(this.actZero);
        var results = [];
        var carry = 0;

        for (var x = length - 1; x >= 0; x--) {
            if (x == length - 1) {
                carry = this.dividends[x];
                results.push(carry)
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
        this.steps.push("The possible zeroes are eqaul to: coefficient factors & constant factors & (coefficient factors)/(constant factors)");
        if (this.constfacts.length > this.polyfacts.length) { // find out which has more factors and use it as dividend
            bigVar = this.constfacts.length
            smallVar = this.polyfacts.length
        } else {
            bigVar = this.polyfacts.length
            smallVar = this.constfacts.length
        }
        for (var y = 0; y < smallVar; y++) { // loop runs until smallest array is done
            for (var x = 0; x < bigVar; x++) { // loop runs through biggest array on each increment of first loop
                if (this.constfacts.length > this.polyfacts.length) // if the coefficient is bigger than constant, coefficient should be on top
                    result = this.constfacts[x] / this.polyfacts[y];
                else
                    result = this.polyfacts[x] / this.constfacts[y];
                console.log('Looking for this: ' + result);
                res.push(math.fraction(result))
                negRes = (result - (result * 2))
                res.push(math.fraction(negRes))
            }
        }
        console.log('printing', res.toString())
        this.steps.push("The possible zeroes are: " + res.toString());
        this.pZeroes = res;
    }

    actualZero() {
        var length = this.dividends.length;
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
                if (x == length - 1) {
                    carry = this.dividends[x];
                    results.push(carry)
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
                    } else if (x == 0 && carry == 0) {
                        console.log('Ending search for actZero.');
                        this.actZero = this.pZero;
                        this.steps.push("The zero for this polynomial is: " + this.actZero.toString());

                        foundZero = true;
                        break;
                    }
                }
            }
            if (foundZero) {
                break;
            }
            z++;
        }
    }

}


export function printSteps(steps) {
    steps.forEach(function (step) { // seperates the constant from the terms containing variables
        $('#steplist').append('<li class="list-group-item">' + step + '</li>');
    });
}

export function rejoin(partsofpoly) {
    var newequation = '';
    console.log(partsofpoly.length)
    for (var x = 0; x < partsofpoly.length; x++) {
        var current = partsofpoly[x];
        if (x + 1 < partsofpoly.length) {
            var next = partsofpoly[x + 1];
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

function hasNumbers(t) {
    var regex = /\d/g;
    return regex.test(t);
}

export function concatexponents(results) {
    results.reverse();
    length = results.length - 1;
    console.log(length)
    for (var x = length; x >= 0; x--) {
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

export function descartes(polynomial) {
    var chngNum = 0;
    var poly = polynomial.polynomial.toString();
    console.log("Polynomial: " + poly);

    if (poly.charAt(0) != '-' && poly.charAt(0) != '+') // Adds understood +
    {
        var chng = '+';
        poly = chng + poly;
    }

    for (var t = 0; t < poly.length; t++) // Adds understood ^1 to x
    {
        if (poly.charAt(t) == 'x' && poly.charAt(t + 1) != '^') {
            var inc = poly.charAt(t + 1);
            poly = setCharAt(poly, t + 1, '^1' + inc);
        }
    }

    SignCount(poly);
    polynomial.steps.push("Possible max num of positive zeros: " + chngNum);
    chngNum = 0;
    NegZero(poly);
    polynomial.steps.push("Possible max num of negative zeros: " + chngNum);

    function SignCount(poly) // Counts sign changes
    {
        for (var i = 0; i < poly.length; i++) {
            var x = poly.charAt(i);
            if (x == '-' || x == '+') {
                var chg = x;
                for (var k = i + 1; k < poly.length; k++) {
                    var y = poly.charAt(k);
                    if (y == '-' || y == '+') {
                        if (y == '-' && y == chg)
                            break;
                        else if (y == '-' && y != chg) {
                            chngNum++;
                            break;
                        } else if (y == '+' && y == chg)
                            break;
                        else if (y == '+' && y != chg) {
                            chngNum++;
                            break;
                        }
                    }
                }
            }
        }
    }

    function NegZero(poly) // Evaluates polynomial at f(-x) to see how many
    { // possible negative zeros
        for (var i = 0; i < poly.length; i++) {
            var chck = poly.charAt(i);

            if (poly.charAt(i) == '-') {
                for (var k = i; k < poly.length; k++) {
                    if (poly.charAt(k) == '^') {
                        var num = poly.charAt(k + 1);
                        var tmp = evenOdd(num);
                        break;
                    }
                }
                if (chck == '-' && tmp == 1)
                    poly = setCharAt(poly, i, '+');
            } else if (poly.charAt(i) == '+') {
                for (var j = i; j < poly.length; j++) {
                    if (poly.charAt(j) == '^') {
                        var num2 = poly.charAt(j + 1);
                        var tmp2 = evenOdd(num2);
                        if (chck == '+' && tmp2 == 1)
                            poly = setCharAt(poly, i, '-');
                        break;
                    }
                }
            }
        }
        console.log(poly);
        SignCount(poly); // Sends altered polynomial to SignCount
    }

    function setCharAt(str, index, chr) // Function for changing specific character
    { // at specific index
        if (index > str.length - 1)
            return str;
        return str.substr(0, index) + chr + str.substr(index + 1);
    }

    function evenOdd(num) {
        return num % 2;
    }
}


export function factorPolynomial() {
    polynomial1 = new Polynomial('3x^3-2x^2-61x-20', '');
    console.log(polynomial1.syntheticdivision());
    return polynomial1.syntheticdivision();
}