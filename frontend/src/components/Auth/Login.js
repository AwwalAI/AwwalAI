import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';  // Import useNavigate
import { login } from '../../services/api';


import Bg from '../../media/bg/Frame Login Bg.png';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();  // Initialize useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(username, password);

      // Assuming the response contains the token in `response.data.token`
      const { token } = response.data;

      // Store the token in session storage
      sessionStorage.setItem('authToken', token);

      console.log('Login successful:', response.data);

      // Redirect the user to the dashboard
      navigate('/dashboard');
      
    } catch (error) {
      alert("Login failed. Please check your credentials.");
      console.error("Login error:", error);
    }
  };

  return (
    
    <div className="flex min-h-screen justify-center items-center bg-white z-10">
    <div className="w-1/2 max-w-xl max-md:w-4/5">
    
      <div>
        <h1 className="text-3xl font-bold mb-6 font-gothic">Login</h1>
        <p className="text-lg mb-8">
          Generate flashcards and multiple choice questions in seconds with
          any content link or file.
        </p>
      </div>
      <form className="bg-white " onSubmit={handleSubmit}>
        <label className="my-8">Username</label>
        <input
          type="text"
          value={username}
          className="mb-4 px-4 py-4 w-full border bg-gray-100 border-black "
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <label className="my-4">Password</label>
        <input
          type="password"
          className="mb-4 px-4 py-4 w-full border bg-gray-100 border-black"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full my-4 py-6 bg-black text-white text-xl font-bold"
        >
          Log In
        </button>
      </form>
      <a href="/signup" className="mt-4 inline-block text-black  border-white border-b-2 hover:border-black">
        Forgot password?
      </a>

      <div className="text-center ">OR</div>

      <Link to="/signup" className="text-black ">
            <div className="text-center my-4 py-6 text-xl font-bold border-white border-2 hover:border-black ">Signup </div>
      </Link>
      <div className=" flex justify-center">
          <div className="absolute ">
          <img src={Bg} alt='Background'/>
          </div>
      </div>
    </div>
   </div> 
 
    
  );
};

export default Login;
