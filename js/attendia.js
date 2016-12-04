$(document).ready(function(){
	console.log("Attendia JS Loaded!!");

	var signInBtn = $(".signin-btn");
	var signUpBtn = $(".signup-btn");

	signInBtn.click(function(){
		window.location.href = "signin.html";
	});

	signUpBtn.click(function(){
		window.location.href = "signup.html";
	});
});