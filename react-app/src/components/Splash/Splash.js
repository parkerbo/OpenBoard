import "./Splash.css";
import OpenBoardLogo from "../../images/OpenBoard-Logo.png";
import sceneOne from "../../images/scene-1a.jpeg";
import sceneTwo from "../../images/scene-1b.jpeg";
import * as sessionActions from "../../store/session";
import { BsLinkedin, BsGithub } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

const Splash = () => {
	const history = useHistory();
	const dispatch = useDispatch();
	const aboutDiv = useRef();
	const [showAbout, setShowAbout] = useState(false);
	const [headerStyle, setHeaderStyle] = useState("splash-header-container");

	const changeHeaderStyle = (event) => {
		if (window.scrollY > 3) {
			setHeaderStyle("splash-header-container-scroll");
		} else {
			setHeaderStyle("splash-header-container");
		}
	};

	useEffect(() => {
		if (showAbout) {
			document.addEventListener("mousedown", handleClick);
			return () => {
				document.removeEventListener("mousedown", handleClick);
			};
		}
	}, [showAbout]);

	const handleClick = (e) => {
		if (aboutDiv.current.contains(e.target)) {
			// inside click
			return;
		}
		setShowAbout(false);
		return;
	};
	useEffect(() => {
		window.addEventListener("scroll", changeHeaderStyle);
		return () => {
			window.removeEventListener("scroll", changeHeaderStyle);
		};
	}, []);

	const loginDemo = async () => {
		await dispatch(sessionActions.login("demo@aa.io", "password"));
	};

	return (
		<div class="splash-main">
			<div class="splash-background-container">
				<div class={headerStyle}>
					<header class="splash-header">
						<div id="splash-header-logo">
							<img src={OpenBoardLogo} alt="OpenBoard" />
						</div>
						<ul id="splash-links-list">
							<div
								id="about-link"
								ref={aboutDiv}
								onClick={(e) => {
									setShowAbout(!showAbout);
								}}
							>
								About
								{showAbout ? (
									<div id="about-me" onClick={(e) => e.stopPropagation()}>
										<h2>Created by Parker Bolick</h2>
										<div id="about-external-links">
											<Link
												to={{
													pathname: "http://www.github.com/parkerbo",
												}}
												target="_blank"
											>
												<div style={{marginRight:10}}><BsGithub size="2em" /></div>
											</Link>
											<Link
												to={{
													pathname: "http://www.linkedin.com/in/parkerbolick/",
												}}
												target="_blank"
											>
												<div><BsLinkedin size="2em" /></div>
											</Link>
										</div>
									</div>
								) : null}
							</div>
						</ul>
						<div class="splash-action-links">
							<p id="splash-log-in" onClick={() => history.push("/login")}>
								Log In
							</p>
							<p id="splash-log-in" onClick={loginDemo}>
								Demo
							</p>
							<button
								id="splash-sign-up-top"
								onClick={() => history.push("/sign-up")}
							>
								Get Started
							</button>
						</div>
					</header>
				</div>
				<div class="splash-section-1">
					<div class="splash-section-1-column-1">
						<h1>Work on big ideas, without the busywork.</h1>
						<h4 style={{ maxWidth: 420 }}>
							From the small bugs to the severe errors, OpenBoard organizes
							<i> coding issues</i> so teams know what to do, why it matters,
							and how to get it done.
						</h4>
						<div style={{ display: "flex" }}>
							<button
								id="splash-sign-up-bottom"
								onClick={() => history.push("/sign-up")}
							>
								Get Started
							</button>
							<button id="splash-demo-bottom" onClick={loginDemo}>
								Demo
							</button>
						</div>
					</div>
					<div class="splash-section-1-column-2">
						<div class="splash-scenes">
							<div id="splash-scene-one">
								<img src={sceneOne} width="100%" alt="OpenBoard-SceneOne" />
							</div>
							<div id="splash-scene-two">
								<img src={sceneTwo} width="100%" alt="OpenBoard-SceneTwo" />
							</div>
						</div>
						<span id="splash-floating-span-1">
							<i
								className="far fa-check-circle"
								style={{ paddingRight: 10, color: "#f06a6a" }}
							></i>{" "}
							Change div position style
						</span>
						<span id="splash-floating-span-2">
							<i
								className="far fa-check-circle"
								style={{ paddingRight: 10, color: "#f06a6a" }}
							></i>{" "}
							Fix console log errors
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Splash;
