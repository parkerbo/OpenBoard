import "./TaskDetail.css";
import { useTaskDetail } from "../../context/TaskDetailContext";
import { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { MdDone } from "react-icons/md";
import { BiArrowToRight } from "react-icons/bi";
import { BsPersonCircle } from "react-icons/bs";
import {
	getProject,
	updateTask,
	deleteTask,
	toggleCompleteTask,
} from "../../store/project";
const TaskDetail = ({ show, task, projectId }) => {
	const dispatch = useDispatch();
	const didMount = useRef(false);
	const assigneeDiv = useRef();
	const assigneeInput = useRef();
	const [saveState, setSaveState] = useState("");
	const [searchQuery, setSearchQuery] = useState("");
	const { setShowTaskDetail, setCurrentTask } = useTaskDetail();
	const [title, setTitle] = useState();
	const [showAssigneeForm, setShowAssigneeForm] = useState(false);
	const [description, setDescription] = useState();
	const [assignee, setAssignee] = useState(null);
	const [dueDate, setDueDate] = useState();
	const [priority, setPriority] = useState();
	const [status, setStatus] = useState();
	const [users, setUsers] = useState([]);

	useEffect(() => {
		async function fetchData() {
			const response = await fetch("/api/users/");
			const responseData = await response.json();
			setUsers(responseData.users);
		}
		fetchData();
	}, []);

	const handleTitleChange = (e) => {
		const value = e.target.value.replace(/[\r\n\v]+/g, "");
		setTitle(value);
	};
	const handleDescriptionChange = (e) => {
		setDescription(e.target.value);
	};
	const handlePriorityChange = (e) => {
		setPriority(e.target.value);
	};
	const handleStatusChange = (e) => {
		setStatus(e.target.value);
	};
	useEffect(() => {
		if (showAssigneeForm) {
			assigneeInput.current.select();
			document.addEventListener("mousedown", handleClick);
			return () => {
				document.removeEventListener("mousedown", handleClick);
			};
		}
	}, [showAssigneeForm]);
	const handleClick = (e) => {
		if (assigneeDiv.current.contains(e.target)) {
			// inside click
			return;
		}
		return setShowAssigneeForm(false);
	};
	useEffect(() => {
		if (task) {
			setTitle(task.title);
			setDescription(task.description);
			if (task.assignee) {
				setAssignee(task.assignee);
			} else {
				setAssignee(null);
			}
			if (task.end_date) {
				setDueDate(task.end_date);
			} else {
				setDueDate(null);
			}
			if (task.priority) {
				setPriority(task.priority);
			} else {
				setPriority("---");
			}
			if (task.status) {
				setStatus(task.status);
			} else {
				setStatus("---");
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
					assignee: assignee? assignee.id : null,
					priority: priority,
					status: status,
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
	}, [title, description, dueDate, assignee, priority, status]);

	const executeDeleteTask = async () => {
		await dispatch(deleteTask(task.section_id, task.id));
		setShowTaskDetail(false);
		await dispatch(getProject(projectId));
	};
	const toggleCompleted = async (e) => {
		e.stopPropagation();
		e.preventDefault();
		const res = await dispatch(toggleCompleteTask(task.id));
		if (res) {
			await dispatch(getProject(projectId));
		}
	};

	const queryUsers = (users, searchQuery) => {
		if (!searchQuery) {
			return null;
		}

		return users.filter((user) => {
			const user_fullname = user.fullname.toLowerCase();
			const user_email = user.email.toLowerCase();
			return (
				user_fullname.includes(searchQuery.toLowerCase()) ||
				user_email.includes(searchQuery.toLowerCase())
			);
		});
	};
	const filteredUsers = queryUsers(users, searchQuery);

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
								<button
									onClick={toggleCompleted}
									id={
										task.completed
											? "task-detail-toolbar-complete-button-completed"
											: "task-detail-toolbar-complete-button"
									}
								>
									<MdDone /> {task.completed ? "Completed" : "Mark Complete"}
								</button>
								{saveState}
							</div>
							<div id="task-detail-close">
								<div>
									<button
										id="task-detail-toolbar-delete"
										onClick={executeDeleteTask}
									>
										Delete task
									</button>
								</div>
								<div
									id="task-detail-toolbar-close"
									onClick={() => {
										setShowTaskDetail(false);
										setCurrentTask("");
									}}
								>
									<BiArrowToRight size="1.9em" />
								</div>
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
									<div>
										{showAssigneeForm ? (
											<>
												<div id="task-detail-assignee-form" ref={assigneeDiv}>
													<div id="task-detail-assignee-icon">
														<BsPersonCircle size="1.4em" />
													</div>
													<input
														ref={assigneeInput}
														type="text"
														value={searchQuery}
														onChange={(e) => setSearchQuery(e.target.value)}
													/>

													{filteredUsers
														? filteredUsers.length > 0 && (
																<div id="task-detail-assignee-search">
																	{filteredUsers.map((user) => (
																		<div
																			key={user.id}
																			id="task-detail-search-result"
																			onClick={() => {
																				setAssignee(user);
																				setShowAssigneeForm(false);
                                                                                setSearchQuery("")
																			}}
																		>
																			<h3>{user.fullname}</h3>
																			<p>{user.email}</p>
																		</div>
																	))}
																</div>
														  )
														: null}
												</div>
											</>
										) : (
											<>
												<div
													id="task-detail-assignee"
													onClick={() => setShowAssigneeForm(true)}
												>
													<div id="task-detail-assignee-icon">
														<BsPersonCircle size="1.4em" />
													</div>
													{assignee ? assignee.fullname : "No assignee"}
												</div>
											</>
										)}
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
