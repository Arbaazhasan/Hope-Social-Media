import React, { useContext } from 'react';
import "./profileWindow.css";
import axios from 'axios';
import { server } from '../../App';
import { Context } from '../..';
import Bio from '../Bio/Bio';
import { FiUsers } from "react-icons/fi";

const ProfileWindow = ({ username, email, followers, following, profilePhoto, noOfPosts }) => {
    // const { profilePhoto } = useContext(Context);
    // console.log(username, email, followers, following);
    // console.log(profilePhoto)

    const {
        bio,
        status,
        lives,
        work,
        isUpdateBioWindow, setIsUpdateBioWindow,
    } = useContext(Context);

    return (
        <div>
            <div className="profileWindow">


                <div className="profileBioIcon">
                    <button onClick={() => setIsUpdateBioWindow((pre) => !pre)}>Edit Profile</button>

                </div>

                {
                    isUpdateBioWindow && <div className="userBioWindow">
                        <div>
                            <Bio bio={bio} status={status} lives={lives} work={work} />
                        </div>
                    </div>
                }


                <div className="userBackgroundImage">
                    <img src={`image/${profilePhoto ? profilePhoto : "usericon.png"}`} alt="backgroundImage" />
                </div>

                <div className="userProfileInfo">
                    <div className="userProfilePhoto1st">
                        <div className='userProfilePhoto'>

                            <img src={`image/${profilePhoto ? profilePhoto : "usericon.png"}`} alt="profilePhoto" />
                        </div>
                    </div>

                    <div className="userNameAndBio">
                        <p style={{ cursor: "pointer" }}>{username}</p>
                        <span style={{ cursor: "pointer" }}>{email}</span>
                    </div>

                    <div className="userFollowList">
                        <div className="userFollowings" style={{ cursor: "pointer" }}>
                            <p >{followers.length}</p>
                            <span>Followers</span>
                        </div>
                        <div className="userFollowers" style={{ cursor: "pointer" }}>
                            <p> {following.length}</p>
                            <span>Followings</span>
                        </div>
                        <div className="userPosts" style={{ border: "none", cursor: "pointer" }}>
                            <p>{noOfPosts}</p>
                            <span>Posts</span>
                        </div>
                    </div>

                </div>
            </div>
        </div >
    );
};

export default ProfileWindow;