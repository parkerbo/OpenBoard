const TaskList = (props) => {
    return (
			<div
				{...props.provided.droppableProps}
				ref={props.innerRef}
				className="board-section-tasks"
			>
				{props.children}
				<div> + Add a task</div>
			</div>
		);
}

export default TaskList
