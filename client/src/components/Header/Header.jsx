import React, { useContext, useState } from 'react';
import './header.css';
import { AiOutlineSearch } from "react-icons/ai";
import axios from 'axios';
import { server } from "../../App";
import { Context } from '../..';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { RxHamburgerMenu } from "react-icons/rx";
import ExploreMenu from '../ExploreMenu/ExploreMenu';


const Header = () => {

  const navigate = useNavigate();



  const { setIsAuthonticated, profilePhoto, setVal,
    setSearchUserData,
    isSidebar, setIsSidebar,
    userEmail, userName,


  } = useContext(Context);

  const [logoutBtn, setLogoutBtn] = useState();
  const [searchUserName, setSearchUserName] = useState();


  // Logout API
  const submitHandler = async () => {
    try {
      const { data } = await axios.get(`${server}/user/logout`,
        {
          headers: {
            "Content-type": "application/json"
          },
          withCredentials: true,
        }
      );
      setIsAuthonticated(false);
      toast.success(data.message);
    } catch (error) {

      setIsAuthonticated(true);
      toast.error(error.reponse.message);

    }


  };


  // Search A User
  const searchData = (e) => {

    e.preventDefault();


    try {

      axios.get(`${server}/user/getUserProfile/${searchUserName}`, {
        header: {
          "Content-Type": "application/json"
        },
        withCredentials: true
      }).then((res) => {
        setSearchUserData(res.data);
        // console.log(searchUserData);
      });

      navigate('/');

    } catch (error) {

      console.log(error);

    }



  };

  return (
    <div className='header'>

      <div className="slidingSidebar" style={{ "display": isSidebar ? "block" : "none" }}>
        <ExploreMenu userEmail={userEmail} profilePhoto={profilePhoto} userName={userName} />

      </div>

      <main>
        <div className="headerLogo">
          <p onClick={() => setIsSidebar((pre) => !pre)}>
            <RxHamburgerMenu size={40} />
          </p>
          <span>Hope</span>

        </div>


        <div className="HeaderCenter">
          <form action="" onSubmit={searchData}>
            <p>
              <AiOutlineSearch size={25} />
            </p>
            <input onClick={() => { setVal("SearchUser"); }} onChange={(e) => { setSearchUserName(e.target.value); }} type="text" placeholder='Search for Creators, Inspiration and projects ' />
          </form>
        </div>




        <div className="UserProfileIcon">
          <div>
            <img src={`image/${profilePhoto ? profilePhoto : "usericon.png"}`} alt="Profile" onClick={(e) => setLogoutBtn((pre) => !pre)} />
            {
              logoutBtn && <label id='LogoutBtn' onClick={submitHandler}>Log Out</label>
            }
          </div>
        </div>
      </main>

    </div>
  );
};

export default Header;