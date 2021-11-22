import "./Task.css";
import Container from "./Container";
import { MdCheckCircleOutline } from "react-icons/md";
import { useTaskDetail } from "../../context/TaskDetailContext";
import { Draggable } from "react-beautiful-dnd";
const Task = ({ task, index }) => {
    const {setShowTaskDetail, setCurrentTask} = useTaskDetail();
    const openTaskDetails = () => {
        setShowTaskDetail(true);
        setCurrentTask(task)
    }
	return (
		<Draggable draggableId={task.id.toString()} index={index}>
			{(provided, snapshot) => (
				<Container>
					<div
                        onClick={openTaskDetails}
						ref={provided.innerRef}
						{...provided.draggableProps}
						{...provided.dragHandleProps}
						className={`task-card ${
							snapshot.isDragging ? "task-dragging" : "task-drag-null"
						}`}
					>
						{" "}
						<div className="task-card-title">
							<div id="task-card-check-mark">
								<MdCheckCircleOutline size="1.2em" />
							</div>
							<h3>{task.title}</h3>
						</div>
						<div className="task-card-indicators">
							{task.priority ? (
								<div
									className="task-card-indicator"
									id={`priority-${task.priority}`}
								>
									{task.priority}
								</div>
							) : null}
							{task.status ? (
								<div className={`task-card-indicator status-${task.status}`}>
									{task.status}
								</div>
							) : null}
						</div>
					</div>
				</Container>
			)}
		</Draggable>
	);
};

export default Task;
