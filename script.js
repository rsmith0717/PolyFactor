var button= document.getElementById('submit');
var text = '';
button.onclick= function(){
    text = document.getElementById('inputbox').value;
    console.log(text);
}