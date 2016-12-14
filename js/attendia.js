/* global $, User, localStorage*/
$(document).ready(function() {
	console.log("Attendia JS Loaded!!");

	/****************************************
	*          Front Page Components        *
	****************************************/
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
	var userNameDisplay = $(".username-display");
	var usrObjFrmStorage = localStorage.getItem('User');
	var myCoursesItem = $(".mycourses-item");
	var findCoursesItem = $(".findcourses-item");
	var UserFetched, identity = null;
	
	
	// Retrieve the User object from storage
	if(usrObjFrmStorage != "undefined"){
		UserFetched = JSON.parse(usrObjFrmStorage);
		console.log(UserFetched);
		if(userNameDisplay != null){
			userNameDisplay.text("Welcome " + UserFetched.userName + "!");	
		}
		
		var usrRegisteredCourses = JSON.parse(usrObjFrmStorage).courses;
		if(usrRegisteredCourses != null){
			usrRegisteredCourses.forEach(function(crsName){
				console.log(crsName);
				addUsrCourses(crsName);
				addMsgBoxCourses(crsName);
			});
		}
	}


	/****************************************
	*      Click Handlers for Components    *
	****************************************/   
	
	if(signInBtn != null){
		// User clicks sign in page on index page
		signInBtn.click(function() {
			window.location.href = "signin.html";
		});
	}
	
	if(studentBtn != null){
		// User clicks Student on index page
		studentBtn.click(function() {
			window.location.href = "signup.html";
			identity = "student";
		});
	}
	
	if(professorBtn != null){
		// User clicks Professor on index page
		professorBtn.click(function() {
			window.location.href = "signup.html";
			identity = "professor";
		});
	}

	// User clicks left navigation arrow
	if (leftArrowBtn != null) {
		leftArrowBtn.click(function() {
			window.location.href = "index.html";
		});
	}
	
	// User clicks course navigation button 
	if (courseItem != null) {
		courseItem.click(function() {
			window.location.href = "courses.html";
		});
	}
	
	// User clicks profile navigation button
	if (profileItem != null) {
		profileItem.click(function() {
			window.location.href = "profile.html";
		});
	}
	
	// User clicks message board navigation button
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
	
	
	/**************************************************
	*   User submits form on Log In page/Sign Up Page *
	***************************************************/ 
	if (submitBtn != null) {
		submitBtn.click(function() {
			
			// User object that is sent to server 
			var user = {
				fullName: fullName.val(),
				email: email.val(),
				userName: userName.val(),
				password: password.val()
			};
			
			// Sends over user object to server 
			$.ajax({
				url: "/userinfo",
				type: "POST",
				data: JSON.stringify(user),
				contentType: "application/json",
				dataType: 'json'
			}).done(function(result){
				
				// Server Response 
				console.log(result);
				
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
					// Save the User object to Local Storage 
					localStorage.setItem('User', JSON.stringify(result.userObj));
					
					// Information is validated, goes to dashboard
					window.location.href = "courses.html";
				}
				
				// User is Signing Up
				else if(result.response == 'User successfully signed up!'){
					// Save the User object to Local Storage 
					localStorage.setItem('User', JSON.stringify(result.userObj));
					
					// Information is validated, goes to dashboard
					window.location.href = "courses.html";
				}
			});

			
		});
	}


	/**************************************************
	*  Add Courses to the users findcourses.html page *
	***************************************************/ 	
	var addCourseToPage = function(title, description){
		var liTag = $('<li/>').appendTo('.classes-section');
		liTag.addClass("table-view-cell media searched-course");
		var aTag = $("<a/>");
		aTag.addClass("navigate-right");
		aTag.click(function(){
			this.closest("li").remove();
			var classCont = $(this).children().html();
			classCont = classCont.substring(0, classCont.indexOf('<'));
			var usrGot = JSON.parse(usrObjFrmStorage);
			usrGot.courses.push(classCont);
			localStorage.setItem('User', JSON.stringify(usrGot));
			
			console.log(JSON.parse(usrObjFrmStorage));
		});
		var courseDiv = $("<div>", {"class": "media-body"});
		liTag.append(aTag);
		aTag.append(courseDiv);
		courseDiv.text(title);
		courseDiv.append("<p>" + description + "</p>");
	};
	
	
	/**************************************************
	*  Add Courses to the users courses.html page *
	***************************************************/
	var addUsrCourses = function(courseInfo){
		var liTag = $('<li/>').appendTo('.courses-table');
		liTag.addClass("table-view-cell user-chosen-course");
		var aTag = $("<a/>");
		aTag.addClass("navigate-right");
		liTag.append(aTag);
		aTag.text(courseInfo);
	};
	
	
	/**************************************************
	*  Add Courses to the users messageboard.html page *
	***************************************************/
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


	/*****************************************************
	*  Remove Courses on findcourses.hmtl for duplicates *
	******************************************************/
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
	
	
	/*******************************
	*  Searching Courses Algorithm *
	*******************************/
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
	
	
	/**************************************************
	*  Making Content Editable on profile.html page   *
	***************************************************/
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
	
	
	/**************************************************
	*	Change Button Color on profile.html page      *
	***************************************************/
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
	
	
	/**************************************************
	*  Changing profile section according to user     *
	***************************************************/
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
		
		/*********************************
		*  Profile Button Click Handlers *
		**********************************/
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
	
	
	/*****************************************
	*  Detects if user is on profile page	 *
	******************************************/
	if(window.location.href == "https://attendia-sweng411-real-abdallahozaifa.c9users.io/profile.html"){
		console.log("Were on profile page!");
		changeProfile();
	}
	
});
