import "./TaskDetail.css";
import "react-calendar/dist/Calendar.css";
import { useTaskDetail } from "../../context/TaskDetailContext";
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdDone } from "react-icons/md";
import { BiArrowToRight } from "react-icons/bi";
import {MdExpandMore} from "react-icons/md";
import { BsPersonCircle, BsCalendar } from "react-icons/bs";
import { IoIosCloseCircle } from "react-icons/io";
import TextareaAutosize from "react-textarea-autosize";
import InitialsAvatar from "../InitialsAvatar";
import Calendar from "react-calendar";
import {
	getProject,
	updateTask,
	deleteTask,
	toggleCompleteTask,
    addTaskComment
} from "../../store/project";
const TaskDetail = ({ show, task, projectId }) => {
	const dispatch = useDispatch();
	const currentUser = useSelector((state) => state.session.user);
	const [comments, setComments] = useState();
	const didMount = useRef(false);
	const assigneeDiv = useRef();
	const dateDiv = useRef();
	const commentDiv = useRef();
	const assigneeInput = useRef();
	const [saveState, setSaveState] = useState("");
	const [searchQuery, setSearchQuery] = useState("");
	const { setShowTaskDetail, setCurrentTask } = useTaskDetail();
	const [title, setTitle] = useState();
	const [properDate, setProperDate] = useState();
	const [showAssigneeDelete, setShowAssigneeDelete] = useState(false);
	const [showDateDelete, setShowDateDelete] = useState(false);
	const [showAssigneeForm, setShowAssigneeForm] = useState(false);
	const [showDateForm, setShowDateForm] = useState(false);
	const [description, setDescription] = useState();
	const [assignee, setAssignee] = useState(null);
	const [dueDate, setDueDate] = useState();
	const [comment, setComment] = useState("");
	const [commentOpen, setCommentOpen] = useState(false);
	const [serverDate, setServerDate] = useState();
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
	useEffect(() => {
		if (showDateForm) {
			document.addEventListener("mousedown", handleClickDate);
			return () => {
				document.removeEventListener("mousedown", handleClickDate);
			};
		}
	}, [showDateForm]);
	useEffect(() => {
		if (commentOpen) {
			document.addEventListener("mousedown", handleClickComment);
			return () => {
				document.removeEventListener("mousedown", handleClickComment);
			};
		}
	}, [commentOpen]);
	const handleClick = (e) => {
		if (assigneeDiv.current.contains(e.target)) {
			// inside click
			return;
		}
		setShowAssigneeForm(false);
		setShowAssigneeDelete(false);
		return;
	};
	const handleClickDate = (e) => {
		if (dateDiv.current.contains(e.target)) {
			// inside click
			return;
		}
		setShowDateForm(false);
		setShowDateDelete(false);
		return;
	};
	const handleClickComment = (e) => {
		if (commentDiv.current.contains(e.target)) {
			// inside click
			return;
		}
		setCommentOpen(false);
		return;
	};
	useEffect(() => {
		if (task) {
			didMount.current = false;
			setTitle(task.title);
			setDescription(task.description);
			if (task.assignee) {
				setAssignee(task.assignee);
			} else {
				setAssignee(null);
			}
			if (task.end_date) {
				setDueDate(task.end_date);
				const currentDate = new Date(task.plain_format_date);
				const adjustedDate = new Date(task.plain_format_date);
				adjustedDate.setDate(currentDate.getDate() + 1);
				setProperDate(adjustedDate);
				setServerDate(currentDate);
			} else {
				setDueDate(null);
				setServerDate(null);
				setProperDate(new Date());
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
			setComments(task.comments);
		}
	}, [task]);
	useEffect(() => {
		const delayDebounceFn = setTimeout(async () => {
			if (didMount.current) {
				const payload = {
					title: title,
					description: description,
					end_date:
						serverDate === "null" || serverDate === null
							? "null"
							: new Date(serverDate),
					assignee:
						assignee === "null" || assignee === null ? "null" : assignee.id,
					priority: priority,
					status: status,
				};

				const res = await dispatch(updateTask(task.id, payload));
				if (res) {
					await dispatch(getProject(projectId));
					res.json().then((data) => {
						setDueDate(data.end_date);
					});
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
	}, [title, description, serverDate, assignee, priority, status]);

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
	const submitComment = async() => {
		const res = await dispatch(addTaskComment(task.id, comment));
        if (res) {
					await dispatch(getProject(projectId));
					res.json().then((data) => {
						setComments(data.comments);
					});
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
								</button>{" "}
								<div style={{ marginLeft: "10px" }}>
									<p>{saveState}</p>
								</div>
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
							<div style={{ padding: "20px 20px 0px 20px" }}>
								<TextareaAutosize
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
														{assignee ? (
															<InitialsAvatar fullname={assignee.fullname} />
														) : (
															<BsPersonCircle size="1.5em" />
														)}
													</div>
													<input
														ref={assigneeInput}
														type="text"
														placeholder={assignee ? assignee.fullname : null}
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
																				setSearchQuery("");
																				setShowAssigneeForm(false);
																				setShowAssigneeDelete(false);
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
													onMouseEnter={() => setShowAssigneeDelete(true)}
													onMouseLeave={() => setShowAssigneeDelete(false)}
													onClick={() => setShowAssigneeForm(true)}
												>
													<div
														id="task-detail-assignee-icon"
														style={{ marginLeft: -1 }}
													>
														{assignee ? (
															<InitialsAvatar fullname={assignee.fullname} />
														) : (
															<BsPersonCircle size="1.5em" />
														)}
													</div>
													{assignee ? (
														<>
															{assignee.fullname}
															{showAssigneeDelete ? (
																<div
																	id="task-assignee-delete-button"
																	onClick={(e) => {
																		e.stopPropagation();
																		setAssignee(null);
																	}}
																>
																	<IoIosCloseCircle size="1.3em" />
																</div>
															) : null}
														</>
													) : (
														"No assignee"
													)}
												</div>
											</>
										)}
									</div>
								</div>
								<div className="task-detail-fields-row">
									<div id="task-detail-row-label">Due date</div>
									<div>
										{showDateForm ? (
											<div
												id="task-detail-date-open"
												ref={dateDiv}
												onMouseEnter={() => setShowDateDelete(true)}
												onMouseLeave={() => setShowDateDelete(false)}
												onClick={() => setShowDateForm(true)}
											>
												<div id="task-detail-assignee-icon">
													<BsCalendar size="1.4em" />
												</div>
												{dueDate ? dueDate : "No due date"}
												<div id="task-detail-date-calendar">
													<Calendar
														value={properDate}
														onChange={(date) => {
															setProperDate(date);
															setServerDate(date.toString());
														}}
													/>
												</div>
											</div>
										) : (
											<div
												id="task-detail-assignee"
												onMouseEnter={() => setShowDateDelete(true)}
												onMouseLeave={() => setShowDateDelete(false)}
												onClick={() => setShowDateForm(true)}
											>
												<div id="task-detail-assignee-icon">
													<BsCalendar size="1.4em" />
												</div>
												{dueDate ? (
													<>
														{dueDate}
														{showDateDelete ? (
															<div
																id="task-assignee-delete-button"
																onClick={(e) => {
																	e.stopPropagation();
																	setServerDate(null);
																	setProperDate(new Date());
																}}
															>
																<IoIosCloseCircle size="1.3em" />
															</div>
														) : null}
													</>
												) : (
													"No due date"
												)}
											</div>
										)}
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
									<TextareaAutosize
										id="description-textarea"
										type="text"
										placeholder="Add more detail to this task..."
										value={description}
										onChange={handleDescriptionChange}
									/>
								</div>
							</div>
							<div className="task-detail-comments-section">
								{comments
									? Object.keys(comments).map((key) => (
											<div id="task-detail-view-comment" key={comments[key].id}>
												<div>
													<InitialsAvatar
														className={`initials-avatar-medium`}
														fullname={comments[key].owner.fullname}
													/>
												</div>
												<div id="task-detail-inner-comment-content">
													<div id="task-detail-comment-info">
														<h3>{comments[key].owner.fullname}</h3>
                                                        {currentUser.id === comments[key].owner.id?<div id="comment-actions-button"><MdExpandMore /></div>:null}
													</div>
													<div id="task-detail-comment-text">
														<h4>{comments[key].comment}</h4>
													</div>
												</div>
											</div>
									  ))
									: null}
							</div>
						</div>
					</>
				) : null}
			</div>
			<div className="task-detail-comment-container">
				<div>
					<InitialsAvatar
						fullname={currentUser.fullname}
						className={`initials-avatar-medium`}
					/>
				</div>
				<div id="task-detail-comment-entry-row" ref={commentDiv}>
					<div
						id={
							commentOpen
								? "task-detail-comment-textarea-field"
								: "task-detail-comment-textarea-field-closed"
						}
					>
						<TextareaAutosize
							id="comment-textarea"
							type="text"
							minRows={commentOpen ? 3 : 1}
							onClick={() => setCommentOpen(true)}
							placeholder="Ask a question or post an update..."
							value={comment}
							onChange={(e) => setComment(e.target.value)}
						/>
					</div>
					{commentOpen ? (
						<div id="comment-toolbar">
							<button id="comment-submit-button" onClick={submitComment} disabled={comment === ""}>
								Comment
							</button>
						</div>
					) : null}
				</div>
			</div>
		</div>
	);
};

export default TaskDetail;
