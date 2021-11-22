import "./Task.css";
import Container from "./Container";
import { Draggable } from "react-beautiful-dnd";
const Task = ({ task, index }) => {
	return (
		<Draggable draggableId={task.id.toString()} index={index}>
			{(provided, snapshot) => (
				<Container>
					<div
						ref={provided.innerRef}
						{...provided.draggableProps}
						{...provided.dragHandleProps}
						className={`task-card ${snapshot.isDragging?'task-dragging':null}`}
					>
						<h3>{task.title}</h3>
						<h4>{task.description}</h4>
					</div>
				</Container>
			)}
		</Draggable>
	);
};

export default Task;