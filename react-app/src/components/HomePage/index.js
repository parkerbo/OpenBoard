import "./HomePage.css"
import { useSelector } from "react-redux";

const HomePage = () => {
    const user = useSelector((state) => state.session.user);

    return (
			<div className="homepage-main">
				<div className="homepage-content">
					<h5 id="homepage-date">Friday, November 19</h5>
					<h2 id="homepage-greeting">Welcome back, {user.fullname}</h2>
					<div className="homepage-content-widgets">
						<div className="homepage-content-widgets-sort">
							<div className="homepage-widget-half">
								<div className="homepage-widget-content">
									<h1>Hello</h1>
								</div>
							</div>
							<div className="homepage-widget-half">
								<div className="homepage-widget-content"></div>
							</div>
							<div className="homepage-widget-full">
								<div className="homepage-widget-content">
									<h1>Hello</h1>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
}

export default HomePage
