import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { login } from "../../store/session";
import "./Login.css";
import OpenBoardLogo from "../../images/OpenBoard-Logo.png";
import { NavLink } from "react-router-dom";
const LoginForm = () => {
	const [errors, setErrors] = useState([]);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const user = useSelector((state) => state.session.user);
	const dispatch = useDispatch();

	const onLogin = async (e) => {
		e.preventDefault();
		const data = await dispatch(login(email, password));
		if (data) {
			setErrors(data);
		}
	};

	const updateEmail = (e) => {
		setEmail(e.target.value);
	};

	const updatePassword = (e) => {
		setPassword(e.target.value);
	};

	if (user) {
		return <Redirect to="/" />;
	}

	return (
		<div className="login-main-div">
			<div className="login-panel-div">
				<div id="login-logo">
					<NavLink to="/">
						<img src={OpenBoardLogo} alt="OpenBoard" />
					</NavLink>
				</div>
				<div className="login-errors">
					{errors.map((error, ind) => (
						<div key={ind} style={{padding:5}}>{error}</div>
					))}
				</div>

				<form onSubmit={onLogin}>
					<div>
						<div id="login-label" style={{ paddingTop: 40 }}>
							<label htmlFor="email">Email Address</label>
						</div>
						<input
							name="email"
							type="text"
							value={email}
							onChange={updateEmail}
						/>
					</div>
					<div>
						<div id="login-label" style={{ paddingTop: 30 }}>
							<label htmlFor="password">Password</label>
						</div>
						<input
							name="password"
							type="password"
							value={password}
							onChange={updatePassword}
						/>
						<button id="login-button" type="submit">Login</button>
					</div>
				</form>
        <span id="login-no-account">
          Don't have an account? <NavLink to="/sign-up">Sign up</NavLink>
        </span>
			</div>
		</div>
	);
};

export default LoginForm;
