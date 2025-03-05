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
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Validates email format

    if (
      !form.firstName ||
      !form.email ||
      !form.password ||
      !form.confirmPassword
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    if (!emailRegex.test(form.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (form.password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setError("");
    dispatch(signup(form));
  };

  if (user) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="flex justify-center items-center h-screen min-h-screen bg-gradient-to-bl from-orange-500 via-yellow-300 to-yellow-100">
      <div className="w-96 text-center">
        <h1 className="text-3xl font-bold text-orange-600">
          To-Do Application
        </h1>
        <p className="text-gray-700 mb-6">
          Stay organized and manage tasks effortlessly!
        </p>

        <h2 className="text-2xl font-bold mb-6">Sign Up</h2>

        {error && (
          <p className="text-red-500 text-sm text-center mb-3">{error}</p>
        )}

        <input
          name="firstName"
          placeholder="First Name*"
          className="w-full px-2 py-1 mb-5 border-b"
          onChange={handleChange}
        />
        <input
          name="lastName"
          placeholder="Last Name"
          className="w-full px-2 py-1 mb-5 border-b"
          onChange={handleChange}
        />
        <input
          name="email"
          placeholder="Email*"
          className="w-full px-2 py-1 mb-5 border-b"
          onChange={handleChange}
        />
        <input
          name="phoneNumber"
          placeholder="Phone Number"
          className="w-full px-2 py-1 mb-5 border-b"
          onChange={handleChange}
        />
        <input
          name="password"
          type="password"
          placeholder="Password*"
          className="w-full px-2 py-1 mb-5 border-b"
          onChange={handleChange}
        />
        <input
          name="confirmPassword"
          type="password"
          placeholder="Confirm Password*"
          className="w-full px-2 py-1 mb-5 border-b"
          onChange={handleChange}
        />

        <button
          className="w-full bg-orange-500 text-white p-2 rounded hover:bg-orange-600 transition"
          onClick={handleSignup}
        >
          Sign Up
        </button>

        <p className="mt-4">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-orange-500 underline hover:text-orange-600"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
