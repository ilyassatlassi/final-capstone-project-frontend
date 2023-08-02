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
      <div className="columns is-centered mt-6">
        <div className="column is-half">
          <div className="card">
            <div className="card-content">
              <h1 className="title is-4 has-text-centered mb-4">Log In Page</h1>
              {error && <p className="has-text-danger has-text-centered mb-4">{error}</p>}
              <form onSubmit={handleLogin}>
                <div className="field">
                  <p className="label">Email</p>
                  <div className="control">
                    <input
                      className="input"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="field">
                  <p className="label">Password</p>
                  <div className="control">
                    <input
                      className="input"
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
      </div>
    </>
  );
};

export default LoginPage;
