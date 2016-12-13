/* global $ */
/* View component that contains all the components neccessary for the visual elements of the web slide player */
var User = {
    
    /* Users full name*/
    name: null,
    
    /* Users email */ 
    email: null,
    
    /* User's username */
    userName: null,
    
    setName: function(name){
        this.name = name;
    },
    
    setEmail: function(email){
        this.email = email;
    },
    
    setUserName: function(userName){
        this.userName = userName;
    },
    
    getName: function(name){
        return this.name;
    },
    
    getEmail: function(email){
        return this.email;
    },
    
    getUserName: function(userName){
        return this.userName;
    }
};