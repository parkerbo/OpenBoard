import { FaPlus } from "react-icons/fa";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authenticate } from "../../store/session";
import Modal from "../Modal";
import { createProject } from "../../store/project";
const NewProject = () => {
    const dispatch = useDispatch();
    const history = useHistory();
	const [showNewProjectModal, setShowNewProjectModal] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const submitProject = async(e) => {
        e.preventDefault();
        const payload = {
            'projectTitle': title,
            'projectDescription' : description
        }
        const res = await dispatch(createProject(payload));
        if (res){
            setShowNewProjectModal(false);
            await dispatch(authenticate());
            return history.push(`/projects/${res.id}`);
        }

    }
	return (
		<>
			<Modal
				title="Create new project"
				onClose={() => setShowNewProjectModal(false)}
				show={showNewProjectModal}
			>
				<div id="modal-label">Project Title</div>
                <form onSubmit={submitProject}>
				<input
					type="text"
                    required
					placeholder="Enter your new project title..."
					value={title}
					onChange={(e) => setTitle(e.target.value)}
				></input>
				<div id="modal-label">Project Description</div>
				<textarea
					type="text"
					placeholder="Give more details about this project..."
					value={description}
					onChange={(e) => setDescription(e.target.value)}
				></textarea>
				<div id="modal-button-container">
					<button id="modal-button" type="submit">Create</button>
				</div>
                </form>
			</Modal>
			<div
				id="sidebar-add-new-project-button"
				onClick={() => setShowNewProjectModal(true)}
			>
				<FaPlus />
			</div>
		</>
	);
};

export default NewProject;
