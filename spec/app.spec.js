var Add = require("../app");
var polynomial = require("../public/scripts/Polynomial");

/**
describe("Add functionality", () => {
    it("calculates that x + y = z", () => {
        expect(Add(4, 5)).toEqual(9);
        expect(Add(14, -5)).toEqual(9);
    });
    it("calculates that x + y != z", () => {
        expect(Add(14, -5)).not.toEqual(9);
    });
});


describe("Factor Polynomail", () => {
    it("uses synthetic division to factor a polynomial", () => {
        expect(polynomial.factorPolynomial()).toEqual('(x - 5)(x + 0.3333333333333333)(x + 4)');
    });
}); **/

describe("Term Split", () => {
    it("splits the polynomial into individual terms", () => {
        expect(polynomial.testTermSplit()).toEqual('3x^3,-2x^2,-61x,-20');
    });
});

describe("Test Add Ones", () => {
    it("Adds ones to the polynomial", () => {
        expect(polynomial.testAddOnes()).toEqual('1x^3,-2x^2,-1x,-20');
    });
});

describe("Poly or Const?", () => {
    it("Puts the terms with variables in a separate array from the constant term", () => {
        expect(polynomial.testPolyorConst()).toEqual('The polynomials are: '+'1x^3,-2x^2,-1x '+ 'The constant is: ' + '-20');
    });
});

describe("Quadratic", () => {
    it("performs the quadratic equation", () => {
	expect(polynomial.testQuadratic()).toEqual('(x - 1)(x + 4)');
   });
});

describe("ExpSplit", () => {
    it("splits the exponents", () => {
  	expect(polynomial.testExpsplit()).toEqual('The exponents are: 3,2,1');
    });
});

describe("Bubble Sort", () => {
    it("Sorts the polynomial terms by power", () => {
        expect(polynomial.testBubbleSort()).toEqual('+1x^3,-2x^2,-1x');
    });
});


