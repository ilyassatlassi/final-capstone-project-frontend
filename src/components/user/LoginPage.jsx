import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../redux/slices/user/index';
import 'bulma/css/bulma.min.css';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const signedIn = useSelector((state) => state.user.signedIn);
  const errorMessage = useSelector((state) => state.user.loginError);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    dispatch(login({ email, password }));
  };

  useEffect(() => {
    if (signedIn) {
      setIsLoading(false);
      navigate('/');
    }
  }, [signedIn, navigate]);

  useEffect(() => {
    if (errorMessage) {
      setError(errorMessage);
      setIsLoading(false);
    }
  }, [errorMessage]);

  return (
    <>
      <div className="flex flex-col">
        <header className="flex gap-3 p-5 items-center">
          <img className="w-[40px] h-[40px]" alt="" src="/images/logo.jpg" />
          <div>
            <h1 className="text-[#97BF0E] text-[25px]">DOC CARE</h1>
            <p className="m-0 ">Welcome to Doc Care! Please login to proceed...</p>
          </div>
        </header>
        <div className="column is-half m-auto pt-6">
          <div>
            <h1 className="mb-5 text-[24px]">Enter your details to login</h1>
            {error && <p className="has-text-danger has-text-centered mb-4">{error}</p>}
            <form onSubmit={handleLogin}>
              <div className="field">
                <p className="font-bold text-[#97BF0E] mb-1">Email</p>
                <div className="control">
                  <input
                    className="input mb-2"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="field">
                <p className="font-bold text-[#97BF0E] mb-1">Password</p>
                <div className="control">
                  <input
                    className="input mb-2"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="field is-grouped is-grouped-centered">
                <div className="control">
                  <button
                    className={`button is-primary ${isLoading && 'is-loading'}`}
                    disabled={isLoading}
                    type="submit"
                  >
                    Log In
                  </button>
                </div>
                <div className="control">
                  <Link className="button is-light" to="/auth/register">
                    Sign Up
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
