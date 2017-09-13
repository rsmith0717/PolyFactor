// 2x^3+4x^2-8x+16  4x^2-8x+16+2x^3
var button= document.getElementById('submit');
var polynomial = '';
var arr = [];
button.onclick= function(){
    polynomial = document.getElementById('inputbox').value; // gets text inside text-box 
    console.log(polynomial);
    arr = polynomial.match(/(\+|\-)?[a-z0-9.^]+/gi);
    console.log(arr.toString());
    
    var polynomials = []
    var constants = []
    //var reg = new RegExp('^(\-?|\+?)\d*$');    
    
    arr.forEach(function(term){
        var constant = /^\d+$/.test(term);  
        var constant = /^[-|+]?\d*\.?\d+$/.test(term);  
        if(constant == true) {
            constants.push(term);
        } else {
            polynomials.push(term); 
        }    
      });
    
      console.log(polynomials.toString());
      console.log(constants.toString());

      var sortpolys = []
      polynomials.forEach(function(poly){
        var power = 0;
        if(poly.includes('^')) {
            power = parseInt(poly.split('^')[1]);            
        } else {
            power = 1;
        }
        sortpolys.push(power);
      })
      console.log(sortpolys.toString());      

      bubbleSort(sortpolys, polynomials);
      polynomials.reverse();
      console.log(polynomials.toString());
}
