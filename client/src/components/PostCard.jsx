import React from "react";

function PostCard({ post }) {
  const date = new Date(post.createdAt);
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = date.toLocaleDateString("en-US", options);
  return (
    <div className="cursor-pointer transition-all ease-in-out bg-background shadow-sm shadow-primary/45 hover:shadow-md hover:bg-primary/1 w-[90%] p-2 rounded-2xl xl:w-1/2 h-full border-b border-gray-300">
      <div>
        <div className="auth mb-4 flex flex-row items-center gap-2">
          <img
            className="w-6 h-6 rounded-full hover:shadow-sm"
            src={post.author.profilePicture}
            alt={post.author.fullname}
          />
          <span className="text-sm font-semibold">{post.author.fullname}</span>
          <span className="text-muted text-xs">|</span>
          <span className="text-muted text-xs ml-1">{formattedDate}</span>
        </div>
        <h1 className="header truncate w-full text-xl lg:text-2xl font-bold !font-display">
          {post.title}
        </h1>

        <div className="title max-w-full mt-2 py-2 line-clamp-2" dangerouslySetInnerHTML={{ __html: post.content }}></div>
        <span className=" text-blue-500 hover:text-blue-900 hover:underline ">Go to this post</span>

      </div>
    </div>

  );
}

export default PostCard;
