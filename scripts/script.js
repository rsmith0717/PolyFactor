// 2x^3+4x^2-8x+16  4x^2-8x+16+2x^3 56x^2-24x+16+68x^3
var button= document.getElementById('submit');
var polynomial = '';
var arr = [];
button.onclick= function(){
    polynomial = document.getElementById('inputbox').value; // gets text inside text-box 
    console.log(polynomial);
    arr = polynomial.match(/(\+|\-)?[a-z0-9.^]+/gi); // splits polynomial into seperate terms
    console.log(arr.toString());
    
    var polynomials = []
    var constants = []
    //var reg = new RegExp('^(\-?|\+?)\d*$');    

    polyorconst(arr,constants,polynomials)
    
      console.log(polynomials.toString());
      console.log(constants.toString());

      var sortpolysresults = []
      sortpolys(polynomials,sortpolysresults);
      console.log(sortpolysresults.toString());      

      bubbleSort(sortpolys, polynomials); // sorts the powers in descending order and the corresponding term as well
      polynomials.reverse();
      console.log(polynomials.toString());

      descartes(polynomial);            // evaluates the polynomial at f(x) and f(-x) to determine number of possible
                                        // positive and negative zeros
      var zerotest = [];
      console.log(polynomials[0]);
      //var leadingterm = polynomials[0].split(/[a-zA-Z]+|[0-9]+/g); 
      var leadingterm = polynomials[0].split(/[a-zA-Z](.+)/)[0];
      console.log(leadingterm);
      zerotest.push(leadingterm);
      if(constants[0] != null) {
        zerotest.push(constants[0]);        
      }
      console.log(zerotest.toString());

      polyfacts = [];
      constfacts = [];

      factoree1 = parseInt(zerotest[0]); // the leading coefficient of greatest power polynomial
      factoree2 = parseInt(zerotest[1]); // the constant
      

      for(x = 0; x <= factoree1; x++) {
            if(factoree1 % x == 0) {
                polyfacts.push(x)
            }
      }

      for(x = 0; x <= factoree2; x++) {
        if(factoree2 % x == 0) {
            constfacts.push(x)
        }
  }

  console.log(polyfacts.toString());    // factors of the polynomial coefficient
  console.log(constfacts.toString());   // factors of the constant

  gcf = GCF(polyfacts, constfacts);
  console.log(gcf);
  

}
