import { FaPlus } from "react-icons/fa";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authenticate } from "../../store/session";
import { IoIosAddCircle } from "react-icons/io";
import Modal from "../Modal";
import { createProject } from "../../store/project";
const NewProject = ({ location }) => {
	const dispatch = useDispatch();
	const history = useHistory();
	const [showNewProjectModal, setShowNewProjectModal] = useState(false);
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const submitProject = async (e) => {
		e.preventDefault();
		const payload = {
			projectTitle: title,
			projectDescription: description,
		};
		const res = await dispatch(createProject(payload));
		if (res) {
			setShowNewProjectModal(false);
			await dispatch(authenticate());
			return history.push(`/projects/${res.id}`);
		}
	};
	return (
		<>
			<Modal
				title="Create new project"
				onClose={() => setShowNewProjectModal(false)}
				show={showNewProjectModal}
			>
				<div id="modal-label">Project Title</div>
				<form onSubmit={submitProject}>
					<div style={{ padding: "0px 20px" }}>
						<input
							type="text"
							required
							placeholder="Enter your new project title..."
							value={title}
							onChange={(e) => setTitle(e.target.value)}
						></input>
					</div>
					<div id="modal-label">Project Description</div>
					<div style={{ padding: "0px 20px" }}>
						<textarea
							type="text"
							placeholder="Give more details about this project..."
							value={description}
							onChange={(e) => setDescription(e.target.value)}
						></textarea>
					</div>
					<div id="modal-button-container">
						<button id="modal-button" type="submit">
							Create
						</button>
					</div>
				</form>
			</Modal>
			{location === "sidebar" ? (
				<div
					id="sidebar-add-new-project-button"
					onClick={() => setShowNewProjectModal(true)}
				>
					<FaPlus />
				</div>
			) : (
				<div
					className="homepage-add-new-project"
					id="project-item"
					onClick={() => setShowNewProjectModal(true)}
				>
					<div id="top-bar-project-icon-container">
						<div id="top-bar-project-icon">
							<IoIosAddCircle size="1.6em" />
						</div>
					</div>
					<h2>Add a new project</h2>
				</div>
			)}
		</>
	);
};

export default NewProject;
