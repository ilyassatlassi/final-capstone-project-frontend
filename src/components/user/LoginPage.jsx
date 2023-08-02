/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable jsx-a11y/label-has-associated-control */
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
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleLogin = async (e) => {
    e.preventDefault();
    // check if email and password are not empty
    if (!email.trim() || !password.trim()) {
      setErrorMessage('Email and password are required.');
      return;
    }
    setIsLoading(true);
    // set up the progress bar
    const interval = setInterval(() => {
      setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 10));
    }, 1000);
    try {
      await dispatch(login({ email, password }));
      // navigate the user to home page if authenticated
      console.log('Navigating to home page...');
      navigate('/');
      console.log('Navigated to home page');
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
      // clear the progress bar interval and reset progress
      clearInterval(interval);
      setProgress(0);
    }
  };

  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (user.signedIn) {
      navigate('/');
    }
  }, [user.signedIn, navigate]);

  return (
    <>
      {isLoading && (
        <div className="modal is-active">
          <div className="modal-background" />
          <div className="modal-content">
            <progress className="progress is-small is-primary" max="100" value={progress} />
          </div>
        </div>
      )}
      <div className="columns is-centered mt-6">
        <div className="column is-half">
          <div className="card">
            <div className="card-content">
              <h1 className="title is-4 has-text-centered mb-4">Log In Page</h1>
              {errorMessage && <p className="has-text-danger has-text-centered mb-4">{errorMessage}</p>}
              <form onSubmit={handleLogin}>
                <div className="field">
                  <label className="label">Email</label>
                  <div className="control">
                    <input
                      className="input"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label">Password</label>
                  <div className="control">
                    <input
                      className="input"
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
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
      </div>
    </>
  );
};

export default LoginPage;
