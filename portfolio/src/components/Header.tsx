import { Link } from "react-router-dom";
import logoImage from "../assets/image.png";
import React from "react";


function Header() {
  return (
    <>
      {/* Desktop Header */}
      <header className="fixed top-0 left-0 right-0 z-30 bg-white shadow-sm">
        <div className="container mx-auto px-4 h-20 flex items-center">
          {/* Logo */}
          <div className="w-[15%] min-w-[140px]">
            <img
              src={logoImage}
              alt="Your Company Logo"
              className="h-20 w-auto object-contain"
            />
          </div>

          {/* Menu */}
          <div className="flex-1 flex justify-center">
            <ul className="flex gap-10 text-black font-medium">
              
                <li
                
                  className="cursor-pointer hover:text-blue-600 transition-colors"
                >
              <Link to="/">Home</Link>
                </li>
             <li
                
                  className="cursor-pointer hover:text-blue-600 transition-colors"
                >
              <Link to="/About">About</Link>
                </li>
             <li
                
                  className="cursor-pointer hover:text-blue-600 transition-colors"
                >
              <Link to="/Contact">Contact</Link>
                </li>
            
            
            </ul>
          </div>

          {/* Info */}
          <div className="w-[15%] min-w-[140px] text-right">
            {/* <div className="inline-block bg-red-400 text-white px-6 py-2 rounded-md">
              Info
            </div> */}
          </div>
        </div>
      </header>

   

      <div className="h-20 md:h-20" />
    </>
  );
}

export default Header;