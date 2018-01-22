console.log(localStorage.getItem("usuario"));
if(localStorage.getItem("usuario") == null){
	window.open(
	  'login.html'
	); 
}