import React, { Component, useState } from 'react'
import { Redirect } from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import { Profile as UserProfile} from '../User'
import UserChangePassword from './UserChangePassword'
import { detail } from '../api/UserApi'

function Profile(){
    const profile = UserProfile.getUser();
    const [user] = useState(profile.user);
    const [email] = useState(profile.email);

    detail().then(response=>{
        console.log("get profile");
    })
    return (
            <div className="container">
                <div className="jumbotron mt-5">
                    <div className="col-sm-8 mx-auto">
                        <h1 className="text-center">PROFILE</h1>
                    </div>
                    <table className="table col-md-6 mx-auto">
                        <tbody>
                            <tr>
                                <td>User</td>
                                <td>{user}</td>
                            </tr>
                            <tr>
                                <td>Email</td>
                                <td>{email}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <UserChangePassword/>

            </div>
        )
}
// class Profile extends Component {
//     constructor() {
//         super()
//         this.state = {
//             user: '',
//             email: '',
//             oldPassword:'',
//             newPasword:'',
//             errors: {}
//         }
//         this.onChange = this.onChange.bind(this)
//         this.onSubmit = this.onSubmit.bind(this)
//     }

//     componentDidMount() {
//         const token = localStorage.usertoken
//         if (token) {
//             console.log('token:' + token)
//             // const decoded = jwt_decode(token)
//             const user = UserProfile.getUser();
//             // this.setState({
//             //   first_name: decoded.first_name,
//             //   last_name: decoded.last_name,
//             //   email: decoded.email
//             // })
//             this.setState({
//                 user: user.user,
//                 email: user.email
//             })
//         }
//     }
//     handleOnChange(e){
//         console.log("handleOnChange:" + e.target.name +"|" + e.target.value);
//         this.setState({ [e.target.name]: e.target.value })
//     }
//     onChange(e) {
//         this.setState({ [e.target.name]: e.target.value })
//       }

//     onSubmit(e) {
//         e.preventDefault()

//         const user = {
//             email: this.state.email,
//             password: this.state.password
//         }

//         login(user).then(res => {
//             if (res) {
//                 this.props.history.push(`/profile`)
//             }
//         })
//     }

//     render() {
//         if (localStorage.usertoken === undefined) {
//             return <Redirect to='/' />
//         }
//         return (
//             <div className="container">
//                 <div className="jumbotron mt-5">
//                     <div className="col-sm-8 mx-auto">
//                         <h1 className="text-center">PROFILE</h1>
//                     </div>
//                     <table className="table col-md-6 mx-auto">
//                         <tbody>
//                             <tr>
//                                 <td>User</td>
//                                 <td>{this.state.user}</td>
//                             </tr>
//                             <tr>
//                                 <td>Email</td>
//                                 <td>{this.state.email}</td>
//                             </tr>
//                         </tbody>
//                     </table>
//                     <div className="row">
//                         <div className="col-md-6 mt-5 mx-auto">
//                             <form noValidate onSubmit={this.onSubmit}>
//                                 <h1 className="h3 mb-3 font-weight-normal">Change password</h1>
//                                 <div className="form-group">
//                                     <label htmlFor="password">Old password</label>
//                                     <input
//                                         type="password"
//                                         className="form-control"
//                                         name="oldPassword"
//                                         placeholder="old Password"
//                                         value={this.state.oldPassword}
//                                         onChange={this.onChange}
//                                     />
//                                 </div>
//                                 <div className="form-group">
//                                     <label htmlFor="password">New Password</label>
//                                     <input
//                                         type="password"
//                                         className="form-control"
//                                         name="newPassword"
//                                         placeholder="New-Password"
//                                         value={this.state.newPassword}
//                                         onChange={this.onChange}
//                                     />
//                                 </div>
//                                 <button
//                                     type="submit"
//                                     className="btn btn-lg btn-primary btn-block"
//                                 >Change</button>
//                             </form>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         )
//     }
// }

export default Profile