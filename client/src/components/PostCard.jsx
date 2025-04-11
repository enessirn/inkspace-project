import React from "react";

function PostCard({ post }) {
  return (
    <div className="cursor-pointer bg-background hover:bg-primary/1 w-[90%] p-2 rounded-2xl xl:w-1/2 h-full border-b border-gray-300">
      <div>
        <div className="auth mb-4 flex flex-row items-center gap-2">
          <img
            className="w-6 h-6 rounded-full hover:shadow-sm"
            src={post.author.profilePicture}
            alt={post.author.fullname}
          />
          <span className="text-sm font-semibold">{post.author.fullname}</span>
        </div>
        <h1 className="header truncate w-full text-xl lg:text-2xl font-bold !font-display">
          {post.title}
        </h1>

        <div className="title block truncate max-w-full mt-2 max-h-40 py-2" dangerouslySetInnerHTML={{ __html: post.content }}></div>

      </div>

      <div className="sub-info mt-4 flex flex-row justify-between items-center w-full">
        <div className="flex flex-row gap-4 items-center">
          <span className="text-sm text-secondary">{post.createdAt}</span>
          <span className="likes flex flex-row gap-1 items-center">
            <i className="fa-solid fa-heart text-secondary"></i>
            <span className="text-sm text-secondary">6</span>
          </span>
          <span className="comments flex flex-row gap-1 items-center">
            <i className="fa-solid fa-comment text-sm text-secondary  hover:text-link"></i>
            <span className="text-sm text-secondary hover:text-link">1</span>
          </span>
        </div>
        <div>
          <span className="comments flex flex-row gap-1 items-center">
            <i className="fa-solid fa-arrow-up-from-bracket text-sm text-secondary"></i>
            <span className="text-sm text-secondary">Share</span>
          </span>
        </div>
      </div>
    </div>

  );
}

export default PostCard;
