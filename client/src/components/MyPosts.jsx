import React from "react";
import { Dropdown, Space } from 'antd';
import {
    DeleteOutlined,
    LikeOutlined,
    CommentOutlined,
    ShareAltOutlined
} from "@ant-design/icons";
function MyPosts({ profilePicture, post }) {
    console.log(post);
    const date = new Date(post.createdAt);
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = date.toLocaleDateString("en-US", options);
    const items = [
        {
            key: '1',
            label: 'Delete',
            icon: <DeleteOutlined />,
        }

    ];
    return (
        <div className=" cursor-pointer mx-auto transition-all ease-in-out bg-background shadow-sm shadow-primary/45 hover:shadow-md hover:bg-primary/1 w-[90%] p-2 rounded-2xl xl:w-1/2 h-full border-b border-gray-300">
            <div className="px-2 py-4">
                <div className="auth mb-4 flex justify-between flex-row items-center">
                    <div className="flex flex-row items-center gap-2">
                        <img
                            className="w-6 h-6 rounded-full hover:shadow-sm"
                            src={profilePicture}
                            alt="Profile Picture"
                        />
                        <span className="text-sm font-semibold">Me</span>
                        <span className="text-muted text-xs">|</span>
                        <span className="text-muted text-xs ml-1">{formattedDate}</span>
                    </div>

                    <div>
                        <Dropdown menu={{ items }}>
                            <span>
                                <Space className="text-2xl font-black">
                                    ...
                                </Space>
                            </span>
                        </Dropdown>
                    </div>
                </div>
                <h1 className="header w-full text-xl lg:text-2xl font-bold !font-display">
                    {post.title}
                </h1>
                <div className="title max-w-full mt-2 p-2 w-full" dangerouslySetInnerHTML={{ __html: post.content }}></div>

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

export default MyPosts;
