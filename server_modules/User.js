 /****************************************
 *             USER MODULE               *
 ****************************************/
(function() {
    var assert = require('assert');
    
    var insertUser = function(db, user, callback) {
       db.collection('users').insertOne(user, function(err, result) {
        // assert.equal(err, null);
        console.log("Inserted a user into the users collection.");
        callback();
      });
    };
    
    var findUser = function(db, user, callback) {
       db.collection('users').findOne(user, function(err, usr){
            // assert.equal(null, err);
            callback(usr);
       });
    };
    
    var removeAllUsers = function(db) {
        db.collection('users').remove({});
    };
    
    var updateUser = function(db, usrID, usr, callback) {
        db.collection('users').update({_id: usrID}, usr, function(err, recordsModified, status){
            callback(err, recordsModified, status);
        });
    };
    
    var findAllUsers = function(db, callback) {
        var myCursor = db.collection('users').find();
        myCursor.forEach(callback);
    };
    
    var removeUser = function(db, userID){
        db.collection('users').remove({ _id: userID });
    };
    
    exports.insertUser = insertUser;
    exports.findUser = findUser;
    exports.removeAllUsers = removeAllUsers;
    exports.updateUser = updateUser;
    exports.findAllUsers = findAllUsers;
}).call(this);