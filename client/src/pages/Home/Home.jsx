import React, { useContext, useEffect, useState } from 'react';
import "./home.css";
import PostBar from '../../components/PostBar/PostBar';
import PostWindow from '../../components/PostWindow/PostWindow';
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu';
import MessageBox from '../../components/MessageBox/MessageBox';
import RequestBox from '../../components/RequetsBox/RequestBox';
import { Context } from '../..';
import { Navigate } from 'react-router';
import { Link } from "react-router-dom";
import axios from 'axios';
import { server } from '../../App';
import Peoples from '../../components/Peoples/Peoples';
import PeopleWindow from '../../components/PeopleWindow/PeopleWindow.jsx';
import AaccountSettings from '../../components/AccountSettings/AaccountSettings.jsx';
import ExploreFollowers from '../../components/ExploreFollowers/ExploreFollowers.jsx';
import SearchUser from '../../components/SearchUser/SearchUser.jsx';
import CreatePost from '../../components/CreatePost/CreatePost.jsx';


const Home = () => {
    const { isAuthonticated,

        userName, setUserName,
        userEmail, setUserEmail,
        setFollowers,
        setFollowing,
        setBio,
        setStatus,
        setLives,
        setWork,
        allUsersPosts, setAllUsersPosts,
        setPostAccouont,
        profilePhoto, setProfilePhoto,
        setNewProfilePhoto,
        refreshData,
        homePage,
        savedPostsPage,
        likedPosts,
        accountSettings,
        explore,
        followersList,
        followingList,
        newFeed,
        searchUser,
        setNoOfPosts,
        isCreatePost, setIsCreatePost

    } = useContext(Context);

    const createPostHandler = () => {
        setIsCreatePost(pre => !pre);

    };



    const [allSavedPosts, setAllSavedPosts] = useState([]);
    const [allLikedPosts, setAllLikedPosts] = useState([]);

    const [userFollowingList, setUserFollowingList] = useState([]);
    const [userFollwersList, setUserFollowersList] = useState([]);

    const [followingUserPosts, setFollowingUserPosts] = useState([]);




    useEffect(() => {

        if (isAuthonticated) {


            // Fetching User Data From API

            try {
                axios.get(`${server}/user/me`,
                    {
                        withCredentials: true
                    }).then((res) => {
                        const { name, email, followers, following, bio, status, lives, work, profilePicture, getNoOfPosts } = res.data.user;
                        setUserName(name);
                        setUserEmail(email);
                        setFollowers(followers);
                        setFollowing(following);
                        setBio(bio);
                        setStatus(status);
                        setLives(lives);
                        setWork(work);
                        setProfilePhoto(profilePicture);
                        setNoOfPosts(getNoOfPosts);

                    });

            } catch (error) {
                console.log(error);
            }



            // Fetching All Users Posts from API

            try {
                axios.get(`${server}/post/getallusersposts`,
                    {
                        withCredentials: true,
                    }).then((res) => {
                        // console.log(res.data.allposts);
                        setAllUsersPosts(res.data.allposts);
                        setNewProfilePhoto(res.data.userProfileData);


                        // console.log(res.data.userProfileData[0].profilePicture);


                    }).catch((e) => {
                        console.log(e.message);
                    });
                setPostAccouont(false);
            } catch (error) {
                console.log(error);
            }



            // Fetching All User Saved Posts Using API
            try {

                axios.get(`${server}/post/getsavedposts`, {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    withCredentials: true
                }).then((res) => {
                    // console.log(res.data.savedPosts);
                    setAllSavedPosts(res.data.savedPosts);
                }).catch((error) => {
                    console.log(error);
                });

            } catch (error) {
                console.log(error);


            }




            // Fetching Following User Posts 
            try {
                axios.get(`${server}/user/followingpost`, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true
                }).then((res) => {
                    // console.log(res.data.userPosts);
                    setFollowingUserPosts(res.data.userPosts);

                    const stamp = res.data.userPosts[0] && res.data.userPosts[0].createdAt;


                });




            } catch (error) {
                console.log(error);

            }




            // Fetching All User Liked Posts From API

            try {

                axios.get(`${server}/post/getlikedposts`, {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    withCredentials: true
                }).then((res) => {
                    setAllLikedPosts(res.data.likedPosts);
                    // console.log(res.data.likedPosts);
                }).catch((error) => {
                    console.log(error);
                });
            } catch (error) {
                console.log(error);
            }




            // Fetching User Followers and Following 

            axios.get(`${server}/user/getfollowerslist`,
                {
                    headers: {
                        "Content-Type": "application/json"
                    }, withCredentials: true
                }).then((res) => {

                    setUserFollowersList(res.data.followersList);
                    setUserFollowingList(res.data.followingList);

                }).catch((error) => {
                    console.log(error);
                });


        }



    }, [refreshData]);



    if (!isAuthonticated) return <Navigate to={"/login"} />;

    return (
        <>
            <div className='home'>

                {
                    isCreatePost && <CreatePost />
                }



                <div className="homeLeft">

                    {/* User Profile Icon and Username */}

                    <Link to={"/profile"}>
                        <div className="homeProfileIcon">
                            <img src={`image/${profilePhoto ? profilePhoto : "usericon.png"}`} alt="profileImage" />
                        </div>
                        <div className="homeProfileUsername">
                            <span style={{ textTransform: "capitalize" }}>{userName}</span>
                            <span>@{userEmail}</span>
                        </div>
                    </Link>


                    {/* Home Page Explore Menu */}
                    <ExploreMenu />

                    {/* HOme page left side  create post Button */}
                    <button onClick={createPostHandler} >Create Post</button>

                </div>




                <div className="homeCenter">
                    {/* Home page Center Post Bar  */}
                    <PostBar />


                    {/* Search User */}

                    {searchUser && <h2 style={{ margin: "15px 0px 0px 20px" }}>Search Result</h2>}

                    {
                        searchUser && <SearchUser />
                    }

                    {/* Home page Post Windows / Following Users Posts  */}
                    {

                        homePage && followingUserPosts?.map((i) => (
                            < PostWindow id={i._id} userName={i.username} userId={i.userId} desc={i.desc} img={i.img} likes={i.likes} profilePhoto={i.profilePicture} postDate={i.createdAt} key={i._id} />

                        ))

                    }


                    {/* Followers List on home screen */}

                    {
                        followersList && <ExploreFollowers userFollowerData={userFollwersList} />

                    }

                    {/* Follwoing List on home screen */}

                    {
                        followingList && <ExploreFollowers userFollowerData={userFollowingList} />
                    }



                    {/* Know more People */}

                    {
                        explore && <PeopleWindow />
                    }


                    {/* Saved Posts Window */}

                    {savedPostsPage && <h2 style={{ margin: "15px 0px 0px 20px" }}>Saved Posts</h2>}
                    {

                        savedPostsPage && allSavedPosts?.map((i) => (
                            < PostWindow id={i._id} userName={i.username} userId={i.userId} desc={i.desc} img={i.img} likes={i.likes} profilePhoto={i.profilePicture} postDate={i.createdAt} key={i._id} />

                        ))

                    }


                    {/* New feed / All Users Posts */}
                    {newFeed && <h2 style={{ margin: "15px 0px 0px 20px" }}>New Feed</h2>}
                    {
                        newFeed && allUsersPosts?.map((i) => (
                            < PostWindow id={i._id} userName={i.username} userId={i.userId} desc={i.desc} img={i.img} likes={i.likes} profilePhoto={i.profilePicture} postDate={i.createdAt} key={i._id} />

                        ))
                    }


                    {/* All Liked Posts */}

                    {likedPosts && <h2 style={{ margin: "15px 0px 0px 20px" }}>Liked Posts</h2>}
                    {

                        likedPosts && allLikedPosts?.map((i) => (
                            < PostWindow id={i._id} userName={i.username} userId={i.userId} desc={i.desc} img={i.img} likes={i.likes} profilePhoto={i.profilePicture} postDate={i.createdAt} key={i._id} />

                        ))

                    }

                    {/* Account Settings  */}

                    {accountSettings && <h2 style={{ margin: "15px 0px 0px 20px" }}>Settings</h2>}
                    {
                        accountSettings && <AaccountSettings />

                    }


                </div>

                <div className="homeRight">
                    {/* Message Inbox */}

                    {/* <MessageBox /> */}

                    {/* <RequestBox /> */}

                    <Peoples />

                </div>
            </div >
        </>
    );
};

export default Home;