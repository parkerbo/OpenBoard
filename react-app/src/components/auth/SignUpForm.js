import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import OpenBoardLogo from "../../images/OpenBoard-Logo.png";
import { NavLink } from "react-router-dom";

import "./SignUp.css"

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(fullname, email, password));
      if (data) {
        setErrors(data)
      }
    } else  {
      setErrors(['Passwords do not match.'])
    }
  };

  const updateFullname = (e) => {
    setFullname(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
		<div className="signup-main-div">
			<div className="signup-panel-div">
				<div id="signup-logo">
					<NavLink to="/">
						<img src={OpenBoardLogo} alt="OpenBoard" />
					</NavLink>
				</div>
				<div className="signup-errors">
					{errors.map((error, ind) => (
						<div key={ind} style={{ padding: 5 }}>
							{error}
						</div>
					))}
				</div>
				<form onSubmit={onSignUp}>
					<div>
						<div id="signup-label" style={{ paddingTop: 30 }}>
							<label>Full Name</label>
						</div>
						<input
							type="text"
							name="fullname"
							onChange={updateFullname}
							value={fullname}
							required={true}
						></input>
					</div>
					<div>
						<div id="signup-label">
							<label>Email</label>
						</div>
						<input
							type="text"
							name="email"
							onChange={updateEmail}
							value={email}
							required={true}
						></input>
					</div>
					<div>
						<div id="signup-label">
							<label>Password</label>
						</div>
						<input
							type="password"
							name="password"
							onChange={updatePassword}
							value={password}
							required={true}
						></input>
					</div>
					<div>
						<div id="signup-label">
							<label>Repeat Password</label>
						</div>
						<input
							type="password"
							name="repeat_password"
							onChange={updateRepeatPassword}
							value={repeatPassword}
							required={true}
						></input>
					</div>
					<button id="signup-button" type="submit">
						Sign Up
					</button>
				</form>
				<span id="signup-yes-account">
					Already own an account? <NavLink to="/login">Log In</NavLink>
				</span>
			</div>
		</div>
	);
};

export default SignUpForm;
