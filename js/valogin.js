console.log(localStorage.getItem("usuario"));
if(localStorage.getItem("usuario") == null){
	window.open(
	  'login.html',
	  '_top' // <- This is what makes it open in a new window.
	); 
}