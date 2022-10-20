import "./Login.css";
import { useEffect, useState } from "react";
import {
  authenticateError,
  login,
  logout,
  selectAuthenticateError,
} from "../../appReducer/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import utils from "../../services/usersService,js";
import { selectFetchMovieError } from "../../appReducer/movieSlice";

function LoginComp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [user, setUser] = useState({ username: "", password: "" });
  const username = sessionStorage["username"];

  const errorMessage = useSelector(selectFetchMovieError);
  const accessDeniedError = useSelector(selectAuthenticateError);

  // Change to main page if already logged in
  useEffect(() => {
    if (username !== "") {
      navigate("/");
    }
  }, [username]);

  const Login = async (e) => {
    e.preventDefault();
    try {
      const { data } = await utils.login(user);
      dispatch(login(data.result));
      navigate("/");
    } catch (error) {
      dispatch(logout());
      dispatch(authenticateError(error.response.data.message));
    }
  };

  return (
    <div className="Login">
      <form onSubmit={Login}>
        <div className="form-inner">
          <h2>Login</h2>
          <p className="errorMessage">
            {accessDeniedError != "" ? accessDeniedError : errorMessage}
          </p>
          <div className="form-group">
            <label htmlFor="name">Username</label>
            <input
              type="text"
              name="name"
              id="name"
              onChange={(e) => setUser({ ...user, username: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
          </div>
          <input type="submit" value="Login" /> <br />
          <br />
          Dont have an account? <Link to="/register">Create account</Link>
        </div>
      </form>
    </div>
  );
}

export default LoginComp;
