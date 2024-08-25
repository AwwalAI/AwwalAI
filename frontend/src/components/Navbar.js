import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "../media/logo/Frame 4309.png";
import { logout as apiLogout } from './../services/api';

const Navbar = () => {
  const authToken = sessionStorage.getItem("authToken");
  const location = useLocation();
  const navigate = useNavigate();
  
  const handleLogout = () => {

    const LogOut = async () => {
      try {
        const response = await apiLogout();
        
        console.log(response);
        sessionStorage.removeItem("authToken"); // Remove the auth token from session storage
        alert("Logged Out Successfully.");
        navigate("/"); // Redirect to the login page
      } catch (error) {
        console.error("Error logging out:", error);
      }
    };

    LogOut();  // Call the LogOut function without passing navigate again
  };

  // Determine the background color based on the route
  const isLandingPage = location.pathname === "/";
  const navbarBg = isLandingPage ? "bg-[#D3D4FF]" : "bg-white";

  const isHomeSelected = location.pathname === "/";
  const isDashboardSelected = location.pathname === "/dashboard";

  return (
    <nav className={`p-4 ${navbarBg}`}>
      <div className="container mx-auto flex justify-between items-center">
        <div className="ml-8 md:ml-2">
          <Link to="/" className="">
            <img src={Logo} alt="" srcSet="" className="" />
          </Link>
        </div>
        <div className="flex items-center space-x-2">
          {authToken ? (
            <>
              <Link
                to="/"
                className={`py-2 px-2 ${
                  isHomeSelected ? "border-b-2 border-black" : ""
                }`}
              >
                Home
              </Link>
              <Link
                to="/dashboard"
                className={`py-2 px-4 ${
                  isDashboardSelected ? "border-b-2 border-black" : ""
                }`}
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="border-2 border-black text-black py-2 px-4 hover:bg-black hover:text-white"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-lg text-black px-2 font-semibold"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="text-lg text-black px-2 font-semibold"
              >
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;