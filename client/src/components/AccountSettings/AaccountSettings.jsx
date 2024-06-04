import React, { useContext, useEffect, useState } from 'react';
import "./accountSettings.css";
import { Context } from '../..';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { server } from '../../App';
import toast from 'react-hot-toast';

const AaccountSettings = () => {
    const { setVal } = useContext(Context);

    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordMatch, setPasswordMatch] = useState(false);

    const passwordHandler = async (e) => {
        e.preventDefault();

        try {
            if (newPassword === confirmPassword) {
                if (currentPassword && newPassword && confirmPassword) {
                    const { data } = await axios.post(`${server}/user/resetpassword`, {
                        newPassword
                    }, {
                        headers: {
                            "Content-Type": "application/json"
                        },
                        withCredentials: true
                    });

                    setCurrentPassword('');
                    setNewPassword('');
                    setConfirmPassword('');

                    toast.success(data.message);
                }
            } else {
                setPasswordMatch(true);
            }
        } catch (error) {
            console.error(error);
            toast.error("An error occurred while changing the password.");
        }
    };

    return (
        <div className='AaccountSettings'>
            <div className="ChangePassword">
                <div className="ChangePasswordWidnowClose" onClick={() => setVal("home")}>
                    <label htmlFor="">X</label>
                </div>
                <div className="ChangePasswordHeading">
                    <h1>Settings</h1>
                </div>
                <form onSubmit={passwordHandler}>
                    <h3>Change Password</h3>
                    <input type="password" placeholder='Enter the old password' value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
                    <input type="password" placeholder='Enter the new password' value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                    <input type="password" placeholder='Re-enter the new password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />

                    {passwordMatch && <p>Passwords do not match!</p>}

                    <button type='submit'>Change</button>
                </form>
            </div>
        </div>
    );
};

export default AaccountSettings;
