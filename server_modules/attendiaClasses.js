var Schema = (function () {
    
    /**
     * Generates a new user object
     * @param {String} firstName - any object 
     * @param {String} lastName - the type of data being added to the datastore
     * @param {String} email - the value of the data being added
     * @param {String} password - the value of the data being added
     * @return {Object} user object - user object
     */

    /*
    this.newUser = function (firstName, lastName, email, password) {
        return {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password
        };
    };*/

    /**
     * Generates a new email object
     * @param {String} to - to address
     * @param {String} from - from address
     * @param {Array} cc - the value of the data being added
     * @param {Array} bcc - the value of the data being added
     * @param {String} subject - the subject of the email
     * @param {String} content - the content of the email
     * @param {Array} attachments - array of files
     * @return {Object} user object - user object
     */

    /*
    this.newEmail = function (to, from, cc, bcc, subject, content, attachments) {
        return {
            to: to,
            from: from,
            cc: cc,
            bcc: bcc,
            subject: subject,
            content: content,
            attachments: attachments
        };
    };

    exports.newUser = this.newUser;
    exports.newEmail = this.newEmail;
    */




    // New stuff

    // inheritance
    /*
    var inherit = function (child, parent) {
        child.prototype = Object.create(parent.prototype);
    }
    */

    // attendance
    this.attendance = function (present) {
        return {
            present: present,
            // stores the current date in mm/dd/yyyy format if sign in is clicked
            sign: function () {
                var day = new Date();
                var dd = day.getDate();
                var mm = day.getMonth() + 1;
                var yyyy = day.getFullYear();
                if (dd < 10) {
                    dd = '0' + dd;
                }
                if (mm < 10) {
                    mm = '0' + mm
                }
                day = mm+'/'+dd+'/'+yyyy
                present.push(day);
            }
        };
    };

    // course
    this.course = function (name, id, attendance) {
        return {
            name: name,
            id: id,
            attendance: attendance
        };
    };

    // user
    this.user = function (firstName, lastName, userName, password, email, courses, calendar) {
        return {
            firstName: firstName,
            lastName: lastName,
            userName: userName,
            password: password,
            email: email,
            courses: courses,
            calendar: calendar
        };
    };

    // professor
    this.professor = function (firstName, lastName, userName, password, email, courses, calendar) {
        return {
            // creates a course object with empty attendance record and adds to the professor's array
            createCourse: function (name, id) {
                var hereList = []
                var courseNew = course(name, id, hereList)
                courses.push(courseNew)
            }
        };
    };

    // inheritance professor
    // inherit(professor, user);

    // student
    this.student = function (firstName, lastName, userName, password, email, courses, calendar) {
        return {
            // adds course object to course array
            addCourse: function (courseNew) {
                courses.push(courseNew);
            },
            // sign in attendence for a course
            // passes in the course index to sign in for the attendance for the course in the array
            signAttendance: function (courseIndex) {
                student.course[courseIndex].attendance.sign();
            }
        };
    };

    // inheritance student
    // inherit(student, user);

    // login
    this.login = function (username, password) {
        return {
            username: username,
            password: password
        };
    };

    //**************CALENDAR***************

    // event
    this.event = function (name, startDate, endDate, content, id) {
        return {
            name: name,
            startDate: startDate,
            endDate: endDate,
            content: content,
            id: id
        };
    };

    // user event
    this.userEvent = function (name, startDate, endDate, content, id, idType) {
        return {
            name: name,
            startDate: startDate,
            endDate: endDate,
            content: content,
            id: id,
            idType: idType

        }
    }

    // inheritance user event
    // inherit(userEvent, event);

    // class event
    this.classEvent = function (name, startDate, endDate, content, id, classType) {
        return {
            name: name,
            startDate: startDate,
            endDate: endDate,
            content: content,
            id: id,
            //1 = hw, 2 = project, 3 = test, 4 = exams
            classType: classType

        }
    }

    // inheritance class event
    // inherit(classEvent, event);

    // calendar
    this.calendar = function (events) {
        return {
            events: events,
            // creates an event and adds it to the event array
            createEvents: function (name, startDate, endDate, content, id) {
                var eventNew = newEvent(name, startDate, endDate, content, id);
                events.push(eventNew);
            },
            // takes an event index to edit content of the event in the event array
            updateEvents: function (name, index, content, startDate, endDate) {
                events[index].name = name;
                events[index].index = index;
                events[index].content = content;
                events[index].startDate = startDate;
                events[index].endDate = endDate;
            },
            //  takes a event index and deletes it from the event array
            deleteEvents: function (index) {
                if (index > -1) {
                    events.splice(index, 1);
                }
            }
        };
    };
    
    //**********DISCUSSION BOARD***********

    // message
    this.message = function (name, date, content, id) {
        return {
            name: name,
            date: date,
            content: content,
            id: id
        }
    };

    // discussion
    this.discussion = function (messages) {
        return {
            // creates a message and adds it to an message array
            messages: messages,
            createMessage: function (name, date, content, id) {
                var messageNew = newMessage(name, date, content, id);
                messages.push(messageNew);
            },
            // takes an index input to retrieve an message from the message array to update
            updateMessage: function (index, content) {
                messages[index].content = content;
            },
            // takes an index input to delete the message from the message array
            deleteMessage: function (index) {
                if (index > -1) {
                    messages.splice(index, 1);
                }
            }
        };
    };
});
