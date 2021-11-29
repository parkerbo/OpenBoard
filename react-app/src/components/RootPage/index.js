import TopBar from "../TopBar";
import { Route, useParams } from "react-router-dom";
import { useDispatch} from "react-redux";
import { useEffect, useState } from "react";
import { getProject } from "../../store/project";
import { getPriorities } from "../../store/priorities";
import ProjectPage from "../ProjectPage";
import HomePage from "../HomePage";
import "./RootPage.css"
const RootPage = ({show, toggle, page}) => {
    const {projectId} = useParams();
    const [loaded, setLoaded] = useState(false);
    const [project, setProject] = useState("")
    const dispatch = useDispatch();
    useEffect(async() => {
        setLoaded(false);
        if(page === 'single-project'){
            const res = await dispatch(getProject(projectId))
            setProject(res)
            setLoaded(true)
        } else {
            await dispatch(getPriorities());
            setLoaded(true);
        }
    }, [dispatch, page, projectId])
    if (!loaded){
        return null;
    }
	return (
		<div
			className={`openboard-root-page ${
				page === "home" ? "root-home-page-background" : null
			}`}
		>
			<Route path="/" exact={true}>
				<TopBar show={show} toggle={toggle} page={page} title={"Home"} />
				<HomePage />
			</Route>
			<Route path="/projects/:projectId">
				<TopBar show={show} toggle={toggle} page={page} project={project}/>
                <ProjectPage />
            </Route>
		</div>
	);
};

export default RootPage;
