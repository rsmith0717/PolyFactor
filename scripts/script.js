// 2x^3+4x^2-8x+16  4x^2-8x+16+2x^3 56x^2-24x+16+68x^3 3x^3-2x^2-61x-20
// 3x^4-8x^3-37x^2+2x+40
/**var button = document.getElementById('submit');
var polynomial = '';
var tempoly = '';
var arr = [];
var polynomials = []
var constants = []
var sortpolysresults = []
var zerotest = []
var polyfacts = [];
var constfacts = [];
var pZero = 0;          // potential zero
var dividends = [];
var finalString = '';


button.onclick = function () {
    var polynomial = document.getElementById('inputbox').value; // gets text inside text-box 
    let polynomial1 = new Polynomial(polynomial);
    console.log(polynomial);
    tempoly = polynomial;
    var arr = termsplit(tempoly);

    polyorconst(arr, constants, polynomials)

    console.log(polynomials.toString());
    console.log(constants.toString());    

    expsplit(polynomials, sortpolysresults);
    console.log(sortpolysresults.toString());

    bubbleSort(sortpolysresults, polynomials); // sorts the powers in descending order and the corresponding term as well
    console.log(polynomials.toString());

    descartes(tempoly); // evaluates the polynomial at f(x) and f(-x) to determine number of possible
    // positive and negative zeros
    zerotest = testTerms(polynomials, constants);

    getFactors(zerotest, polyfacts, constfacts) // finds factors of term with highest exponent and the constant term

    pZero = possibleZeros(polyfacts, constfacts)

   //gcf = GCF(polyfacts, constfacts); // finds the greatest common factor between the polynomial term and the constant term
    //console.log(gcf);

    dividends = cosplit(polynomials, constants); // give us the coefficients of the polynomial terms

    synthetic(pZero, dividends, finalString);
} **/

$( document ).ready(function() {
    let button = document.getElementById('submit');
    
    button.addEventListener('click', () => {
        var polynomial = document.getElementById('inputbox').value; // gets text inside text-box 
        let polynomial1 = new Polynomial(polynomial);
        polynomial1.syntheticdivision();
    });
});
