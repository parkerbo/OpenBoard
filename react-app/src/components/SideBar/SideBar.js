import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import LogoutButton from "../auth/LogoutButton";
import { BsLinkedin, BsGithub } from "react-icons/bs";
import NewProject from "./NewProject";
import { MdMenuOpen } from "react-icons/md";
import { FaSquare, FaPlus } from "react-icons/fa";
import OpenBoardLogo from "../../images/OpenBoard-Logo-Dark.png";
import "./SideBar.css";
import { MdHome, MdCheckCircleOutline, MdOutlineListAlt } from "react-icons/md";

const SideBar = ({ show, toggle }) => {
	const user = useSelector((state) => state.session.user);
	const user_projects = user.projects;
	const sidebarClass = show ? "sidebar-open" : "sidebar-closed";

	return (
		<nav className={sidebarClass}>
			<div className="sidebar-header">
				<img id="sidebar-header-logo" src={OpenBoardLogo} />
				<div id="sidebar-toggle-button" onClick={toggle}>
					<MdMenuOpen size="2em" />
				</div>
			</div>
			<div className="sidebar-links-section">
				<NavLink to="/" exact={true} activeClassName="sidebar-active">
					<div id="sidebar-link">
						<MdHome size="1.5em" /> <span id="sidebar-link-text">Home</span>
					</div>
				</NavLink>
				{/* <NavLink to="/tasks" exact={true} activeClassName="sidebar-active">
					<div id="sidebar-link">
						<MdCheckCircleOutline size="1.5em" />{" "}
						<span id="sidebar-link-text">My Tasks</span>
					</div>
				</NavLink>
				<NavLink to="/projects" exact={true} activeClassName="sidebar-active">
					<div id="sidebar-link">
						<MdOutlineListAlt size="1.5em" />{" "}
						<span id="sidebar-link-text">My Projects</span>
					</div>
				</NavLink> */}
			</div>
			<div className="sidebar-projects-section">
				<div id="sidebar-projects-title">
					My Projects <div id="add-project-button"> <NewProject /></div>
				</div>
				{user_projects
					? Object.keys(user_projects).map((key) => (
							<NavLink
								activeClassName="sidebar-active"
								key={user_projects[key].project_id}
								to={`/projects/${user_projects[key].project_id}`}
							>
								<div id="sidebar-project-link">
									<div id="sidebar-project-color">
										<FaSquare
											size=".7em"
											color={user_projects[key].project_color}
										/>
									</div>
									<div id="sidebar-project-link-title">
										{user_projects[key].project_title}
									</div>
								</div>
							</NavLink>
					  ))
					: null}
			</div>
			<div className="sidebar-log-out">
				<LogoutButton />
			</div><div style={{textAlign:"center"}}>Created by Parker Bolick</div>
			<div id="about-external-links-side">

				<Link
					to={{
						pathname: "http://www.github.com/parkerbo",
					}}
					target="_blank"
				>
					<div style={{ marginRight: 10 }}>
						<BsGithub size="2em" />
					</div>
				</Link>
				<Link
					to={{
						pathname: "http://www.linkedin.com/in/parkerbolick/",
					}}
					target="_blank"
				>
					<div>
						<BsLinkedin size="2em" />
					</div>
				</Link>
			</div>
		</nav>
	);
};

export default SideBar;
