import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <div>
        <nav className="h-16 flex items-center justify-between bg-gray-800 px-5">
          <Link to="/"><div className="text-yellow-400 font-semibold">LabhRoot</div></Link>
          <div className="flex items-center justify-between gap-5">
            {/* <Link to="/" className="text-white">
              Home
            </Link> */}
            <Link to="/" className="text-white">
              Login
            </Link>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Header;
