$(document).ready(function(){
	console.log("Attendia JS Loaded!!");

	var signInBtn = $(".signin-btn");
	var signUpBtn = $(".signup-btn"); 
	var leftArrowBtn = $(".pull-left");
	var fullName = $(".full-name");
	var email = $(".email");
	var userName = $(".username");
	var password = $(".password");
        var submitBtn = $(".submitBtn");
        
	signInBtn.click(function(){
		window.location.href = "signin.html";
	});

	signUpBtn.click(function(){
		window.location.href = "signup.html";
	});
	
	if(leftArrowBtn != null){
	   leftArrowBtn.click(function(){
	       window.location.href = "index.html";
	   });
	}
	
	if(submitBtn != null){
	  submitBtn.click(function(){
	     if(fullName.val() != null){
	       console.log(fullName.val());
	       console.log(email.val());
	     }
	     console.log(userName.val());
	     console.log(password.val()); 
	  }); 
	}
	
	
	
	
	
});