// 2x^3+4x^2-8x+16  4x^2-8x+16+2x^3 56x^2-24x+16+68x^3
var button = document.getElementById('submit');
var polynomial = '';
var arr = [];
var polynomials = []
var constants = []
var sortpolysresults = []
var zerotest = []
var polyfacts = [];
var constfacts = [];
var gcf = 0;
var dividends = [];


button.onclick = function () {
    var polynomial = document.getElementById('inputbox').value; // gets text inside text-box 
    console.log(polynomial);
    var arr = termsplit(polynomial);

    polyorconst(arr, constants, polynomials)

    console.log(polynomials.toString());
    console.log(constants.toString());    

    expsplit(polynomials, sortpolysresults);
    console.log(sortpolysresults.toString());

    bubbleSort(sortpolysresults, polynomials); // sorts the powers in descending order and the corresponding term as well
    console.log(polynomials.toString());

    descartes(polynomials); // evaluates the polynomial at f(x) and f(-x) to determine number of possible
    // positive and negative zeros
    zerotest = zerotester(polynomials, constants);

    getFactors(zerotest, polyfacts, constfacts) // finds factors of term with highest exponent and the constant term

    gcf = GCF(polyfacts, constfacts); // finds the greatest common factor between the polynomial term and the constant term
    console.log(gcf);

    dividends = cosplit(polynomials, constants); // give us the coefficients of the polynomial terms

    synthetic(gcf, dividends);

}