import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { createContext } from 'react';

export const Context = createContext({ isAuthonticated: false });


const AppWrapper = () => {

  const [isAuthonticated, setIsAuthonticated] = useState(false);
  const [refreshData, setRefreshData] = useState(false);
  const [user, setUser] = useState({});
  const [userName, setUserName] = useState();
  const [userEmail, setUserEmail] = useState();
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [searchUserData, setSearchUserData] = useState([]);

  const [bio, setBio] = useState();
  const [status, setStatus] = useState();
  const [lives, setLives] = useState();
  const [work, setWork] = useState();
  const [profilePhoto, setProfilePhoto] = useState();
  const [postData, setPostData] = useState();
  const [allUsersPosts, setAllUsersPosts] = useState();
  const [postAccount, setPostAccouont] = useState(false);
  const [newProfilePhoto, setNewProfilePhoto] = useState();
  const [commentBox, setCommentBox] = useState();
  const [userProfileId, setUserProfileId] = useState();

  const [loading, setLoading] = useState(false);
  const [savedPostWindow, setSavedPostWindow] = useState(false);
  const [homePage, setHomePage] = useState(true);
  const [savedPostsPage, setSavedPostsPage] = useState(false);
  const [likedPosts, setLikedPosts] = useState(false);
  const [accountSettings, setAccountSettings] = useState(false);
  const [explore, setExplore] = useState(false);
  const [followersList, setFollowersList] = useState(false);
  const [followingList, setFollowingList] = useState(false);
  const [noOfPosts, setNoOfPosts] = useState();
  const [newFeed, setNewFeed] = useState(false);
  const [searchUser, setSearchUser] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [isCreatePost, setIsCreatePost] = useState(false);





  const [val, setVal] = useState();




  return (

    <Context.Provider value={{
      isAuthonticated,
      setIsAuthonticated,
      refreshData, setRefreshData,
      user,
      setUser,
      userName, setUserName,
      userEmail, setUserEmail,
      followers, setFollowers,
      following, setFollowing,
      bio, setBio,
      status, setStatus,
      lives, setLives,
      work, setWork,
      postData, setPostData,
      allUsersPosts, setAllUsersPosts,
      postAccount, setPostAccouont,
      profilePhoto, setProfilePhoto,
      newProfilePhoto, setNewProfilePhoto,
      commentBox, setCommentBox,
      loading, setLoading,
      savedPostWindow, setSavedPostWindow,
      homePage, setHomePage,
      savedPostsPage, setSavedPostsPage,
      likedPosts, setLikedPosts,
      accountSettings, setAccountSettings,
      explore, setExplore,
      followersList, setFollowersList,
      followingList, setFollowingList,
      noOfPosts, setNoOfPosts,
      newFeed, setNewFeed,
      searchUser, setSearchUser,
      searchUserData, setSearchUserData,
      userProfileId, setUserProfileId,
      isSearch, setIsSearch,
      isCreatePost, setIsCreatePost,


      val, setVal

    }}>
      <App />
    </Context.Provider>
  );
};


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode >
    <AppWrapper />
  </React.StrictMode>
);