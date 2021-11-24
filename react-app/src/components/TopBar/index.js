import "./TopBar.css";
import { MdMenu, MdExpandMore, MdModeEdit } from "react-icons/md";
import { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import Modal from "../Modal";
import { authenticate } from "../../store/session";
import { useHistory } from "react-router";
import { saveProject, deleteProject} from "../../store/project";


const TopBar = ({ show, toggle, page, project }) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const didMount = useRef(false);
	const [showProjectDetails, setShowProjectDetails] = useState(false);
    const [showProjectDetailsModal, setShowProjectDetailsModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [projectTitle, setProjectTitle] = useState("");
    const [saveState, setSaveState] = useState("");
    const [projectDescription, setProjectDescription] = useState("");
    useEffect(() => {if (project) {
        setProjectTitle(project.title)
        setProjectDescription(project.description)
    }}, [])

    const executeDelete = async(e) => {
        e.preventDefault();
        await dispatch(deleteProject(project.id));
        await dispatch(authenticate())
        return history.push('/')

    }

	const toggleButtonClassName = show
		? "topbar-expand-sidebar-hidden"
		: "topbar-expand-sidebar";
	const [headerStyle, setHeaderStyle] = useState("openboard-topbar-home");
	const changeTopBarStyle = (event) => {
		const root = document.getElementsByClassName("openboard-root-page")[0];

		if (root.scrollY > 0) {
			console.log("here");
			setHeaderStyle("openboard-topbar-home-scroll");
		} else {
			setHeaderStyle("openboard-topbar-home");
		}
	};

	useEffect(() => {
		const root = document.getElementsByClassName("openboard-root-page")[0];
		root.addEventListener("scroll", changeTopBarStyle);
		return () => {
			root.removeEventListener("scroll", changeTopBarStyle);
		};
	}, []);

     useEffect(() => {
				const delayDebounceFn = setTimeout(async () => {
					if (didMount.current) {
						const payload = {
                            projectId: project.id,
							title: projectTitle,
							description: projectDescription,
						};

						await dispatch(saveProject(payload));
						setSaveState("All changes saved");
						setTimeout(() => {
							setSaveState("");
						}, 1000);
					} else {
						didMount.current = true;
					}

				}, 500);

				return () => clearTimeout(delayDebounceFn);
			}, [projectTitle, projectDescription]);


	if (page === "home") {
		return (
			<div
				className={`openboard-topbar ${page === "home" ? headerStyle : null}`}
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
	if (page === "single-project") {
		return (
			<>
				<Modal
					title="Project details"
					onClose={() => setShowProjectDetailsModal(false)}
					show={showProjectDetailsModal}
                    height={460}
				>
					<div id="modal-label">Name</div>
                    <div style={{padding:"0px 20px"}}>
					<input
						type="text"
						placeholder={project.title}
						value={projectTitle}
						onChange={(e) => setProjectTitle(e.target.value)}
					></input>
                    </div>
					<div id="modal-label">Description</div>
                    <div style={{padding:"20px 20px"}}>
					<textarea
						type="text"
						placeholder={project.description}
						value={projectDescription}
						onChange={(e) => setProjectDescription(e.target.value)}
					></textarea>
                    </div>
					<div style={{height:"50px", padding:"0px 20px"}}>{saveState}</div>
				</Modal>
				<Modal
					title={`Delete the "${project.title}" project?`}
					onClose={() => setShowDeleteModal(false)}
					show={showDeleteModal}
                    height={200}
				>
					<div style={{ padding: "20px 20px" }}>
						<p>
							This will delete the project, along with any associated tasks.
						</p>
					</div>
					<div id="modal-button-container">
						<button id="modal-button-cancel" onClick={() => setShowDeleteModal(false)}>
							Cancel
						</button>
						<button id="modal-button-delete" onClick={executeDelete}>
							Delete
						</button>
					</div>
				</Modal>
				<div className={`openboard-topbar-project`}>
					<div className={toggleButtonClassName}>
						<div id="topbar-toggle-button-div" onClick={toggle}>
							<MdMenu size="1.5em" />
						</div>
					</div>
					<h1 id="top-bar-title-project">{projectTitle}</h1>
					<div
						id={
							showProjectDetails
								? `top-bar-project-details-button-active`
								: `top-bar-project-details-button`
						}
						onClick={() => setShowProjectDetails(!showProjectDetails)}
					>
						<MdExpandMore size="1.7em" />
						{showProjectDetails ? (
							<div className="top-bar-project-details-options">
								<div
									id="top-bar-project-detail-single-option"
									onClick={() => setShowProjectDetailsModal(true)}
								>
									<MdModeEdit /> <span>Edit project details</span>
								</div>
								<div
									id="top-bar-project-detail-single-option"
									style={{ borderBottom: "1px solid #ECEAE9" }}
								>
									<MdModeEdit /> <span>Set color & icon</span>
								</div>
								<div
									id="top-bar-project-detail-single-option"
									onClick={() => setShowDeleteModal(true)}
								>
									<span style={{ color: "#F06A6F" }}>Delete project</span>
								</div>
							</div>
						) : null}
					</div>
				</div>
			</>
		);
	}

	return null;
};

export default TopBar;
