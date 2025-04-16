import React, { useState } from "react";

function PostCard({ post }) {
  const date = new Date(post.createdAt);
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = date.toLocaleDateString("en-US", options);
  const getPlainText = () => {
    const doc = new DOMParser().parseFromString(post?.content, "text/html");
    const isLong = doc.body.innerText.length > 50;
    return isLong;
  }
  const [showMore, setShowMore] = useState(false);
  return (
    <div className="cursor-pointer transition-all ease-in-out bg-background shadow-sm shadow-primary/45 hover:shadow-md hover:bg-primary/1 w-[90%] p-2 rounded-2xl xl:w-1/2 h-full border-b border-gray-300" style={{ wordWrap: 'break-word' }} onClick={() => setShowMore(!showMore)}>
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
        <h1 className="header w-full text-xl lg:text-2xl font-bold !font-display">
          {post.title}
        </h1>

        <div className={`title max-w-full mt-2 px-2 py-2 transition-all duration-700 ${showMore ? '!h-full ' : 'line-clamp-2'} `} dangerouslySetInnerHTML={{ __html: post.content }}>
        </div>
        <span className={`text-muted text-sm flex gap-1 items-center py-2 ${getPlainText() ? 'block' : 'hidden'}`} ><i className={`fa-solid fa-chevron-${showMore ? 'up' : 'down'}`}></i> Show {showMore ? 'less' : 'more'}</span>

      </div>
    </div>

  );
}

export default PostCard;
