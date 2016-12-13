/* global $, User, localStorage*/
$(document).ready(function() {
	console.log("Attendia JS Loaded!!");
	
	// Retrieve the object from storage
	if(localStorage.getItem('User') != undefined){
		var UserFetched = JSON.parse(localStorage.getItem('User'));
	}
	
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
	
	if(UserFetched != null){
		if(userNameDisplay != null){
			userNameDisplay.text("Welcome " + UserFetched.userName + "!");	
		}
	}

	if(UserFetched != null){
		console.log(UserFetched);
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
			
			$.ajax({
				url: "/userinfo",
				type: "POST",
				data: JSON.stringify(user),
				contentType: "application/json",
				dataType: 'json'
			}).done(function(result){
				console.log(result.response);
				console.log(result);
				
				localStorage.setItem('User', JSON.stringify(result.userObj));
				
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
	
	var addCourseToPage = function(title, description){
		var liTag = $('<li/>').appendTo('.classes-section');
		liTag.addClass("table-view-cell media searched-course");
		var aTag = $("<a/>");
		aTag.addClass("navigate-right");
		aTag.click(function(){
			this.closest("li").remove();
			var classCont = $(this).children().html();
			classCont = classCont.substring(0, classCont.indexOf('<'));
			var usrGot = JSON.parse(localStorage.getItem('User'));
			usrGot.courses.push(classCont);
			localStorage.setItem('User', JSON.stringify(usrGot));
			
			console.log(JSON.parse(localStorage.getItem('User')));
		});
		var courseDiv = $("<div>", {"class": "media-body"});
		
		liTag.append(aTag);
		aTag.append(courseDiv);
		courseDiv.text(title);
		courseDiv.append("<p>" + description + "</p>");
	};
	
	var addUsrCourses = function(courseInfo){
		var liTag = $('<li/>').appendTo('.courses-table');
		liTag.addClass("table-view-cell user-chosen-course");
		var aTag = $("<a/>");
		aTag.addClass("navigate-right");
		liTag.append(aTag);
		aTag.text(courseInfo);
	};
	
	var addMsgBoxCourses = function(courseInfo){
		var liTag = $('<li/>').appendTo('.my-courses-table');
		liTag.addClass("table-view-cell ");
		var aTag = $("<a/>");
		aTag.addClass("navigate-right");
		var span = $('<span/>').addClass('badge').html('1');
		console.log(span);
		liTag.append(aTag);
		aTag.html(courseInfo);
		aTag.append(span);
	};
	
	if(localStorage.getItem('User') != undefined){
		var usrRegisteredCourses = JSON.parse(localStorage.getItem('User')).courses;
		console.log("User Registered Courses");
		console.log(usrRegisteredCourses);
	}
	
	if(usrRegisteredCourses != null){
		usrRegisteredCourses.forEach(function(crsName){
			console.log(crsName);
			addUsrCourses(crsName);
			addMsgBoxCourses(crsName);
		});
	}
	var rmvCourses = function(){
		var coursesUp = $(".searched-course");
		console.log(coursesUp);
		coursesUp.remove();
	};
	
	// if(window.location.href == "https://attendia-sweng411-real-abdallahozaifa.c9users.io/findcourses.html"){
	// 	console.log("We Hereeeee!");
	// 	var obj = {};
	// 	setInterval(function(){
	// 		console.log($('.searched-course'));
	// 		$('.user-chosen-course').each(function(){
	// 		    var text = $.trim($(this).text());
	// 		    if(obj[text]){
	// 		        $(this).remove();
	// 		    } else {
	// 		        obj[text] = true;
	// 		    }
	// 		});
	// 	}, 200);
	// }
	
	/* Searching courses algorithm */
	$("#search").on("keyup", function() {
		console.log("Key Up Function triggered!");
	    var value = $(this).val();
		console.log("Value is: " + value);
		rmvCourses();
		
		if(value != "" && value != " "){
			$.ajax({
					url: "/searchCourse",
					type: "POST",
					data: JSON.stringify({searchStr: value}),
					contentType: "application/json",
					dataType: 'json'
				}).done(function(courses){
					console.log(courses);
					var allCourses = courses.courses;
					allCourses.forEach(function(course){
						addCourseToPage(course.name + " " + course.title, course.description);	
					});
					console.log("Done Adding elements to Page!");
				});
		}
	});
	
	var mkCntEditable = function(elm){
		var value = elm.attr('contenteditable');
		console.log(value);
		console.log(elm);
	    if (value == 'false' || value == undefined) {
	        elm.attr('contenteditable','true');
	    }
	    else {
	        elm.attr('contenteditable','false');
	    }
	};
	
	var chgeBtnClr = function(elm){
		var clsStr = elm.attr("class");
		if(clsStr.indexOf("btn-primary") >= 0){
			elm.text("Done");
			elm.removeClass("btn-primary");
			elm.addClass("btn-negative");
		}else{
			elm.text("Change");
			elm.removeClass("btn-negative");
			elm.addClass("btn-primary ");
		}
	};
	
	var changeProfile = function(){
		var fullNmField = $(".fullname-field"), emailField = $(".email-field");
		var usrNameField = $(".username-field"), pswdField = $(".password-field");
		var usr = JSON.parse(localStorage.getItem("User"));
		fullNmField.html(usr.fullName + "<button class='btn btn-primary profile-btn profile-component-fullName'>Change</button>");
		emailField.html(usr.email + "<button class='btn btn-primary profile-btn profile-btn profile-component-email'>Change</button>");
		usrNameField.html(usr.userName + "<button class='btn btn-primary profile-btn profile-component-username'>Change</button>");
		pswdField.html(usr.password + "<button class='btn btn-primary profile-btn profile-component-password'>Change</button>");
		var profileBtnFullNm = $(".profile-component-fullName");
		var profileBtnEmail = $(".profile-component-email");
		var profileBtnUsrNm = $(".profile-component-username");
		var profileBtnPswd = $(".profile-component-password");
		console.log(profileBtnFullNm);
		profileBtnFullNm.click(function(){
			chgeBtnClr($(this));
			mkCntEditable($(".fullname-field"));
		});
		
		profileBtnEmail.click(function(){
			chgeBtnClr($(this));
			mkCntEditable($(".email-field"));
		});
		
		profileBtnUsrNm.click(function(){
			chgeBtnClr($(this));
			mkCntEditable($(".username-field"));
		});
		
		profileBtnPswd.click(function(){
			chgeBtnClr($(this));
			mkCntEditable($(".password-field"));
		});
		
	};
	
	if(window.location.href == "https://attendia-sweng411-real-abdallahozaifa.c9users.io/profile.html"){
		console.log("Were on profile page!");
		changeProfile();
		
	}
});
