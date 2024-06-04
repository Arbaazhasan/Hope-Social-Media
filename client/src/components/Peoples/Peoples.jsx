import React, { useContext, useEffect, useState } from 'react';
import "./peoples.css";
import axios from 'axios';
import { server } from '../../App';
import { Link } from 'react-router-dom';
import { Context } from '../..';

const Peoples = () => {
    const [getAllusers, setGetAllusers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { setUserProfileId, setExplore, setVal } = useContext(Context);

    useEffect(() => {
        axios.get(`${server}/user/getallusers`, {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true,
        })
            .then((res) => {
                setGetAllusers(res.data.allUsers);
                setLoading(false);
            })
            .catch((error) => {
                setError(error);
                setLoading(false);
            });
    }, []);

    return (
        <div>
            <div className="peoplesWindow">
                <div className='youWantToKnow'>
                    <h3>You want to know</h3>
                </div>


                {/* {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p>Error loading data</p>
                ) : (

                )} */}


                <div className="peopleTabs">
                    {getAllusers.map((user) => (
                        <Link to={"/userprofile"} onClick={() => { setUserProfileId(user._id); }} key={user._id} className="peopleTab">
                            <div className="peopleProfileIcon">
                                <img src={`image/${user.profilePicture}`} alt="ProfileIcon" />
                            </div>
                            <div>
                                <div>
                                    <p>{user.name}</p>
                                </div>
                                {/* <span>UnFollow</span> */}
                            </div>
                        </Link>
                    ))}
                </div>
                <div className="morePeoples">

                    <p onClick={() => { setVal("Explore"); }}>More</p>

                </div>
            </div>
        </div>
    );
};

export default Peoples;
