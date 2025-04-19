import React, { useEffect, useState } from 'react'
import PostCardFull from '../components/PostCardFull'
import axios from 'axios';
axios.defaults.withCredentials = true;
import { ToastContainer, toast } from "react-toastify";
import Loading from '../components/Loading';
function MyPost() {
    const [me, setMe] = useState(null);
    const [posts, setPosts] = useState([]);
    const [deleteId, setDeleteId] = useState(null);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const getData = async () => {
            setLoading(true);
            const storedLogin = localStorage.getItem("isLogin");
            if (!storedLogin) {
                alert("Please, sign in");
                window.location.href = "/login";
            }
            try {
                const res = await axios.get(`${import.meta.env.VITE_SERVER_API_URL}/auth/me`);
                setMe(res.data.user);
                setPosts(res.data.user.posts);
                setLoading(false);
            } catch (error) {
                toast.error("Error fetching posts", error.message, {
                    position: "bottom-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                });
                setLoading(true);
            }
        };

        getData();
    }
        , []);

    useEffect(() => {
        const updatedPosts = posts.filter((post) => post._id !== deleteId);
        setPosts(updatedPosts);
        if (deleteId) {
            toast.success("Post Deleted", {
                position: "bottom-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
            });
            setDeleteId(null);
        }

    }, [deleteId]);

    return (
        <div className='w-full flex flex-col gap-6 mt-8 p-8 bg-background dark:bg-d-bg'>
            {
                loading ? <Loading /> : posts.length !== 0 ? posts.reverse().map((post) => (
                    <PostCardFull key={post._id} me={me} isProfile={true} post={post} setDeleteId={setDeleteId} />
                )) : (
                    <div className='w-full flex flex-col justify-center items-center gap-4 mt-4 overflow-x-hidden'>
                        <h1 className='text-muted text-2xl'>No posts found</h1>
                        <p className='text-muted text-md'>Be the first to post something!</p>
                    </div>
                )
            }

            <ToastContainer />
        </div>
    )
}

export default MyPost