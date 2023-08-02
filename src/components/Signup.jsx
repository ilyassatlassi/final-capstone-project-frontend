import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../redux/slices/user';
import 'bulma/css/bulma.min.css';

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signedIn = useSelector((state) => state.user.signedIn);
  const error = useSelector((state) => state.user.loginError);

  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [inputState, setInputState] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleInputChange = (e) => {
    setInputState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    dispatch(register({
      name: inputState.name,
      nickname: null,
      email: inputState.email,
      password: inputState.password,
      role: 'user',
      image: null,
    }));
  };

  useEffect(() => {
    if (signedIn) {
      setLoading(false);
      navigate('/');
    }
  }, [signedIn, navigate]);

  useEffect(() => {
    if (error) {
      setErrorMessage(error.full_messages[0]);
      setLoading(false);
    }
  }, [error]);

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
              required
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
              required
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
              required
            />
          </div>
          {errorMessage && (
          <p className="bg-red-600 font-bold mb-6 p-2 rounded shadow-lg">
            {errorMessage}
          </p>
          )}
          <div className="w-full md:w-2/5 lg:w-1/5">
            <button
              type="submit"
              className={`button is-primary ${loading && 'is-loading'}`}
              disabled={loading}
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
