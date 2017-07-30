var Course = require("./Course");
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var url = "";
var ObjectId = require('mongodb').ObjectID;
var User = require("./User");

var Math41 = {
    _id: ObjectId(),
    name: "MATH 41",
    title: "Trigonometry and Analytic Geometry",
    description: "Straight lines, circles, functions and graphs, graphs of polynomial and rational functions, exponential and logarithmic functions, trigonometry, conic sections.",
    messages: [],
    students: []
};

var Math110 = {
    _id: ObjectId(),
    name: "MATH 110",
    title: "Techniques of Calculus I ",
    description: "Functions, graphs, derivatives, integrals, techniques of differentiation and integration, exponentials, improper integrals, applications. Students may take only one course for credit from MATH 110, 140, 140A, and 140B.",
    messages: [],
    students: []
};

var Math141 = {
    _id: ObjectId(),
    name: "MATH 141",
    title: "Calculus with Analytic Geometry II ",
    description: "Derivatives, integrals, applications; sequences and series; analytic geometry; polar coordinates. Students may take only one course for credit from MATH 141, 141B, and 141H.",
    messages: [],
    students: []
};

var CMPSC122 = {
    _id: ObjectId(),
    name: "CMPSC 122",
    title: "Intermediate Programming",
    description: "Object-oriented programming, recursion, fundamental data structures (including stacks, queues, linked lists, hash tables, trees, and graphs), the basics of algorithmic analysis, and an introduction to the principles of language translation.",
    messages: [],
    students: []
};

var CHEM112 = {
    _id: ObjectId(),
    name: "CHEM 112",
    title: "Chemical Principles II",
    description: "The course covers the following topics: reaction rates and chemical kinetics, catalysis, acid-base equilibria, the pH scale, common-ion effect, acid-base titrations, factors that affect solubility, buffers, chemical thermodynamics, entropy, free energy, electrochemistry, oxidation-reduction reactions, oxidation numbers, voltaic cells, batteries, corrosion, electrolysis, chemistry of the nonmetals such as hydrogen, oxygen, nitrogen, halogens, noble gases, transition metals, modern materials, alloys and metallurgy, nuclear chemistry, radioactivity, fission and fusion.&nbsp; GN credit for CHEM 112 requires that CHEM 113 or CHEM 113B also be completed.",
    messages: [],
    students: []
};

var courses = [Math41, Math110, Math141, CMPSC122, CHEM112];

// Connecting to Mongo Database Server and searching for user
MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    console.log("Connected correctly to server.");

    Course.insertCourse(db, Math41, function(){
          console.log(Math41.name + " was successfully Added to the database!");
    });

    Course.insertCourse(db, Math110, function(){
          console.log(Math110.name + " was successfully Added to the database!");
    });

    Course.insertCourse(db, Math141, function(){
          console.log(Math141.name + " was successfully Added to the database!");
    });

    Course.insertCourse(db, CMPSC122, function(){
          console.log(CMPSC122.name + " was successfully Added to the database!");
    });

    Course.insertCourse(db, CHEM112, function(){
          console.log(CHEM112.name + " was successfully Added to the database!");
    });

    Course.findCourse(db, {name: "MATH 41"}, function(course){
        console.log(course);
    });

    // var searchString = "c";
    // var courseNames = [], courses = [];
    // var courseMatch = [], courseHit = [];

    // // Finds all the courses 
    // Course.findAllCourses(db, function(course){
    //     // pushes all the courses to an array
    //     courseNames.push(course.name);
    //     courses.push(course);
    //     var courseCount = 0;

    //     // Iterates through each course to search for a match
    //     courseNames.forEach(function(courseName){
    //       var courseChar = courseName.substr(0, searchString.length);
    //       if(courseChar === searchString.toUpperCase()){
    //           courseHit.push(courseCount);
    //       }

    //       courseCount++;
    //     });

    // });

    // setTimeout(function(){
    //     //console.log(courses);
    //     courseHit = courseHit.filter(function(item, index, inputArray) {
    //       return inputArray.indexOf(item) == index;
    //     });
    //     console.log(courseHit);
    //     courseHit.forEach(function(index){
    //         //console.log("Index is " + index);
    //         courseMatch.push(courses[index]);
    //     });

    //     console.log(courseMatch);
    // }, 1000);

    //   Course.findAllCourses(db, function(course){
    //       console.log(course);
    //   });
    // Course.removeAllCourses(db);
    // User.removeAllUsers(db);
    //User.removeUser(db, ObjectId("585101bf6152379a2d39c681").valueOf());
    // User.updateUser(db, ObjectId("585102b3b70f91f72d8924e4").valueOf(), {fullName: "Replaced Again Son!"}, function(){
        
    // });
    
    // User.findAllUsers(db, function(user) {
    //     console.log(user);
    // });
    // var crs =   {
    //     name: 'MATH 141',
    //     title: 'Calculus with Analytic Geometry II ',
    //     description: 'Derivatives, integrals, applications; sequences and series; analytic geometry; polar coordinates. Students may take only one course for credit from MATH 141, 141B, and 141H.',
    //     messages: [],
    //     students: [] 
    // };

    // Course.updateCourse(db, "MATH 141", crs, function(){
       
    // });
    
    // Course.findAllCourses(db, function(course){
    //     console.log(course);
    // });
    // db.close();
});
