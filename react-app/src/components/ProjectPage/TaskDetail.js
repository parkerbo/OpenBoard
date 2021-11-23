import "./TaskDetail.css";
import { useTaskDetail } from "../../context/TaskDetailContext";
import { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { MdDone } from "react-icons/md";
import { getProject, updateTask, deleteTask } from "../../store/project";
const TaskDetail = ({ show, task, projectId, sectionId }) => {
    const dispatch = useDispatch();
    const didMount = useRef(false);
    const [saveState, setSaveState] = useState("");
	const { setShowTaskDetail } = useTaskDetail();
	const [title, setTitle] = useState();
	const [description, setDescription] = useState();
	const [assignee, setAssignee] = useState(null);
	const [dueDate, setDueDate] = useState();
	const [priority, setPriority] = useState();
	const [status, setStatus] = useState();
	const handleTitleChange = (e) => {
		const value = e.target.value.replace(/[\r\n\v]+/g, "");
		setTitle(value);
	};
    const handleDescriptionChange = (e) => {
        setDescription(e.target.value)
    }
    const handlePriorityChange = (e) => {
			setPriority(e.target.value);
		};
    const handleStatusChange = (e) => {
			setStatus(e.target.value);
		};

	useEffect(() => {
		if (task) {
			setTitle(task.title);
			setDescription(task.description);
			if (task.assignee) {
				setAssignee(task.assignee);
			}
			if (task.end_date) {
				setDueDate(task.end_date);
			} else{
                setDueDate(null)
            }
			if (task.priority) {
				setPriority(task.priority);
			} else {
                setPriority("---")
            }
            if (task.status) {
				setStatus(task.status);
			} else {
                setStatus("---")
            }
		}
	}, [task]);
    useEffect(() => {
			const delayDebounceFn = setTimeout(async () => {
				if (didMount.current) {
					const payload = {
						title: title,
                        description: description,
                        end_date: dueDate,
                        assignee: assignee,
                        priority: priority,
                        status: status

					};

					const res = await dispatch(updateTask(task.id, payload));
                    if (res) {
                        await dispatch(getProject(projectId));
                    }
					setSaveState("All changes saved");
					setTimeout(() => {
						setSaveState("");
					}, 1000);
				} else {
					didMount.current = true;
				}

			}, 200);

			return () => clearTimeout(delayDebounceFn);
		}, [title, description,dueDate,assignee,priority,status]);

    const executeDeleteTask = async() => {
        await dispatch(deleteTask(task.section_id, task.id));
        setShowTaskDetail(false);
        await dispatch(getProject(projectId));
    }
	return (
		<div
			className={`task-detail-overlay ${
				show ? "task-detail-overlay-open" : null
			}`}
		>
			<div className="task-detail-inner-content">
				{task ? (
					<>
						<div className="task-detail-toolbar">
							<div id="task-detail-toolbar-complete">
								<button id="task-detail-toolbar-complete-button">
									<MdDone /> {task.completed ? "Completed" : "Mark Complete"}
								</button>
                                {saveState}
							</div>
							<div id="task-detail-close">
                                <button onClick={executeDeleteTask}>Delete task</button>
								<button
									onClick={() => {
										setShowTaskDetail(false);
									}}
								>
									Close details
								</button>
							</div>
						</div>
						<div className="task-detail-details">
							<div>
								<textarea
									id="title-textarea"
									type="text"
									placeholder="Write a task name"
									value={title}
									onChange={handleTitleChange}
								/>
							</div>
							<div className="task-detail-fields">
								<div className="task-detail-fields-row">
									<div id="task-detail-row-label">Assignee</div>
									<div id="task-detail-row-content">
										{assignee ? assignee.fullname : "No assignee"}
									</div>
								</div>
								<div className="task-detail-fields-row">
									<div id="task-detail-row-label">Due date</div>
									<div id="task-detail-row-content">
										{dueDate ? dueDate : "No due date"}
									</div>
								</div>
								<div className="task-detail-fields-row">
									<div id="task-detail-row-label">Priority</div>
									<div id="task-detail-row-content">
										<select value={priority} onChange={handlePriorityChange}>
											<option value="null">---</option>
											<option value="Low">Low</option>
											<option value="Medium">Medium</option>
											<option value="High">High</option>
										</select>
									</div>
								</div>
								<div className="task-detail-fields-row">
									<div id="task-detail-row-label">Status</div>
									<div id="task-detail-row-content">
										<select value={status} onChange={handleStatusChange}>
											<option value="null">---</option>
											<option value="On Track">On Track</option>
											<option value="At Risk">At Risk</option>
											<option value="Off Track">Off Track</option>
										</select>
									</div>
								</div>
								<div className="task-detail-fields-row">
									<div id="task-detail-row-label">Description</div>
								</div>
								<div>
									<textarea
										id="description-textarea"
										type="text"
										placeholder="Add more detail to this task..."
										value={description}
										onChange={handleDescriptionChange}
									/>
								</div>
							</div>
						</div>
					</>
				) : null}
			</div>
		</div>
	);
};

export default TaskDetail;
