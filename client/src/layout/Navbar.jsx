import React from "react";
import { Link } from "react-router-dom";
function Navbar() {
  return (
    <div className="w-full bg-background text-primary p-5 shadow-md shadow-primary/10 flex justify-between items-center">
      <Link className="logo" to="/">
        <h1 className="text-2xl md:text-4xl font-black !font-display select-none">
          InkSpace
        </h1>
      </Link>

      <div className="flex gap-4 items-center">
        <span className="write-story text-secondary hover:text-primary">
          <i className="fa-solid fa-pen-to-square text-secondary"></i> Write
        </span>
        <span className="text-secondary hover:text-primary">My Stories</span>
        <div className="profile-pic flex items-center justify-center">
          <img className="w-8 h-8 rounded-full hover:shadow-sm" src="https://picsum.photos/200/300?random=1" alt="Profile Picture" />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
