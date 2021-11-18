import React from "react";
import { NavLink } from "react-router-dom";
import LogoutButton from "../auth/LogoutButton";
import { MdMenuOpen } from "react-icons/md";
import OpenBoardLogo from "../../images/OpenBoard-Logo-Dark.png"
import "./SideBar.css";
const SideBar = ({ show, toggle }) => {
	const sidebarClass = show ? "sidebar-open" : "sidebar-closed";
	return (
		<nav className={sidebarClass}>
			<div className="sidebar-header">
				<img id="sidebar-header-logo" src={OpenBoardLogo} />
				<div id="sidebar-toggle-button" onClick={toggle}>
					<MdMenuOpen size="2em" />
				</div>
			</div>
			<ul>
				<li>
					<NavLink to="/" exact={true} activeClassName="active">
						Home
					</NavLink>
				</li>
				<li>
					<NavLink to="/login" exact={true} activeClassName="active">
						Login
					</NavLink>
				</li>
				<li>
					<NavLink to="/sign-up" exact={true} activeClassName="active">
						Sign Up
					</NavLink>
				</li>
				<li>
					<NavLink to="/users" exact={true} activeClassName="active">
						Users
					</NavLink>
				</li>
				<li>
					<LogoutButton />
				</li>
			</ul>
		</nav>
	);
};

export default SideBar;
