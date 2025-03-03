import { useDispatch } from "react-redux";
import { logout } from "../redux/slices/userSlice";
import { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";

const Navbar = () => {
  const dispatch = useDispatch();
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Get user first name from localStorage
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.firstName) {
      setUserName(user.firstName);
    }
  }, []);

  const handleLogout = () => {
    dispatch(logout()); // Call Redux logout action
    navigate("/login"); // Redirect to login page
    };

  return (
    <nav className="bg-orange-400 text-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          Welcome, {userName ? userName : "Guest"}!
        </h1>
        <button
          className="bg-white text-black px-8 py-2 rounded hover:bg-red-600 transition"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
