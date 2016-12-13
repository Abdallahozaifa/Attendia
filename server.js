/* IMPORTS */
var express = require('express');
var fs = require('fs');
var app = express();
var bodyParser = require("body-parser");
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var User = require('./User');
var url = 'mongodb://localhost:27017/attendia';
var ObjectId = require('mongodb').ObjectID;
var Course = require("./Course");

var kelly = {
      _id: ObjectId(),
      name: { first: "Kelly", last: "Johnson" },
      email: "Abdallahozaifa19527@gmail.com",
      password: "hozaifa"
};

var userSearch = {
    name: {first: "Kelly", last: "Johnson"}
};


/* Serving static files in express */
app.use(express.static('html'));
app.use('/js', express.static('js'));
app.use('/css', express.static('css'));
app.use('/ratchet', express.static('ratchet'));

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());


/* Main Page for Slide Master */
app.get('/index.html', function(req, res) {

    /* Sends the index html page to the user */
    fs.readFile('index.html', 'utf8', function(err, data) {
        if (!err) res.send(data);
        else return console.log(err);
    });
});

app.post('/searchCourse', function(req, res) {
    var searchString = req.body.searchStr;
    var courseMatch = [];
    console.log(searchString);
    
    // Connecting to Mongo Database Server and searching for course
    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        console.log("Connected correctly to server.");
        var courseNames = [], courses = [], courseHit = [];
        
        // Finds all the courses 
        Course.findAllCourses(db, function(course){
            // pushes all the courses to an array
            courseNames.push(course.name);
            courses.push(course);
            var courseCount = 0;
            
            // Iterates through each course to search for a match
            courseNames.forEach(function(courseName){
              var courseChar = courseName.substr(0, searchString.length);
              if(courseChar === searchString.toUpperCase()){
                  courseHit.push(courseCount);
              }
              
              courseCount++;
            });
            
        });
        
        setTimeout(function(){
            courseHit = courseHit.filter(function(item, index, inputArray) {
               return inputArray.indexOf(item) == index;
            });
            console.log(courseHit);
            courseHit.forEach(function(index){
                courseMatch.push(courses[index]);
            });
            
            console.log(courseMatch);
            res.send({courses: courseMatch});
        }, 1000);
        
    });
});


app.post('/userinfo', function(req, res){
   var user = req.body;

   // User is logging in
   if(Object.keys(user).length == 2){
       console.log("User is logging in");
       
       var userSearch = {
            userName: user.userName,
            password: user.password
        };
        
       // Connecting to Mongo Database Server and searching for user
       MongoClient.connect(url, function(err, db) {
          assert.equal(null, err);
          console.log("Connected correctly to server.");
        
          User.findUser(db, userSearch, function(user){
              
              // User exists with the correct credentials!
              if(user != null){
                  console.log("User exists!");
                  res.send({response: "User exists!", user: user});
              }
              
              // User entered incorrect credentials
              else{
                  console.log("User does not exists!");
                  res.send({response: "User does not exists!", user: user});
              }
              
              db.close();
          });
        });
   }
   
   // User is signing up
   else{
       console.log("User is signing up");
       user.courses = [];
       
       // Connecting to Mongo Database Server and searching for user
       MongoClient.connect(url, function(err, db) {
          assert.equal(null, err);
          console.log("Connected correctly to server.");
          
          
          User.insertUser(db, user, function(){
              console.log(user.fullName + " was successfully Added to the database!");
              //console.log(user);
          });
        });
        
        console.dir(user);
        res.send({response: "User successfully signed up!", userObj: user});
   }
});


/* Listens on the Server Port */
var server = app.listen(process.env.PORT || '8080', '0.0.0.0', function() {
    if(process.env.PORT){
        console.log("https://attendia-sweng411-real-abdallahozaifa.c9users.io/index.html");
    }else{
        console.log('App listening at http://%s:%s', server.address().address, server.address().port);
    }
});