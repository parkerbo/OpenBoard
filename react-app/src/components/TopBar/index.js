import "./TopBar.css"
import {MdMenu} from 'react-icons/md'
import { useEffect, useState } from "react";

const TopBar = ({show, toggle, page, title}) => {
    const toggleButtonClassName = show
			? "topbar-expand-sidebar-hidden"
			: "topbar-expand-sidebar";
    const [headerStyle, setHeaderStyle] = useState("openboard-topbar-home");
    const changeTopBarStyle = (event) => {
     const root = document.getElementsByClassName('openboard-root-page')[0]

			if (root.scrollY > 0) {
                console.log('here')
				setHeaderStyle("openboard-topbar-home-scroll");
			} else {
				setHeaderStyle("openboard-topbar-home");
			}
		};


		useEffect(() => {
            const root = document.getElementsByClassName('openboard-root-page')[0]
			root.addEventListener("scroll", changeTopBarStyle);
            return () => {
                root.removeEventListener("scroll", changeTopBarStyle);
            }
		}, []);
        if (page === "home"){
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
        if (page === "single-project"){
            return (
							<div
								className={`openboard-topbar-project`}
							>
								<div className={toggleButtonClassName}>
									<div id="topbar-toggle-button-div" onClick={toggle}>
										<MdMenu size="1.5em" />
									</div>
								</div>
								<h1 id="top-bar-title-project">{title}</h1>
							</div>
						);
        }

        return null;
}

export default TopBar;
