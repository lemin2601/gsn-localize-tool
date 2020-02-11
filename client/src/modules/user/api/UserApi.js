import {get,post,put,setAccessToken} from '../../../utils/apiCaller';
import {Profile} from '../User';

export const register = newUser => {
  return post(
    'users/register',
    {
      user:newUser.user,
      email:newUser.email,
      password: newUser.password
    }
  ).then(response => {
    console.log("Registered!");
  })
}

export const login = user => {
  console.log("login func:"+ JSON.stringify(user))
  return post(
    'users/login',
    {
      email:user.email,
      password:user.password
    }
  ).then(response => {
    console.log("login response:"+ JSON.stringify(response))
    Profile.setToken(response.data);
    setAccessToken(response.data);
    return response;
  }).catch(err => {
    console.log(err)
  })
}

export const detail = () => {
  console.log("send get detail profile");
    return get('users/profile').then(response => {
        console.log("get profile"+ JSON.stringify(response))
        return response;
    });
  }

export const logout = () => {
  return get('users/logout').then(response => {
    setAccessToken('');
    Profile.setToken('');
    return response;
  });
}

export const changePassword = (oldPassword, newPassword) => {
  return put(
    'users/change/pass',
    {
      oldPassword:oldPassword,
      newPassword:newPassword
    }
  ).then(response => {
    console.log("pass updated!")
    return response;
  })
}