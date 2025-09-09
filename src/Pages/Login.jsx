import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// --- SVG icon components ---
const EyeIcon = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    className='h-5 w-5'
    viewBox='0 0 20 20'
    fill='currentColor'
  >
    <path d='M10 12a2 2 0 100-4 2 2 0 000 4z' />
    <path
      fillRule='evenodd'
      d='M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.022 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z'
      clipRule='evenodd'
    />
  </svg>
);

const EyeOffIcon = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    className='h-5 w-5'
    viewBox='0 0 20 20'
    fill='currentColor'
  >
    <path
      fillRule='evenodd'
      d='M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074L3.707 2.293zM10 12a2 2 0 110-4 2 2 0 010 4z'
      clipRule='evenodd'
    />
    <path d='M10 17a7 7 0 01-7-7c0-1.933 1.04-3.682 2.634-4.832l1.473 1.473A4.982 4.982 0 008 10a5 5 0 005 5 4.982 4.982 0 002.695-.839l1.473 1.473A6.983 6.983 0 0110 17z' />
  </svg>
);

// --- Login Page Component ---
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
      const res = await fetch("https://truq-nzas.vercel.app/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }
      if (data.token) {
        localStorage.setItem("token", data.token);
      }
      // Redirect to dashboard if successful
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
              className='w-full bg-teal-700 text-white font-bold py-3 px-4 rounded-lg hover:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-700 transition duration-300 disabled:bg-teal-400 disabled:cursor-not-allowed'
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
