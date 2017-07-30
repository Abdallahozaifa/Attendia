/* global $, User, localStorage*/
$(document).ready(function() {

	/****************************************
	*          Front Page Components        *
	****************************************/
	var signInBtn = $(".signin-btn");
	var studentBtn = $(".student-btn");
	var professorBtn = $(".professor-btn");
	var leftArrowBtn = $(".appstart-left");
	var msgLeftArrowBtn = $(".messageboard-left");
	var crsLeftArrowBtn = $(".courseboard-left");
	var postMsgLeftArrow = $(".postMessage-left");
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
	var logOutItem = $(".logout-item");
	var selectedCrsNmField = $(".selected-coursename");
	var postAMessageBtn = $(".post-a-messageBtn");
	var txtAreaMessage = $(".textarea-message");
	var postMsgBtn = $(".postMessageBtn");
	var atndBtn = $(".attendanceBtn");
	var separateCrInfo = $(".separate-course-section");
	var UserFetched, identity = null;

	var body = $("body");
	document.body.style.zoom=1.0;
	/****************************************
	*      Click Handlers for Components    *
	****************************************/   
	
	if(signInBtn != null){
		// User clicks sign in page on index page
		signInBtn.click(function() {
			window.location.href = "signin.html";
		});
	}

	if(atndBtn != null){
		atndBtn.attr('href','#attendanceBtn');
		var xAtdBtn = $(".close-attendancemessage");
	}

	if(postMsgBtn != null){
		// User clicks sign in page on index page
		postMsgBtn.click(function() {
			if(txtAreaMessage != null && txtAreaMessage != ""){
				var slctedCrs = localStorage.getItem("selected-course");
				var stdName = JSON.parse(localStorage.getItem('User')).fullName;
				var msg = {
					courseName: slctedCrs, 
					courseMessage: txtAreaMessage.val(),
					studentName: stdName
				};

				$.ajax({
					url: "/postCourseMessage",
					type: "POST",
					data: JSON.stringify(msg),
					contentType: "application/json",
					dataType: 'json'
				}).done(function(result){
				});
			}
			
			window.location.href = "messages.html";
		});
	}

	if(postAMessageBtn != null){
		// User clicks sign in page on index page
		postAMessageBtn.click(function() {
			window.location.href = "postamessage.html";
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
			window.location.href = "/app";
		});
	}
	
	// User clicks left navigation arrow
	if (msgLeftArrowBtn != null) {
		msgLeftArrowBtn.click(function() {
			window.location.href = "messageboard.html";
		});
	}
	
	// User clicks left navigation arrow
	if (crsLeftArrowBtn != null) {
		crsLeftArrowBtn.click(function() {
			window.location.href = "courses.html";
		});
	}
	
	// User clicks left navigation arrow
	if (postMsgLeftArrow != null) {
		postMsgLeftArrow.click(function() {
			window.location.href = "messages.html";
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
	
	if (logOutItem != null) {
		logOutItem.click(function() {
			localStorage.setItem("User", null);
			localStorage.setItem("selected-course", null);
			window.location.href = "/";
		});
	}
	
	if (selectedCrsNmField != null) {
		selectedCrsNmField.text(localStorage.getItem("selected-course"));
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
				
				// Save the User object to Local Storage 
				localStorage.setItem('User', JSON.stringify(result.user));
					
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


	/**************************************************
	*  Add Courses to the users findcourses.html page *
	***************************************************/ 	
	var addCourseToPage = function(title, description, section, arrowWanted){
		var liTag = $('<li/>').appendTo('.' + section);
		liTag.addClass("table-view-cell media searched-course");
		var aTag = $("<a/>");
		
		if(arrowWanted == true){
			aTag.addClass("navigate-right");
			aTag.click(function(){
				this.closest("li").remove();
				var classCont = $(this).children().html();
				classCont = classCont.substring(0, classCont.indexOf('<'));
				var usrGot = JSON.parse(localStorage.getItem("User"));
				usrGot.courses.push(classCont);
				localStorage.setItem('User', JSON.stringify(usrGot));
				
				// Updates the user due to the new courses
				$.ajax({
					url: "/updateuser",
					type: "POST",
					data: JSON.stringify(usrGot),
					contentType: "application/json",
					dataType: 'json'
				}).done(function(result){
				});
				
			});
		}
		var courseDiv = $("<div>", {"class": "media-body"});
		liTag.append(aTag);
		aTag.append(courseDiv);
		courseDiv.text(title);
		courseDiv.append("<p>" + description + "</p>");
	};
	
	/**************************************************
	*  Add Courses to the users messages.html page    *
	***************************************************/ 	
	var addMessagesToPage = function(studentName, studentMessage){
		var liTag = $('<li/>').appendTo('.messages-section');
		liTag.addClass("table-view-cell media");
		var aTag = $("<a/>");
		var img = $('<img class="media-object pull-left">'); 
		img.attr('src', "http://placehold.it/42x42");
		img.appendTo(aTag);
		var courseDiv = $("<div>", {"class": "media-body"});
		liTag.append(aTag);
		aTag.append(courseDiv);
		courseDiv.text(studentName);
		courseDiv.append("<p>" + studentMessage + "</p>");
	};
	
	/**************************************************
	*  Add Courses to the users courses.html page *
	***************************************************/
	var addUsrCourses = function(courseInfo){
		var liTag = $('<li/>').appendTo('.courses-table');
		liTag.addClass("table-view-cell user-chosen-course");
		var aTag = $("<a/>");
		aTag.addClass("navigate-right course-page");
		liTag.append(aTag);
		aTag.text(courseInfo);
	};
	
	
	/**************************************************
	*  Add Courses to the users messageboard.html page *
	***************************************************/
	var addMsgBoxCourses = function(courseInfo, numOfMessages){
		var slctedCrs = courseInfo;
		var wrdArr = slctedCrs.split(" ");
		var clsNm = wrdArr[0] + " " + wrdArr[1];
		var liTag = $('<li/>').appendTo('.my-courses-table');
		liTag.addClass("table-view-cell ");
		var aTag = $("<a/>");
		aTag.addClass("navigate-right messageboard-arrow");
		var span = $('<span/>').addClass('badge').html(0);
		liTag.append(aTag);
		aTag.html(courseInfo);
		aTag.append(span);
			
		$.ajax({
			url: "/findCourse",
			type: "POST",
			data: JSON.stringify({courseName: clsNm}),
			contentType: "application/json",
			dataType: 'json'
		}).done(function(course){
			var span = $('<span/>').addClass('badge').html(course.courseObj.messages.length);
			liTag.append(aTag);
			aTag.html(courseInfo);
			aTag.append(span);
		});
		
		// var span = $('<span/>').addClass('badge').html(0);
		// liTag.append(aTag);
		// aTag.html(courseInfo);
		// aTag.append(span);
	};


	/*****************************************************
	*  Remove Courses on findcourses.hmtl for duplicates *
	******************************************************/
	var rmvCourses = function(){
		var coursesUp = $(".searched-course");
		coursesUp.remove();
	};

	/*******************************
	*  Searching Courses Algorithm *
	*******************************/
	$("#search").on("keyup", function() {
	    var value = $(this).val();
	    
		if(value != "" && value != " "){
			$.ajax({
					url: "/searchCourse",
					type: "POST",
					data: JSON.stringify({searchStr: value}),
					contentType: "application/json",
					dataType: 'json'
				}).done(function(courses){
					rmvCourses();
					var allCourses = courses.courses;
					allCourses.forEach(function(course){
						addCourseToPage(course.name + " " + course.title, course.description, "classes-section", true);	
					});
				});
		}
	});
	
	
	/**************************************************
	*  Making Content Editable on profile.html page   *
	***************************************************/
	var mkCntEditable = function(elm){
		var value = elm.attr('contenteditable');
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
	*  Records the edit change for the profile page   *
	***************************************************/
	var recordEditChange = function(field, objAtr){
		var usrNmHtml = field.html();
		var contents = usrNmHtml.substring(0, usrNmHtml.indexOf('<'));
		field.blur(function() {
			var cntHtml = $(this).html();
			cntHtml = cntHtml.substring(0, cntHtml.indexOf('<'));
		    if (contents !=  cntHtml){
		        contents = cntHtml;
		        var usrObj = JSON.parse(localStorage.getItem('User'));
		        usrObj[objAtr] = contents;
		        localStorage.setItem("User", JSON.stringify(usrObj));
		        
		    	$.ajax({
					url: "/updateuser",
					type: "POST",
					data: JSON.stringify(usrObj),
					contentType: "application/json",
					dataType: 'json'
				}).done(function(result){
				});   
		    }
		});
	};
	
	/**************************************************
	*  Changing profile section according to user     *
	***************************************************/
	var changeProfile = function(){
		var fullNmField = $(".fullname-field"), emailField = $(".email-field");
		var usrNameField = $(".username-field"), pswdField = $(".password-field");
		var usr = JSON.parse(usrObjFrmStorage);
		fullNmField.html(usr.fullName + "<button class='btn btn-primary profile-btn profile-component-fullName'>Change</button>");
		emailField.html(usr.email + "<button class='btn btn-primary profile-btn profile-btn profile-component-email'>Change</button>");
		usrNameField.html(usr.userName + "<button class='btn btn-primary profile-btn profile-component-username'>Change</button>");
		pswdField.html(usr.password + "<button class='btn btn-primary profile-btn profile-component-password'>Change</button>");
		var profileBtnFullNm = $(".profile-component-fullName");
		var profileBtnEmail = $(".profile-component-email");
		var profileBtnUsrNm = $(".profile-component-username");
		var profileBtnPswd = $(".profile-component-password");
		
		/*********************************
		*  Profile Button Click Handlers *
		**********************************/
		profileBtnFullNm.click(function(){
			var flNmField = $(".fullname-field");
			chgeBtnClr($(this));
			mkCntEditable(flNmField);
			recordEditChange(flNmField, "fullName");
		});
		
		profileBtnEmail.click(function(){
			var emlField = $(".email-field");
			chgeBtnClr($(this));
			mkCntEditable(emlField);
			recordEditChange(emlField, "email");
		});
		
		profileBtnUsrNm.click(function(){
			var usrNmField = $(".username-field");
			chgeBtnClr($(this));
			mkCntEditable(usrNmField);
			recordEditChange(usrNmField, "userName");
		});
		
		profileBtnPswd.click(function(){
			var pswdField = $(".password-field");
			chgeBtnClr($(this));
			mkCntEditable(pswdField);
			recordEditChange(pswdField, "password");
		});
		
	};
	
	// Retrieve the User object from storage
	if(usrObjFrmStorage != "undefined" && usrObjFrmStorage != null && usrObjFrmStorage != "null"){
		UserFetched = JSON.parse(usrObjFrmStorage);
		if(userNameDisplay != null){
			userNameDisplay.text("Welcome " + UserFetched.userName + "!");	
		}
		
		var usrRegisteredCourses = JSON.parse(usrObjFrmStorage).courses;
		if(usrRegisteredCourses != null){
			usrRegisteredCourses.forEach(function(crsName){
				addUsrCourses(crsName);
				
				// var msgQuery = {courseName: localStorage.getItem('selected-course')};
				// $.ajax({
				// 	url: "/getcoursemessages",
				// 	type: "POST",
				// 	data: JSON.stringify(msgQuery),
				// 	contentType: "application/json",
				// 	dataType: 'json'
				// }).done(function(result){
				// 	var msgArr = result.messages;
				// 	console.log(msgArr);
				// 	addMsgBoxCourses(crsName, msgArr.length);
				// });
				addMsgBoxCourses(crsName, 1);
			});
			
			var messageBoardArrow = $(".messageboard-arrow");
			if (messageBoardArrow != null) {
				messageBoardArrow.click(function() {
					var slctedCrs = $(this).text();
					var wrdArr = slctedCrs.split(" ");
					var clsNm = wrdArr[0] + " " + wrdArr[1];
					localStorage.setItem("selected-course", clsNm);
					window.location.href = "messages.html";
				});
			}
			
			var courseBoardArrow = $(".course-page");
			if (courseBoardArrow != null) {
				courseBoardArrow.click(function() {
					localStorage.setItem("selected-course", $(this).text());
					window.location.href = "course.html";
				});
			}
		}
	}
	
	/*****************************************
	*  Detects if user is on profile page	 *
	******************************************/
	if(window.location.href == "https://attendia-sweng411-real-abdallahozaifa.c9users.io/profile.html"){
		changeProfile();
	}
	
	if(window.location.href == "https://attendia-sweng411-real-abdallahozaifa.c9users.io/messages.html"){
		var msgQuery = {courseName: localStorage.getItem('selected-course')};

		$.ajax({
			url: "/getcoursemessages",
			type: "POST",
			data: JSON.stringify(msgQuery),
			contentType: "application/json",
			dataType: 'json'
		}).done(function(result){
			var msgArr = result.messages;
			msgArr.forEach(function(msgObj){
				addMessagesToPage(msgObj.studentName, msgObj.message);
			});
		});
		
		
	}
	
	/*****************************************
	*  	 *
	******************************************/
	if(separateCrInfo != null){
		if(localStorage.getItem('selected-course') != null){
			var slctedCrs = localStorage.getItem('selected-course');
			var wrdArr = slctedCrs.split(" ");
			var clsNm = wrdArr[0] + " " + wrdArr[1];
			$.ajax({
				url: "/findCourse",
				type: "POST",
				data: JSON.stringify({courseName: clsNm}),
				contentType: "application/json",
				dataType: 'json'
			}).done(function(course){
				var crs = course.courseObj;
				if(crs != null){
					addCourseToPage(crs.name + " " + crs.title, crs.description, "separate-course-section", false);
				}
			});
		}
	}
	
});
