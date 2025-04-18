import React, { useState, useEffect } from "react";
import Navbar from './../layout/Navbar';
import { Skeleton } from "antd";
import MyPost from "../layout/MyPost";
import SlotCounter from 'react-slot-counter';
import axios from "axios";
function Profile() {
    const [me, setMe] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedLogin = localStorage.getItem("isLogin");
        if (!storedLogin) {
            window.location.href = "/login";
        }
        const getMe = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_SERVER_API_URL}/auth/me`);
                if (response.status === 200) {
                    setMe(response.data.user);
                    setLoading(false);
                }
            } catch (error) {
                console.error("Error fetching user data:", error.message);
                localStorage.removeItem("isLogin");
            }
        }
        getMe();

    }, [])
    const joinDate = new Date(me?.createdAt)
    const months = [
        "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
    ]

    return (
        <div className="min-h-screen w-full">
            <Navbar />
            <div id='profile-info' className='w-full min-h-48 shadow-xl shadow-primary/15 p-4 flex'>
                {
                    loading ? <Skeleton avatar active paragraph={{ rows: 2, width: "30%" }} title={{ width: "50%" }} /> : (
                        <>
                            <div className="h-24 w-24 md:w-48 md:h-48">
                                <img src={me.profilePicture} alt="ProfileImage" className='select-none h-24 w-24 md:w-36 md:h-36 rounded-full object-cover' />

                            </div>
                            <div className="flex flex-col gap-2 mt-4 ml-8 ">
                                <h1 className='!text-5xl !font-black'>{me.fullname}</h1>
                                <p className='!text-md !font-normal !text-muted'>@{me.username}</p>
                                <p className='!text-xl !font-black !text-muted -mt-1'><SlotCounter value={Number(me.posts.length)} /> Post</p>
                                <p className='!text-md !font-normal !text-muted'>Hello, I am using InkSpace!</p>
                                <span className="text-sm text-gray-500">Joined {months[joinDate.getMonth()] + ", " +joinDate.getFullYear()}</span>
                            </div>
                        </>
                    )
                }
            </div>

            <div id='posts' className="w-full flex flex-col gap-6 mt-8 p-8">
                <h1 className='border-b border-gray-300'>Your Posts</h1>

                <MyPost  />
            </div>
        </div>
    )
}

export default Profile