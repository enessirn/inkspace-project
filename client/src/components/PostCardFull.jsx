import { CommentOutlined, DeleteOutlined, LikeFilled, LikeOutlined, ShareAltOutlined, SendOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import SlotCounter from 'react-slot-counter';
import axios from "axios";
axios.defaults.withCredentials = true;
import moment from "moment"
import Comment from './Comment';
function PostCardFull({ me, post, setDeleteId, isProfile, loading }) {
    const [liked, setLiked] = useState(false)
    const [likeCount, setLikeCount] = useState(post?.likesCount)
    const [hidden, setHidden] = useState(true);
    const [disabled, setDisabled] = useState(false);
    const [text, setText] = useState("")
    const [comments, setComments] = useState(post?.comments);
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
        if (!loading) {
            const iLiked = post.likes.some(id => id === me._id)
            setLiked(iLiked);
        }
    }, [])

    // add comment

    const addComment = async (e) => {
        try {
            e.preventDefault();
            setDisabled(true);
            console.log(post._id + "psot idsi");
            await axios.post(`${import.meta.env.VITE_SERVER_API_URL}/comments/add-comment/${post._id}`, {
                text
            });
            setComments([...comments, {
                createdAt: Date.now(),
                author: {
                    username: me?.username,
                    profilePicture: me?.profilePicture,
                },
                text,
            }])

        } catch (error) {
            console.error("Error", error.message)
        }
        finally {
            setDisabled(false);
            setText("");
        }
    }
    useEffect(() => {
        console.log("güncel yorumlar", comments)
    }, [disabled])
    return (
        <div className="border border-border cursor-pointer mx-auto transition-all ease-in-out bg-background shadow-sm shadow-primary/45 hover:shadow-md hover:bg-primary/1 w-[90%] p-2 rounded-2xl xl:w-1/2 h-full " style={{ wordWrap: 'break-word' }}>

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
                        <span className="text-muted text-xs ml-1">{moment(post.createdAt).fromNow()}</span>
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
                        <div className="cursor-pointer" onClick={() => {
                            setHidden((prev) => !prev)
                        }}><CommentOutlined /> <SlotCounter value={comments.length} /> </div>
                    </div>

                    <button className="mr-4 cursor-pointer text-xl font-bold"><ShareAltOutlined /> Share</button>
                </div>

            </div>

            <div className={`w-full ${hidden ? "h-0 hidden" : "h-full block"} rounded bg-background`}>
                <span className='block font-bold text-xl pl-4 border-b border-border w-full'>Comments</span>
                {/* cooments */}
                <div className='py-6 w-full flex flex-col gap-4 whitespace-normal break-words overflow-y-auto max-h-[500px]'>
                    {
                        comments?.map((item) => (
                            <Comment key={item._id} username={item.author?.username} pfp={item.author?.profilePicture} text={item.text} createdAt={item.createdAt} />
                        )
                        )
                    }



                </div>
                <div className='relative bottom-0 flex flex-row  gap-4 border-t-2 border-border w-full p-3'>
                    <div className='shrink-0 flex'>
                        <img
                            src={"https://fastly.picsum.photos/id/161/200/300.jpg?hmac=-nq4AHxOS9Wa6ljn39CmzpqO9vtccMNfDPUOsijD5Wk"}
                            alt="avatar"
                            className="w-9 h-9 rounded-full object-cover mt-4"
                        />
                    </div>
                    <form className='w-full flex-col flex items-end gap-2' type="submit" onSubmit={addComment}>
                        <input value={text} onChange={(e) => setText(e.target.value)} disabled={disabled} className={`${disabled ? "cursor-wait" : "cursor-text"} w-full rounded-sm border-b hover:border-primary focus:border-primary focus:border-2 border-border outline-0 px-4 py-4`} type="text" placeholder={`${disabled ? "Loading..." : "Type something..."} `} required />
                        <button disabled={disabled} type="submit" className={`bg-secondary py-2 px-4 text-border font-bold rounded hover:${disabled ? "" : "bg-border"} hover:${disabled ? "" : "text-primary"} transition-colors duration-500 ${disabled ? "cursor-wait" : "cursor-pointer"}`} ><SendOutlined /> Send </button>
                    </form>

                </div>
            </div>
        </div>
    );
}

export default PostCardFull;