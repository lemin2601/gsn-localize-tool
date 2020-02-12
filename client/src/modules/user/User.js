import React, { Component } from 'react'
import jwt_decode from 'jwt-decode'
import UserLogin from './components/UserLogin'
import UserProfile from './components/UserProfile'

const user = {
    isAuthenticated:false,
    id:-1,
    user:"",
    email:"",
    role:""
}

const Profile = {
    isAuthenticated:false,
    getId:function(){
        if(this.isAuthenticated){

        }else{
            return -1;
        }
    },
    setToken:function(token){
        if(token && token != ''){
            console.log('token:' + token)
            const decoded = jwt_decode(token)
            console.log('decoded:' + JSON.stringify(decoded))
            user.id = decoded.id;
            user.user = decoded.user;
            user.email = decoded.email;
            user.role = decoded.role;
            user.isAuthenticated = true;
        }else{
            user.id = -1;
            user.user = '';
            user.email = '';
            user.role = '';
            user.isAuthenticated = false;
        }
        localStorage.setItem('usertoken', token)
    },
    getUser:function(){
        return user;
    }
};
function UserUtils(){
    console.log("user Utils")
}
export {
    Profile,
    UserUtils,
    UserProfile,
    UserLogin,
    user
}
