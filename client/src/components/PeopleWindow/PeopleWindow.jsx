import React, { useContext, useEffect, useState } from 'react';
import "./peopleWindow.css";
import axios from 'axios';
import { server } from '../../App';
import { Link } from 'react-router-dom';
import { Context } from '../..';


const PeopleWindow = () => {

    const { setUserProfileId } = useContext(Context);

    const [peopleAlluserData, setPeopleAlluserData] = useState([]);

    const [checkIsFollow, setCheckIsFollow] = useState();

    const [reRenderData, setReRenderData] = useState(false);


    const followUser = async (userId) => {


        try {

            const { data } = await axios.put(`${server}/user/follow/${userId}`, {},
                {
                    headers: {
                        "Content-type": "application/json"
                    },
                    withCredentials: true
                });

            setReRenderData((pre) => !pre);

        } catch (error) {
            console.log(error);

        }

    };


    useEffect(() => {

        // Fetching All User from the Database 


        try {
            axios.get(`${server}/user/getallusers`, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true,
            }).then((res) => {
                setPeopleAlluserData(res.data.allUsers);

                // console.log(peopleAlluserData);


            }).catch((error) => {
                console.log(error);
            });
        } catch (error) {

            console.log(error);
        }



    }, [reRenderData]);


    return (
        <div className='mainPeopleWindow'>
            <div className="peopleWindowHeading">
                <h2>Know More People </h2>
            </div>

            <div className="peopleWindow">


                {
                    peopleAlluserData.map((i) => {
                        return <div className="userProfileBox" key={i._id}>


                            <Link to={'/userprofile'} onClick={() => { setUserProfileId(i._id); }} className="userProfilePicture">
                                <img src={`image/${i.profilePicture ? i.profilePicture : "usericon.png"}`} alt="" />
                            </Link>
                            <p>{i.name}</p>
                            <div ><button onClick={() => followUser(i._id)}>{i.isFollow ? "Unfollow" : "Follow"}</button>
                            </div>

                        </div>;
                    }
                    )
                }


            </div>
        </div >
    );
};

export default PeopleWindow;;;