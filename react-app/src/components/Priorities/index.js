import "./Priorities.css";
import { useState } from "react";
import { useSelector } from "react-redux";
const Priorities = () => {
	const [upcoming, setUpcoming] = useState(true);
	const [overdue, setOverdue] = useState(false);
	const [completed, setCompleted] = useState(false);

	const priorities = useSelector((state) => state.priorities);
	const upcomingTasks = priorities.upcoming;
	const overdueTasks = priorities.overdue;
	const completedTasks = priorities.completed;
	return (
		<div className="homepage-widget-half">
			<div className="homepage-widget-content">
				<div className="priorities-topbar">
					<h2 id="priorities-notepad-widget-title">My Priorities</h2>
					<div className="priorities-nav">
						<div
							id={
								upcoming ? "priorities-nav-item-active" : "priorities-nav-item"
							}
							onClick={() => {
								setUpcoming(true);
								setOverdue(false);
								setCompleted(false);
							}}
						>
							Upcoming
						</div>
						<div
							id={
								overdue ? "priorities-nav-item-active" : "priorities-nav-item"
							}
							onClick={() => {
								setUpcoming(false);
								setOverdue(true);
								setCompleted(false);
							}}
						>
							Overdue
						</div>
						<div
							id={
								completed ? "priorities-nav-item-active" : "priorities-nav-item"
							}
							onClick={() => {
								setUpcoming(false);
								setOverdue(false);
								setCompleted(true);
							}}
						>
							Completed
						</div>
					</div>
				</div>
				<div className="priorities-list">
					{upcomingTasks && upcoming
						? Object.keys(upcomingTasks).map((key) => (
								<div key={upcomingTasks[key].id} id="priority-task-item">
									<div id="priority-task-title">{upcomingTasks[key].title}</div>
								</div>
						  ))
						: null}
					{overdueTasks && overdue
						? Object.keys(overdueTasks).map((key) => (
								<div key={overdueTasks[key].id} id="priority-task-item">
									<div id="priority-task-title">{overdueTasks[key].title}</div>
								</div>
						  ))
						: null}
					{completedTasks && completed
						? Object.keys(completedTasks).map((key) => (
								<div key={completedTasks[key].id} id="priority-task-item">
									<div id="priority-task-title">
										{completedTasks[key].title}
									</div>
								</div>
						  ))
						: null}
				</div>
			</div>
		</div>
	);
};

export default Priorities;
