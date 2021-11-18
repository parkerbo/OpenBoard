import TopBar from "../TopBar";
import { Route } from "react-router-dom";
import HomePage from "../HomePage";
import "./RootPage.css"
const RootPage = ({show, toggle, page}) => {

	return (
		<div className={`openboard-root-page ${page==='home'?'root-home-page-background':null}`}>
			<Route path="/" exact={true}>
				<TopBar show={show} toggle={toggle} page={page}/>
                <HomePage />
			</Route>
		</div>
	);
};

export default RootPage;
