const TaskList = (props) => {
    return (
			<div
				{...props.provided.droppableProps}
				ref={props.innerRef}
				className="board-section-tasks"
			>
				{props.children}
			</div>
		);
}

export default TaskList
