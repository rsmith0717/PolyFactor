// 2x^3+4x^2-8x+16  4x^2-8x+16+2x^3 56x^2-24x+16+68x^3 3x^3-2x^2-61x-20
// 3x^4-8x^3-37x^2+2x+40 2x^4+x^3-19x^2-9x+9

var poly = require('./Polynomial.js');

window.test = poly;


$(document).ready(function () {
    let button = document.getElementById('submit');

    button.addEventListener('click', () => {
        var polynomial = document.getElementById('inputbox').value; // gets text inside text-box;   
        $('#steplist').empty(); 
        var splChars = "*|,\":<>[]{}`\';()@&$#%";
        for (var i = 0; i < polynomial.length; i++) {
            if (splChars.indexOf(polynomial.charAt(i)) != -1) {
                alert("Illegal characters used, please enter proper polynomial.");                
                throw "Illegal Characters";
            }
        }
        polynomial.replace(" ", "");
        var polynomial1 = new poly.Polynomial(polynomial, '');
        try {
            polynomial1.syntheticdivision();
        } catch (err) {
            alert("Please enter a proper polynomial!");
        }
    });
});