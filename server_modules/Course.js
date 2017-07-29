 /****************************************
 *             COURSE MODULE             *
 ****************************************/
(function() {
    var assert = require('assert');
    
    var insertCourse = function(db, course, callback) {
       db.collection('courses').insertOne(course, function(err, result) {
        // assert.equal(err, null);
        console.log("Inserted a course into the courses collection.");
        callback();
      });
    };
    
    var findCourse= function(db, courseName, callback) {
       db.collection('courses').findOne({name: courseName}, function(err, usr){
            // assert.equal(null, err);
            callback(usr);
       });
    };
    
    var findAllCourses = function(db, callback) {
        var myCursor = db.collection('courses').find();
        myCursor.forEach(callback);
    };
    
    var removeAllCourses = function(db) {
        db.collection('courses').remove({});
    };
    
    var updateCourse = function(db, courseName, course, callback) {
        db.collection('courses').update({name: courseName}, course, function(err, recordsModified, status){
            callback(err, recordsModified, status);
        });
    };
    
    exports.insertCourse = insertCourse;
    exports.findCourse = findCourse;
    exports.findAllCourses = findAllCourses;
    exports.removeAllCourses = removeAllCourses;
    exports.updateCourse = updateCourse;
}).call(this);