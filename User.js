 /****************************************
 *             USER MODULE               *
 ****************************************/
(function() {
    var assert = require('assert');
    
    var insertUser = function(db, user, callback) {
       db.collection('users').insertOne(user, function(err, result) {
        assert.equal(err, null);
        console.log("Inserted a user into the users collection.");
        callback();
      });
    };
    
    var findUser = function(db, user, callback) {
       var cursor = db.collection('users').findOne(user, function(err, usr){
            assert.equal(null, err);
            callback(usr);
       });

    };
    
    exports.insertUser = insertUser;
    exports.findUser = findUser;
}).call(this);