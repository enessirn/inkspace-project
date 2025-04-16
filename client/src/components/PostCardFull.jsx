import { CommentOutlined, DeleteOutlined, LikeOutlined, ShareAltOutlined } from '@ant-design/icons';
import React from 'react'

function PostCardFull({ pfp, post, setDeleteId }) {
    const date = new Date(post.createdAt);
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = date.toLocaleDateString("en-US", options);

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

    return (
        <div className=" cursor-pointer mx-auto transition-all ease-in-out bg-background shadow-sm shadow-primary/45 hover:shadow-md hover:bg-primary/1 w-[90%] p-2 rounded-2xl xl:w-1/2 h-full border-b border-gray-300" style={{wordWrap: 'break-word'}}>

            <div className="px-2 py-4">
                <div className="auth mb-4 flex justify-between flex-row items-center">
                    <div className="flex flex-row items-center gap-2">
                        <img
                            className="w-6 h-6 rounded-full hover:shadow-sm"
                            src={pfp}
                            alt="Profile Picture"
                        />
                        <span className="text-sm font-semibold">Me</span>
                        <span className="text-muted text-xs">|</span>
                        <span className="text-muted text-xs ml-1">{formattedDate}</span>
                    </div>

                    <div>
                        <button className='p-2 bg-red-300 text-red-600 font-black rounded cursor-pointer hover:bg-red-600 hover:text-white text-xl hover:shadow-sm hover:shadow-red-600 hover:transition-all ease-in-out hover:duration-300 duration-300' onClick={handleDelete}><DeleteOutlined /></button>
                    </div>
                </div>
                <h1 className="header w-full text-xl lg:text-2xl font-bold !font-display">
                    {post.title}
                </h1>
                <div className="title mt-2 p-2 w-full" dangerouslySetInnerHTML={{ __html: post.content }} >
                </div>

                <div id="actions" className="flex justify-between items-center mt-4">
                    <div className="flex flex-row gap-4 items-center text-xl font-bold">
                        <div className="cursor-pointer"><LikeOutlined /> 0</div>
                        <div className="cursor-pointer"><CommentOutlined /> 0</div>
                    </div>

                    <button className="mr-4 cursor-pointer text-xl font-bold"><ShareAltOutlined /> Share</button>
                </div>

            </div>
        </div>
    );
}

export default PostCardFull;