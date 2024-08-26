import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signup, checkUsernameAvailability } from '../../services/api';
import TestimonialCard from '../Cards/TestimonialCards';
import Logo from '../../media/logo/Frame 4309.png';
import './SignUp.css';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isUsernameAvailable, setIsUsernameAvailable] = useState(true);
  const [isFormValid, setIsFormValid] = useState(false);
  const [touchedFields, setTouchedFields] = useState({
    username: false,
    email: false,
    password: false,
    confirmPassword: false,
    firstName: false,
    lastName: false,
  });
  const navigate = useNavigate();

  // Email validation
  const isEmailValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Password validation
  const isPasswordValid = (password) => {
    return password.length >= 8; // Add more criteria if needed
  };

  // Check if username exists
  useEffect(() => {
    const checkUsername = async () => {
      if (username) {
        const response = await checkUsernameAvailability(username);
        setIsUsernameAvailable(response.data.available);
      }
    };
    checkUsername();
  }, [username]);

  // Validate the entire form
  useEffect(() => {
    const isFormComplete = username && email && firstName && lastName && password && confirmPassword;
    const isFormCorrect = isFormComplete && isEmailValid(email) && isPasswordValid(password) && (password === confirmPassword) && isUsernameAvailable;
    setIsFormValid(isFormCorrect);
  }, [username, email, password, confirmPassword, firstName, lastName, isUsernameAvailable]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'username':
        setUsername(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'password':
        setPassword(value);
        break;
      case 'confirmPassword':
        setConfirmPassword(value);
        break;
      case 'firstName':
        setFirstName(value);
        break;
      case 'lastName':
        setLastName(value);
        break;
      default:
        break;
    }
    // Mark the field as touched
    setTouchedFields((prevState) => ({
      ...prevState,
      [name]: true,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFormValid) {
      alert("Please fill in all fields correctly.");
      return;
    }

    try {
      await signup({
        username,
        password,
        confirm_password: confirmPassword,
        first_name: firstName,
        last_name: lastName
      });
      alert('Signup successful: ' + username);

      navigate('/login');
    } catch (error) {
      alert("Signup failed. Please try again.");
    }
  };

  const testimonials = [
    {
      content: "Using Avval, I managed to cut my study time in half and improve my grades significantly!",
      name: "Aman, University Student",
      description: "Descriptions",
    },
  ];

  return (
    <div className="flex flex-col-reverse lg:flex-row min-h-screen">
      {/* Left Side: Features and Testimonial */}
      <div className="bg-[#712EFF] text-white lg:w-2/5 flex flex-col items-center p-10">
        <div className="w-full lg:w-4/5 py-12">
          <div className="SignUp-card flex mb-8">
            <h1 className="font-gothic">1.&nbsp; &nbsp;</h1>
            <div>
              <h1 className="font-gothic">Interactive Learning</h1>
              <p className="mb-4">Instantly turn your study materials into engaging quizzes.</p>
            </div>
          </div>

          <div className="SignUp-card flex mb-8">
            <h1 className="font-gothic">2. &nbsp; &nbsp;</h1>
            <div>
              <h1 className="font-gothic">Personalized Progress Tracking</h1>
              <p className="mb-4">Monitor your performance and improve with each quiz.</p>
            </div>
          </div>

          <div className="SignUp-card flex">
            <h1 className="font-gothic">3. &nbsp; &nbsp;</h1>
            <div>
              <h1 className="font-gothic">Effortless Exam Prep</h1>
              <p>Save time and enhance your study efficiency.</p>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-4/5 text-black text-lg mt-4">
          <TestimonialCard
            content={testimonials[0].content}
            name={testimonials[0].name}
            description={testimonials[0].description}
          />
        </div>
      </div>

      {/* Right Side: Signup Form */}
      <div className="w-full lg:w-3/5 flex flex-col justify-center items-center bg-white">
        <div className="relative w-full max-w-lg px-4 py-6">
          <img src={Logo} alt="Logo" className="absolute top-4 left-1/2 transform -translate-x-1/2" />
          <h1 className="text-3xl font-gothic mt-20 mb-4">Create your Avval account</h1>
          <p>Join Avval and start transforming your study materials into interactive quizzes for effortless learning and academic success.</p>
          <form className="bg-white" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block my-2">First Name</label>
              <input
                type="text"
                name="firstName"
                className="mb-4 px-4 py-4 w-full border bg-gray-100 border-black"
                value={firstName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block my-2">Last Name</label>
              <input
                type="text"
                name="lastName"
                className="mb-4 px-4 py-4 w-full border bg-gray-100 border-black"
                value={lastName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block my-2">Username</label>
              <input
                type="text"
                name="username"
                className={`mb-4 px-4 py-4 w-full border bg-gray-100 ${!isUsernameAvailable && touchedFields.username ? 'border-red-500' : 'border-black'}`}
                value={username}
                onChange={handleInputChange}
                required
              />
              {!isUsernameAvailable && touchedFields.username && <p className="text-red-500 text-sm -mt-2">Username is already taken</p>}
            </div>
            <div className="mb-4">
              <label className="block my-2">Email</label>
              <input
                type="email"
                name="email"
                className={`mb-4 px-4 py-4 w-full border bg-gray-100 ${!isEmailValid(email) && touchedFields.email ? 'border-red-500' : 'border-black'}`}
                value={email}
                onChange={handleInputChange}
                required
              />
              {!isEmailValid(email) && touchedFields.email && <p className="text-red-500 text-sm mt-1">Invalid email address</p>}
            </div>
            <div className="mb-4">
              <label className="block my-2">Password</label>
              <input
                type="password"
                name="password"
                className={`mb-4 px-4 py-4 w-full border bg-gray-100 ${!isPasswordValid(password) && touchedFields.password ? 'border-red-500' : 'border-black'}`}
                value={password}
                onChange={handleInputChange}
                required
              />
              {!isPasswordValid(password) && touchedFields.password && <p className="text-red-500 text-sm mt-1">Password must be at least 8 characters</p>}
            </div>
            <div className="mb-6">
              <label className="block my-2">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                className={`mb-4 px-4 py-4 w-full border bg-gray-100 ${password !== confirmPassword && touchedFields.confirmPassword ? 'border-red-500' : 'border-black'}`}
                value={confirmPassword}
                onChange={handleInputChange}
                required
              />
              {password !== confirmPassword && touchedFields.confirmPassword && <p className="text-red-500 text-sm mt-1">Passwords do not match</p>}
            </div>
            <button
              type="submit"
              className={`w-full my-4 py-5 bg-black text-white text-xl ${!isFormValid ? 'cursor-not-allowed' : ''}`}
              disabled={!isFormValid}
            >
              Sign Up
            </button>
          </form>
          <a
            href="/login"
            className="mt-4 inline-block text-black underline underline-offset-2"
          >
            Forgot password?
          </a>
          <div className="text-center mt-4">OR</div>
          <Link to="/login" className="text-black">
            <div className="text-center my-4 py-5 text-xl font-bold border-white border-2 hover:border-black">Log In</div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
