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

describe("Term Split", () => {
    it("splits the polynomial into individual terms", () => {
        expect(polynomial.testAddOnes()).toEqual('1x^3,-2x^2,-1x,-20');
    });
});




