import "./TopBar.css"
import {MdMenu} from 'react-icons/md'
import { useEffect, useState } from "react";

const TopBar = ({show, toggle, page}) => {
    const toggleButtonClassName = show
			? "topbar-expand-sidebar-hidden"
			: "topbar-expand-sidebar";
    const [headerStyle, setHeaderStyle] = useState("openboard-topbar-home");
    const changeTopBarStyle = (event) => {
			if (window.scrollY > 0) {
                console.log('here')
				setHeaderStyle("openboard-topbar-home-scroll");
			} else {
				setHeaderStyle("openboard-topbar-home");
			}
		};

		useEffect(() => {
			window.addEventListener("scroll", changeTopBarStyle);
            return () => {
                window.removeEventListener("scroll", changeTopBarStyle);
            }
		}, []);
    return (
			<div
				className={`openboard-topbar ${
					page === "home" ? headerStyle : null
				}`}
			>
				<div className={toggleButtonClassName}>
					<div id="topbar-toggle-button-div" onClick={toggle}>
						<MdMenu size="1.5em" />
					</div>
				</div>
				<h1 id="top-bar-title">Home</h1>
			</div>
		);
}

export default TopBar;
