$(document).ready(function(){
	console.log("Attendia JS Loaded!!");

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
    var identity = null;
    
    // Click Handlers for components    
	signInBtn.click(function(){
		window.location.href = "signin.html";
	});

	studentBtn.click(function(){
		window.location.href = "signup.html";
		identity = "student";
	});

	professorBtn.click(function(){
		window.location.href = "signup.html";
		identity = "professor";
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

	     // Information is validated, goes to dashboard
	     window.location.href = "courses.html";
	  }); 
	}
	
	var courseItem = $(".course-item");
	var profileItem = $(".profile-item");
	var messageBoardItem = $(".messageboard-item");
	var calendarItem = $(".calendar-item");
	if(courseItem != null){
		courseItem.click(function(){
			window.location.href = "courses.html";
		});
	}

	if(profileItem != null){
		profileItem.click(function(){
			window.location.href = "profile.html";
		});
	}

	if(messageBoardItem != null){
		messageBoardItem.click(function(){
			window.location.href = "messageboard.html";
		});
	}

	if(calendarItem != null){
		calendarItem.click(function(){
			window.location.href = "calendar.html";
		});
	}
	
	var myCoursesItem = $(".mycourses-item");
	var findCoursesItem = $(".findcourses-item");
	if(myCoursesItem != null){
		myCoursesItem.click(function(){
			window.location.href = "courses.html";
		});
	}

	if(findCoursesItem != null){
		findCoursesItem.click(function(){
			window.location.href = "findcourses.html";
		});
	}
	
	
	
});