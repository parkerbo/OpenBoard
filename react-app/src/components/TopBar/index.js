import "./TopBar.css"

const TopBar = ({show, toggle}) => {
    const toggleButtonClassName = show
			? "topbar-expand-sidebar-hidden"
			: "topbar-expand-sidebar";
    return (
			<div className="openboard-topbar">
				<div className={toggleButtonClassName}>
					<div id="topbar-toggle-button-div" onClick={toggle}>
						<i className="fas fa-bars" ></i>
					</div>
				</div>
				<h1>Top Bar</h1>
			</div>
		);
}

export default TopBar;
