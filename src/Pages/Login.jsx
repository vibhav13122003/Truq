import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";


const EyeIcon = () => <HiOutlineEye className='h-5 w-5' />;


const EyeOffIcon = () => <HiOutlineEyeOff className='h-5 w-5' />;


const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      const res = await fetch(
        "https://truq-backend-vfnps.ondigitalocean.app/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }
      if (data.token) {
        localStorage.setItem("token", data.token);
      }
     if (data.token) {
  localStorage.setItem("token", data.token);
}
if (data.userId) {
  localStorage.setItem("userId", data.userId);
}
if (data.name) {
  localStorage.setItem("name", data.name);
}
if (data.email) {
  localStorage.setItem("email", data.email);
}
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='bg-gray-100 flex items-center justify-center min-h-screen font-sans'>
      <div className='w-full max-w-md mx-auto p-4'>
        <div className='text-center mb-8'>
          <h1 className='text-3xl font-bold text-teal-700'>truq</h1>
          <h2 className='text-2xl font-semibold text-gray-800 mt-2'>
            Admin Login
          </h2>
        </div>

        <div className='bg-white rounded-lg shadow-lg p-8'>
          <form onSubmit={handleSubmit}>
            {error && (
              <div
                className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative mb-4'
                role='alert'
              >
                <span className='block sm:inline'>{error}</span>
              </div>
            )}
            <div className='mb-6'>
              <label
                htmlFor='email'
                className='block text-sm font-medium text-gray-700 mb-2'
              >
                Email Address
              </label>
              <input
                type='email'
                id='email'
                name='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='Enter your email address'
                className='w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-700 focus:border-transparent transition'
                required
              />
            </div>

            <div className='mb-6'>
              <label
                htmlFor='password'
                className='block text-sm font-medium text-gray-700 mb-2'
              >
                Password
              </label>
              <div className='relative'>
                <input
                  type={showPassword ? "text" : "password"}
                  id='password'
                  name='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder='Enter your password'
                  className='w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-700 focus:border-transparent transition'
                  required
                />
                <button
                  type='button'
                  onClick={togglePasswordVisibility}
                  className='absolute inset-y-0 right-0 px-4 flex items-center text-gray-500'
                >
                  {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>
            </div>

            <div className='text-right mb-6'>
              <a href='#' className='text-sm text-teal-700 hover:underline'>
                Forgot Password?
              </a>
            </div>

            <button
              type='submit'
              disabled={loading}
              className='w-full bg-gradient-to-b from-[#008080] to-[#004040] text-white font-bold py-3 px-4 rounded-lg hover:bg-teal-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-700 transition duration-300 disabled:bg-teal-400 disabled:cursor-not-allowed'
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>

        <div className='text-center mt-6'>
          <p className='text-xs text-gray-500'>
            Access restricted to authorized administrators.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
