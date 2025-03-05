import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/slices/userSlice";
import { Navigate, Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    dispatch(login({ email, password })).then((result) => {
      if (result.payload) {
        navigate("/dashboard"); // Redirect after successful login
      } else {
        setError("Invalid credentials. Please try again.");
        setEmail("");
        setPassword("");
      }
    });
  };

  return user ? (
    <Navigate to="/dashboard" />
  ) : (
    <div className="flex justify-center items-center h-screen min-h-screen bg-gradient-to-bl from-orange-500 via-yellow-300 to-yellow-100">
      <div className="w-96 text-center">
        <h1 className="text-3xl font-bold text-orange-600">
          To-Do Application
        </h1>
        <p className="text-gray-700 mb-6">
          Managing day-to-day tasks, simplified!
        </p>

        <h2 className="text-2xl font-bold mb-4">Login</h2>

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          className="w-full px-2 py-1 mb-5 border-b"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError(""); // Clear error message when typing
          }}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full px-2 py-1 mb-5 border-b"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setError(""); // Clear error message when typing
          }}
        />

        <button
          className="w-full bg-orange-500 hover:bg-orange-600 text-white p-2 rounded"
          onClick={handleLogin}
        >
          Login
        </button>

        <p className="mt-4">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-orange-500 hover:text-orange-600 underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
