/* global $, User, localStorage*/
$(document).ready(function() {
	console.log("Attendia JS Loaded!!");
	
	// Retrieve the object from storage
	var UserFetched = JSON.parse(localStorage.getItem('User'));
	
	// Front Page Components
	var signInBtn = $(".signin-btn");
	var studentBtn = $(".student-btn");
	var professorBtn = $(".professor-btn");
	var leftArrowBtn = $(".pull-left");
	var fullName = $(".full-name");
	var email = $(".email");
	var userName = $(".username");
	var password = $(".password");
	var submitBtn = $(".submitBtn");
	var courseItem = $(".course-item");
	var profileItem = $(".profile-item");
	var messageBoardItem = $(".messageboard-item");
	var calendarItem = $(".calendar-item");
	var identity = null;
	var userNameDisplay = $(".username-display");
	
	console.log(userNameDisplay);
	userNameDisplay.text("Welcome " + UserFetched.userName + "!");
	console.log(UserFetched);
	if(UserFetched != null){
		console.log(UserFetched.name);
		console.log(UserFetched.email);
		console.log(UserFetched.userName);
	}
	
	// Click Handlers for components    
	signInBtn.click(function() {
		window.location.href = "signin.html";
	});

	studentBtn.click(function() {
		window.location.href = "signup.html";
		identity = "student";
	});

	professorBtn.click(function() {
		window.location.href = "signup.html";
		identity = "professor";
	});


	if (leftArrowBtn != null) {
		leftArrowBtn.click(function() {
			window.location.href = "index.html";
		});
	}

	// User submits form on Log In page or Sign Up Page
	if (submitBtn != null) {
		submitBtn.click(function() {

			var user = {
				fullName: fullName.val(),
				email: email.val(),
				userName: userName.val(),
				password: password.val()
			};
			
			User.setName(user.fullName);
			User.setEmail(user.email);
			User.setUserName(user.userName);
			
			console.log(User.getName());
			console.log(User.getEmail());
			console.log(User.getUserName());
			
			// Put the object into storage
			localStorage.setItem('User', JSON.stringify(User));
			
			$.ajax({
				url: "/userinfo",
				type: "POST",
				data: JSON.stringify(user),
				contentType: "application/json",
				dataType: 'json'
			}).done(function(result){
				console.log(result.response);
				
				// User does not exist!
				if(result.response == 'User does not exists!'){
					var pageCont = $(".content");
					var errorDiv = $("<div>", {"class": "content-padded"});
					var submitButtn = $(".submitButton");
					var errorBtn = $('<button/>', { 
						text: 'Invalid Credentials!',
						"class": "btn btn-negative btn-block"
					});
					submitButtn.hide();
					errorDiv.append(errorBtn);
					pageCont.append(errorDiv);
					
					setTimeout(function(){ 
						errorDiv.hide();
						submitButtn.show();
					}, 3000);
					
					
				
				// User exists!
				}else if(result.response == 'User exists!'){
					// Information is validated, goes to dashboard
					window.location.href = "courses.html";
				}
				
				// User is Signing Up
				else if(result.response == 'User successfully signed up!'){
					// Information is validated, goes to dashboard
					window.location.href = "courses.html";
				}
			});

			
		});
	}

	if (courseItem != null) {
		courseItem.click(function() {
			window.location.href = "courses.html";
		});
	}

	if (profileItem != null) {
		profileItem.click(function() {
			window.location.href = "profile.html";
		});
	}

	if (messageBoardItem != null) {
		messageBoardItem.click(function() {
			window.location.href = "messageboard.html";
		});
	}

	if (calendarItem != null) {
		calendarItem.click(function() {
			window.location.href = "calendar.html";
		});
	}

	var myCoursesItem = $(".mycourses-item");
	var findCoursesItem = $(".findcourses-item");
	if (myCoursesItem != null) {
		myCoursesItem.click(function() {
			window.location.href = "courses.html";
		});
	}

	if (findCoursesItem != null) {
		findCoursesItem.click(function() {
			window.location.href = "findcourses.html";
		});
	}

	/* Searching courses algorithm */
	$("#search").on("keyup", function() {
	    var value = $(this).val();
		console.log(value);
		
		if(value != ""){
			$.ajax({
					url: "/searchCourse",
					type: "POST",
					data: JSON.stringify({searchStr: value}),
					contentType: "application/json",
					dataType: 'json'
				}).done(function(courses){
					console.log(courses);
				});
		}
	});
});
