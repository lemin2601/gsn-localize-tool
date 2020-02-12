import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  useHistory,
  useLocation
} from 'react-router-dom'

import Navbar from './components/Navbar'
import Landing from './components/Landing'
import { UserLogin, UserProfile, user, Profile } from '../user/User'
import Register from './components/Register'
import Login from './components/Login'
import {setAccessToken} from '../../utils/apiCaller'
import {UserTable} from '../admin/Admin'

class App extends Component {
  constructor(props) {
    super(props)
    if (!user.isAuthenticated) {
      if (localStorage.usertoken) {
        console.log("reload login from token");
        Profile.setToken(localStorage.usertoken);
        setAccessToken(localStorage.usertoken);

      }
    }
    console.log('allways called');
  }
  render() {

    return (
      <Router>
        <div className="App">
          <Navbar />
          <div className="container">
            <Switch>
              <Route path="/register" component={Register} />
              <Route path="/login" component={UserLogin} />
              
              <AdminRoute path='/admin'>
                <Route path="/admin/users" component={UserTable} />
              </AdminRoute>

              <MemberRouter path='/'>
                <Route path="/" component={Landing} />
                <Route path="/profile" component={UserProfile} />
              </MemberRouter>
            </Switch>
          </div>
        </div>

      </Router>
    )
  }
}
function MemberRouter({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        (user.isAuthenticated) ? (
          children
        ) : (
            <Redirect
              to='/login'
            ></Redirect>)
      }
    ></Route>
  )
}
function AdminRoute({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        (user.isAuthenticated && (user.role === 'admin' || user.role === 'modadmin')) ? (
          children
        ) : (
            <Redirect
              to='/'
            ></Redirect>)
      }
    ></Route>
  )
}
export default App