import React, { Component } from 'react'
import jwt_decode from 'jwt-decode'
import UserLogin from './components/UserLogin'
import UserProfile from './components/UserProfile'

class User extends Component{
    render(){
        return "abc";
    }
}

const user = {
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
        localStorage.setItem('usertoken', token)
    },
    getUser:function(){
        console.log("get user");
       const token = localStorage.usertoken
        if(token){
            console.log('token:' + token)
            const decoded = jwt_decode(token)
            console.log('decoded:' + JSON.stringify(decoded))
            user.id = decoded.id;
            user.user = decoded.user;
            user.email = decoded.email;
            user.role = decoded.role;
            return user;
        }
        return {};
    }
};
function UserUtils(){
    console.log("user Utils")
}
export default User;
export {
    Profile,
    UserUtils,
    UserProfile,
    UserLogin
}