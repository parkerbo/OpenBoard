import "./Splash.css"
import OpenBoardLogo from "../../images/OpenBoard-Logo.png"
import sceneOne from "../../images/scene-1a.jpeg"
import sceneTwo from "../../images/scene-1b.jpeg";

import { useState, useEffect} from "react";
import { useHistory } from "react-router-dom";

const Splash = () => {
const history = useHistory();
const [headerStyle, setHeaderStyle] = useState("splash-header-container");
const changeHeaderStyle = (event) => {
    if (window.scrollY > 1){
        setHeaderStyle("splash-header-container-scroll");
    } else {
        setHeaderStyle("splash-header-container");
    }
}

useEffect(() => {
    window.addEventListener('scroll',changeHeaderStyle)
},[])


    return (
			<div class="splash-main">
				<div class="splash-background-container">
					<div class={headerStyle}>
						<header class="splash-header">
							<div id="splash-header-logo">
								<img src={OpenBoardLogo} alt="OpenBoard" />
							</div>
							<ul id="splash-links-list">
								<li>Why OpenBoard?</li>
								<li>Features</li>
								<li>Resources</li>
							</ul>
							<div class="splash-action-links">
								<p id="splash-log-in" onClick={() => history.push("/login")}>
									Log In
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
									<i> coding issues</i> so teams know what to do, why it
									matters, and how to get it done.
								</h4>
								<button id="splash-sign-up-bottom">Get Started</button>
						</div>
                        <div class="splash-section-1-column-2">
                            <img id="splash-scene-one" src={sceneOne} />
                            <img id="splash-scene-two"src={sceneTwo} />
                        </div>
					</div>
				</div>
			</div>
		);


}

export default Splash
