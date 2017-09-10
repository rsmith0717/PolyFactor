var button= document.getElementById('submit');
var polynomial = '';
var arr = [];
button.onclick= function(){
    polynomial = document.getElementById('inputbox').value;
    console.log(polynomial);
    arr = polynomial.match(/(\+|\-)?[a-z0-9.^]+/gi);
    console.log(arr.toString());
    
}
