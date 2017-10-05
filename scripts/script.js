// 2x^3+4x^2-8x+16  4x^2-8x+16+2x^3 56x^2-24x+16+68x^3
var button = document.getElementById('submit');
var polynomial = '';
var arr = [];
button.onclick = function () {
    var polynomial = document.getElementById('inputbox').value; // gets text inside text-box 
    console.log(polynomial);
    var arr = termsplit(polynomial);

    var polynomials = []
    var constants = []
    //var reg = new RegExp('^(\-?|\+?)\d*$');    

    polyorconst(arr, constants, polynomials)

    console.log(polynomials.toString());
    console.log(constants.toString());

    var sortpolysresults = []
    expsplit(polynomials, sortpolysresults);
    console.log(sortpolysresults.toString());

    bubbleSort(sortpolysresults, polynomials); // sorts the powers in descending order and the corresponding term as well
    polynomials.reverse();
    console.log(polynomials.toString());

    descartes(polynomial); // evaluates the polynomial at f(x) and f(-x) to determine number of possible
    // positive and negative zeros
    var zerotest = zerotester(polynomials, constants);

    var polyfacts = [];
    var constfacts = [];

    getFactors(zerotest, polyfacts, constfacts) // finds factors of term with highest exponent and the constant term

    var gcf = GCF(polyfacts, constfacts); // finds the greatest common factor between the polynomial term and the constant term
    console.log(gcf);


}