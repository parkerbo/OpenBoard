import TopBar from "../TopBar";
import { Route } from "react-router-dom";

const RootPage = ({show, toggle}) => {
	return (
		<div className="openboard-root-page">
			<Route path="/" exact={true}>
				<TopBar show={show} toggle={toggle} />
			</Route>
		</div>
	);
};

export default RootPage;
