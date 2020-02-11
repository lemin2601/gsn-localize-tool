import axios from 'axios'
import {Profile} from './../../user/User';

export const register = newUser => {
  return axios
    .post('users/register', {
      user: newUser.user,
      email: newUser.email,
      password: newUser.password
    })
    .then(response => {
      console.log('Registered')
    })
}

export const login = user => {
  return axios
    .post('users/login', {
      email: user.email,
      password: user.password
    })
    .then(response => {
      console.log("response");

      Profile.setToken(response.data);
      // localStorage.setItem('usertoken', response.data)
      return response.data
    })
    .catch(err => {
      console.log("errore");
      console.log(err)
    })
}