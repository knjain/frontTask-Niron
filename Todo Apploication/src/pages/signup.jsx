import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../redux/slices/userSlice";
import { Navigate, Link } from "react-router-dom";

const SignupPage = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
  });
  
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = () => {
    if (!form.firstName || !form.email || !form.password) {
      alert("Please fill in all required fields.");
      return;
    }
    dispatch(signup(form));
  };

  if (user) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        <input name="firstName" placeholder="First Name" className="w-full p-2 mb-3 border rounded" onChange={handleChange} />
        <input name="lastName" placeholder="Last Name" className="w-full p-2 mb-3 border rounded" onChange={handleChange} />
        <input name="email" placeholder="Email" className="w-full p-2 mb-3 border rounded" onChange={handleChange} />
        <input name="phoneNumber" placeholder="Phone Number" className="w-full p-2 mb-3 border rounded" onChange={handleChange} />
        <input name="password" type="password" placeholder="Password" className="w-full p-2 mb-3 border rounded" onChange={handleChange} />
        <button className="w-full bg-green-500 text-white p-2 rounded" onClick={handleSignup}>
          Sign Up
        </button>
        <p className="mt-4 text-center">
          Already have an account? <Link to="/login" className="text-blue-500">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
