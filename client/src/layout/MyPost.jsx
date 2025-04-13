import React, { useContext, useEffect, useState } from 'react'
import PostCardFull from '../components/PostCardFull'
import GetMeContext from '../context/GetMeContext';
import { ToastContainer, toast } from "react-toastify";
function MyPost() {
    const { me } = useContext(GetMeContext);
    const [posts, setPosts] = useState([]);
    const [deleteId, setDeleteId] = useState(null);
    console.log("Me", me);

    useEffect(() => {
        if (me?.posts) {
            setPosts(me.posts);
        }
        console.log("Posts", posts);
    }, [me])

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
        <div className='w-full flex flex-col gap-6 mt-8 p-8'>
            {
                posts?.map((post) => (
                    <PostCardFull key={post._id} pfp={me.profilePicture} post={post} setDeleteId={setDeleteId} />
                ))
            }

            <ToastContainer />
        </div>
    )
}

export default MyPost