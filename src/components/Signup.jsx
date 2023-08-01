import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { register } from '../redux/slices/user';

const Signup = () => {
  const user = useSelector((state) => state.user.signedIn);
  const dispatch = useDispatch();
  const [inputState, setInputState] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setInputState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const isAnyFieldEmpty = Object.values(inputState).some(
      (value) => value === '',
    );
    if (isAnyFieldEmpty) {
      setErrorMessage('Please fill out all fields');
      setTimeout(() => {
        setErrorMessage('');
      }, 3000);
      return;
    }
    dispatch(register({
      name: inputState.name,
      nickname: null,
      email: inputState.email,
      password: inputState.password,
      role: 'user',
      image: null,
    }));
    setInputState({});
    navigate('/');
  };

  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <div className="max-w-screen-xl mx-auto px-5 pt-20">
      <div className="flex items-center flex-col ">
        <h2 className="pb-5 font-bold text-xl">Register</h2>
        <form className="w-full flex flex-col items-center " onSubmit={onSubmit}>
          <div className="md:w-2/5 w-full mb-9">
            <p className="font-semibold text-lg">Name:</p>
            <input
              type="text"
              name="name"
              className="w-full py-2 pl-4 outline-none border border-lime-700 rounded-md hover:border-lime-500"
              placeholder="Enter your full name"
              onChange={handleInputChange}
              value={inputState.name}
            />
          </div>
          <div className="md:w-2/5 w-full mb-9">
            <p className="font-semibold text-lg">Email:</p>
            <input
              type="email"
              name="email"
              className="w-full py-2 pl-4 outline-none border border-lime-700 rounded-md hover:border-lime-500"
              placeholder="Enter your email"
              onChange={handleInputChange}
              value={inputState.email}
            />
          </div>
          <div className="md:w-2/5 w-full mb-9">
            <p className="font-semibold text-lg">Password:</p>
            <input
              type="password"
              name="password"
              className="w-full py-2 pl-4 outline-none border border-lime-700 rounded-md hover:border-lime-500"
              placeholder="Enter your password"
              onChange={handleInputChange}
              value={inputState.password}
            />
          </div>
          {errorMessage && (
          <p className="bg-red-600 font-bold mb-6 p-2 rounded shadow-lg">
            Please fill out all fields
          </p>
          )}
          <div className="w-full md:w-2/5 lg:w-1/5">
            <button
              type="submit"
              className="bg-[#97BF0E] py-2 px-5 rounded-md text-white w-full font-semibold text-lg"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
