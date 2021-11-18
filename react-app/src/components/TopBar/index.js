import "./TopBar.css"
import {MdMenu} from 'react-icons/md'

const TopBar = ({show, toggle}) => {
    const toggleButtonClassName = show
			? "topbar-expand-sidebar-hidden"
			: "topbar-expand-sidebar";
    return (
			<div className="openboard-topbar">
				<div className={toggleButtonClassName}>
					<div id="topbar-toggle-button-div" onClick={toggle}>
						<MdMenu size="1.5em"/>
					</div>
				</div>
				<h1>Top Bar</h1>
			</div>
		);
}

export default TopBar;
