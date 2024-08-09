import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    email: '',
    password: ''
  });
  const [isHRSelected, setIsHRSelected] = useState(false);
  const [isEmployeeSelected, setIsEmployeeSelected] = useState(false);

  const handleHRClick = () => {
    setIsHRSelected(true);
    setIsEmployeeSelected(false);
  };

  const handleEmployeeClick = () => {
    setIsHRSelected(false);
    setIsEmployeeSelected(true);
  };

  const handleLogin = async () => {
    const data = {
      email: inputs.email,
      password: inputs.password,
      ip: "string123"
    };

    const response = await axios.post('http://157.245.109.206:8091/identity-handler/auth/login-employee', data);
    if (response.status === 200) {
      localStorage.setItem('email', inputs.email);
      localStorage.setItem('password', inputs.password);
      navigate('/otp');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <section className="login text-gray-600 body-font w-full">
        <div className="container mx-auto px-5 py-16 lg:py-36 flex flex-wrap items-center justify-center">
          <div className="lg:w-3/5 md:w-1/2 w-full text-center md:text-left mb-10 md:mb-0">
            <h1 className="title-font font-bold text-4xl sm:text-5xl lg:text-7xl text-blue-900">
              Venture Consultancy Services
            </h1>
            <p className="leading-relaxed mt-4 lg:text-2xl text-xl text-black lg:max-w-xl mx-auto md:mx-0">
              VCS share the portal for HR Management.
            </p>
          </div>
          <div className="lg:w-2/6 md:w-1/2 w-full bg-white shadow-lg rounded-lg p-8 flex flex-col">
            <div className="flex flex-col md:flex-row justify-center gap-4 mb-4">
              <button
                className={`bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-300 ${isHRSelected ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={handleHRClick}
                disabled={isHRSelected}
              >
                H.R
              </button>
              <button
                className={`bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-300 ${isEmployeeSelected ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={handleEmployeeClick}
                disabled={isEmployeeSelected}
              >
                Employee
              </button>
            </div>
            <div className="relative mb-4 mt-4">
              <input
                type="text"
                name="email"
                placeholder="Email address or phone number"
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-lg outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
                value={inputs.email}
              />
            </div>
            <div className="relative mb-4">
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none text-lg text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
                value={inputs.password}
              />
            </div>
            <button
              className="text-white border-0 py-2 px-8 focus:outline-none font-medium rounded text-xl bg-blue-900"
              onClick={handleLogin}
            >
              Log In
            </button>
            <p className="text-sm text-blue-500 py-5 text-center">Forgotten password?</p>
            <hr className="my-5" />
            <button className="text-white border-0 py-2 px-8 focus:outline-none font-medium rounded text-xl bg-green-500">
              Create New Account
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LoginPage;
