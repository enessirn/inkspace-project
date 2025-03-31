import React from "react";

function PostCard() {
  return (
    <div className="w-[90%] xl:w-1/2 h-40 border-b border-gray-300">
      <div>
        <div className="auth mb-4 flex flex-row items-center gap-2">
          <img
            className="w-6 h-6 rounded-full hover:shadow-sm"
            src="https://picsum.photos/200/300?random=204650"
            alt="Profile Picture"
          />
          <span className="text-sm font-semibold">Enes Şirin</span>
        </div>
        <h1 className="header truncate w-full text-xl lg:text-2xl font-bold !font-display">
          Top 30 React Interview Questions for Freshers
        </h1>

        <span className="title block truncate max-w-full mt-2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores animi
          magnam ratione quae quis eaque, placeat officiis est, quasi qui atque
          voluptatibus corporis hic nam, natus modi enim ipsa consequuntur ab
          asperiores? Illum qui dolorem saepe repellendus maxime vel natus.Lorem
          ipsum dolor sit amet consectetur adipisicing elit. Dolores animi
          magnam ratione quae quis eaque, placeat officiis est, quasi qui atque
          voluptatibus corporis hic nam, natus modi enim ipsa consequuntur ab
          asperiores? Illum qui dolorem saepe repellendus maxime vel natus.Lorem
          ipsum dolor sit amet consectetur adipisicing elit. Dolores animi
          magnam ratione quae quis eaque, placeat officiis est, quasi qui atque
          voluptatibus corporis hic nam, natus modi enim ipsa consequuntur ab
          asperiores? Illum qui dolorem saepe repellendus maxime vel natus.Lorem
          ipsum dolor sit amet consectetur adipisicing elit. Dolores animi
          magnam ratione quae quis eaque, placeat officiis est, quasi qui atque
          voluptatibus corporis hic nam, natus modi enim ipsa consequuntur ab
          asperiores? Illum qui dolorem saepe repellendus maxime vel natus.
        </span>

        <div className="sub-info mt-4 flex flex-row justify-between items-center w-full">
          <div className="flex flex-row gap-4 items-center">
            <span className="text-sm text-secondary">6d ago</span>
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
    </div>
  );
}

export default PostCard;
