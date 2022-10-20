import { useState } from "react";
import utils from "../../services/usersService,js";
import { Link, useNavigate } from "react-router-dom";

const RegisterComp = () => {
  const [user, setUser] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const signup = async (e) => {
    e.preventDefault();
    try {
      await utils.signup(user);
      navigate("/login");
    } catch (err) {
      console.log(err);
      setErrorMessage(err.response.data);
    }
  };

  return (
    <div className="Login">
      <form onSubmit={signup}>
        <div className="form-inner">
          <h2>Register</h2>
          <p className="errorMessage">{errorMessage}</p>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              name="name"
              id="fname"
              onChange={(e) => setUser({ ...user, fullname: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label htmlFor="name">Username</label>
            <input
              type="text"
              name="name"
              id="uname"
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
          <input type="submit" value="Signup" /> <br />
          <br />
          <Link to="/login"> Alreafy have acount? log in </Link>
        </div>
      </form>
    </div>
  );
};

export default RegisterComp;
