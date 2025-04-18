import { CommentOutlined, DeleteOutlined, LikeFilled, LikeOutlined, ShareAltOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import SlotCounter from 'react-slot-counter';
import axios from "axios";
axios.defaults.withCredentials = true;
function PostCardFull({ me, post, setDeleteId, isProfile, loading }) {
    const date = new Date(post.createdAt);
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = date.toLocaleDateString("en-US", options);
    const [liked, setLiked] = useState(false)
    const [likeCount, setLikeCount] = useState(post?.likesCount)
    const handleDelete = async () => {
        console.log("Post ID", post._id);
        try {
            fetch(`${import.meta.env.VITE_SERVER_API_URL}/posts/delete-post/${post._id}`, {
                method: 'DELETE',
                credentials: 'include',
            })
                .then(res => res.json())
                .then(res => console.log(res))
            setDeleteId(post._id);

        } catch (error) {
            console.error("Delete error:", error);
        }
    }

    // like/unlike the post func
    const likePost = async () => {
        try {
            await axios.put(`${import.meta.env.VITE_SERVER_API_URL}/posts/${post._id}/like`);
            setLiked((prevLiked) => {
                const newLiked = !prevLiked;
                setLikeCount((prevCount) => {
                    if (newLiked)
                        return prevCount + 1;


                    else {
                        return prevCount > 0 ? prevCount - 1 : 0
                    }
                })
                return newLiked
            })

        } catch (error) {
            console.log(error)
        }
    }
    // did I like this post? control
    useEffect(() => {
        console.log("me gelimoy la",me)
        console.error("loadin?????????????????????",loading)
        if (!loading) {
            const iLiked = post.likes.some(id => id === me._id)
            console.log("POST ID: " + post._id + " VAR MI " + iLiked)
            setLiked(iLiked);
            console.log("begendim  mi? ", iLiked)
        }

    }, [])
    return (
        <div className="dark dark:bg-d-background cursor-pointer mx-auto transition-all ease-in-out bg-background shadow-sm shadow-primary/45 hover:shadow-md hover:bg-primary/1 w-[90%] p-2 rounded-2xl xl:w-1/2 h-full border-b border-gray-300" style={{ wordWrap: 'break-word' }}>

            <div className="px-2 py-4">
                <div className="auth mb-4 flex justify-between flex-row items-center">
                    <div className="flex flex-row items-center gap-2">
                        <img
                            className="w-6 h-6 rounded-full hover:shadow-sm"
                            src={isProfile ? me.profilePicture : post.author.profilePicture}
                            alt={`Profile Picture ${isProfile ? me.fullname : post.author.fullname}`}
                        />
                        <span className="text-sm font-semibold">{isProfile ? me.username : post.author.username}</span>
                        <span className="text-muted text-xs">|</span>
                        <span className="text-muted text-xs ml-1">{formattedDate}</span>
                    </div>
                    {
                        isProfile ? (
                            <div>
                                <button className='p-2 bg-red-300 text-red-600 font-black rounded cursor-pointer hover:bg-red-600 hover:text-white text-xl hover:shadow-sm hover:shadow-red-600 hover:transition-all ease-in-out hover:duration-300 duration-300' onClick={handleDelete}><DeleteOutlined /></button>
                            </div>
                        ) : null
                    }

                </div>
                <h1 className="header w-full text-xl lg:text-2xl font-bold !font-display">
                    {post.title}
                </h1>
                <div className="title mt-2 p-2 w-full" dangerouslySetInnerHTML={{ __html: post.content }} >
                </div>

                <div id="actions" className="flex justify-between items-center mt-4">
                    <div className="flex flex-row gap-4 items-center text-xl font-bold">
                        <div className="cursor-pointer" onClick={likePost}> {liked ? <LikeFilled style={{ color: `${liked ? 'blue' : 'black'}`, transition: '0.5s all ease-in-out', fontSize: "24px" }} /> : <LikeOutlined style={{ fontSize: "24px", transition: '0.5s all ease-in-out' }} />}
                            <SlotCounter value={likeCount} />
                        </div>
                        <div className="cursor-pointer"><CommentOutlined /> 0</div>
                    </div>

                    <button className="mr-4 cursor-pointer text-xl font-bold"><ShareAltOutlined /> Share</button>
                </div>

            </div>
        </div>
    );
}

export default PostCardFull;