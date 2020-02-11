import React, { Component } from 'react'
import { 
  BrowserRouter as Router, 
  Route,
  // useHistory,
  // useLocation
} from 'react-router-dom'

import Navbar from './components/Navbar'
import Landing from './components/Landing'
import {UserLogin,UserProfile} from '../user/User'
import Register from './components/Register'
import Login from './components/Login'

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <Route exact path="/" component={Landing} />
          <div className="container">
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={UserLogin} />
            <Route exact path="/profile" component={UserProfile} />
          </div>
        </div>
      </Router>
    )
  }
}

export default App