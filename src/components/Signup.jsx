import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { register } from '../redux/slices/user';
import 'bulma/css/bulma.min.css';

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signedIn = useSelector((state) => state.user.signedIn);
  const error = useSelector((state) => state.user.loginError);

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
      toast.error(error.full_messages[0] || 'An error occured!', {
        position: toast.POSITION.BOTTOM_LEFT,
        toastId: 'reserve-error',
        transition: Slide,
      });
      setLoading(false);
    }
  }, [error]);

  return (
    <div className="flex flex-col">
      <ToastContainer />
      <header className="flex gap-3 p-5 items-center">
        <img className="w-[40px] h-[40px]" alt="" src="/images/logo.jpg" />
        <div>
          <h1 className="text-[#97BF0E] text-[25px]">DOC CARE</h1>
          <p className="m-0 ">Welcome to Doc Care! Please enter your details to register...</p>
        </div>
      </header>
      <div className="column is-half m-auto pt-6">
        <div>
          <h1 className="mb-5 text-[24px]">Enter your details to register</h1>
          <form onSubmit={onSubmit}>
            <div className="field">
              <p className="font-bold text-[#97BF0E] mb-1">Name:</p>
              <input
                type="text"
                name="name"
                className="input mb-2"
                placeholder="Enter your full name"
                onChange={handleInputChange}
                value={inputState.name}
                required
              />
            </div>
            <div className="field">
              <p className="font-bold text-[#97BF0E] mb-1">Email:</p>
              <input
                type="email"
                name="email"
                className="input mb-2"
                placeholder="Enter your email"
                onChange={handleInputChange}
                value={inputState.email}
                required
              />
            </div>
            <div className="field">
              <p className="font-bold text-[#97BF0E] mb-1">Password:</p>
              <input
                type="password"
                name="password"
                className="input mb-2"
                placeholder="Enter your password"
                onChange={handleInputChange}
                value={inputState.password}
                required
              />
            </div>
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
    </div>
  );
};

export default Signup;
