import React, { Component, useState } from 'react'
import { changePassword} from '../api/UserApi'

function UserChangePassword() {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [hidden, setHidden] = useState(true);

    function onSubmit(e) {
        e.preventDefault();
        changePassword(oldPassword,newPassword).then(respone=>{

        });
        console.log('update password' + oldPassword + "|" + newPassword);
    }
    function handleOnChangeOldPassword(e) {
        setOldPassword(e.target.value);
    }
    function handleOnChangeNewPassword(e) {
        setNewPassword(e.target.value);
    }
    function handleOnChangeHidden(e) {
        setHidden(!hidden);
    }
    return (

        <div>
            <form noValidate onSubmit={onSubmit} method='post'>
                <h1 className="h3 mb-3 font-weight-normal">Change password</h1>
                <div className="form-check">
                    <input
                        id='checkbox-hidden'
                        type='checkbox'
                        className='form-check-input'
                        onClick={handleOnChangeHidden} />
                    <label
                        className='form-check-label'
                        htmlFor='checkbox-hidden'
                    >show password</label>
                </div>

                <div className="form-group row">
                    <label htmlFor="password" className='col-sm-2 col-form-label'>Old password</label>
                    <input
                        type={hidden ? "password" : "text"}
                        className="form-control col-sm-10"
                        name="oldPassword"
                        placeholder="old Password"
                        value={oldPassword}
                        onChange={handleOnChangeOldPassword}
                    />
                </div>
                <div className="form-group row">
                    <label htmlFor="password" className='col-sm-2 col-form-label'>New Password</label>
                    <input
                        type={hidden ? "password" : "text"}
                        className="form-control col-sm-10"
                        name="newPassword"
                        placeholder="New-Password"
                        value={newPassword}
                        onChange={handleOnChangeNewPassword}
                    />
                </div>
                <button
                    type="submit"
                    className="btn btn-lg btn-primary btn-block"
                >Change</button>
            </form>

        </div>
    )
}

export default UserChangePassword