import "./Section.css";
import TaskList from "./TaskList"
import Task from "./Task";
import { Droppable } from "react-beautiful-dnd";
const Section = ({ section, tasks }) => {
	return (
		<div className="board-section">
			<div className="board-section-title">
				<h3>{section.title}</h3>
			</div>
			<Droppable droppableId={section.id.toString()}>
				{provided => (
					<TaskList
                    innerRef={provided.innerRef}
                    provided ={provided}>
						{Object.keys(tasks).map((key, index) => (
							<Task key={tasks[key].id} task={tasks[key]} index={index} />
						))}
                        {provided.placeholder}
					</TaskList>
				)}
			</Droppable>
		</div>
	);
};

export default Section;
