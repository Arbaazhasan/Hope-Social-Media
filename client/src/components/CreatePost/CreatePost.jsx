import React, { useContext, useEffect, useState } from 'react';
import './createPost.css';
import { BiImageAdd } from "react-icons/bi";
import { Context } from '../..';
import toast from 'react-hot-toast';
import axios from 'axios';
import { server } from '../../App';


const CreatePost = () => {

    const { setIsCreatePost, setRefreshData, setLoading } = useContext(Context);

    const createPostHandler = () => {
        setIsCreatePost(pre => !pre);
    };

    const [postData, setPostData] = useState('');
    const [postFile, setPostFile] = useState(null);

    const [imageView, setImageView] = useState(null);

    const submitHandler = async (e) => {

        e.preventDefault();

        if (postFile || postData) {

            setLoading(true);
            const formData = new FormData();
            formData.append('desc', postData);
            formData.append('image', postFile);
            try {

                const { data } = await axios.post(`${server}/post/create`,
                    formData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data"
                        },
                        withCredentials: true
                    }
                );
                setPostData("");
                setPostFile(null);
                setLoading(false);
                setIsCreatePost((pre) => !pre);
                toast.success(data.message);
                setRefreshData((pre) => !pre);

            } catch (error) {
                toast.error(error.response.message);
            }
        }


    };

    const onImageLoad = () => {
        setImageView(URL.createObjectURL(postFile));

    };


    useEffect(() => {
        // onImageLoad();


    }, [postFile]);


    return (
        <div className='createPostWindow'>
            <form action="" onSubmit={submitHandler} encType='multipart/form-data'>

                <div className="closeBtn">
                    <p>Create Post</p>
                    <span onClick={createPostHandler}>X</span>
                </div>


                <div className="inputBar">
                    <input type="text" placeholder='Whats s in your mind' onChange={(e) => setPostData(e.target.value)} />
                    <input id='uploadImage' type="file" onChange={(e) => setPostFile(e.target.files[0])} />
                    <label htmlFor="uploadImage"><BiImageAdd /></label>
                </div>

                {
                    postFile && <div className="imageViewer">
                        <img src={postFile && URL.createObjectURL(postFile)} alt="" />
                    </div>
                }

                <div className="uploadBtn">
                    <button type='submit'>Post</button>
                </div>


            </form>



        </div>
    );
};

export default CreatePost;