import "./Section.css";
import TaskList from "./TaskList"
import Task from "./Task";
import { FaPlus, FaEllipsisH } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { getProject, addTask } from "../../store/project";
import { useTaskDetail } from "../../context/TaskDetailContext";
import { Droppable } from "react-beautiful-dnd";
import { useEffect, useState } from "react";
const Section = ({section, tasks, projectId}) => {
    const dispatch = useDispatch();
    const {setShowTaskDetail, setCurrentTask} = useTaskDetail();
    const addTaskEnd = async(e) => {
        const newTask = await dispatch(addTask(section.id,'end'));
        await dispatch(getProject(projectId));
        setCurrentTask(newTask)
        setShowTaskDetail(true)
        setTimeout(() => {
            e.target.scrollIntoView({ behavior: "smooth" });
        }, 200)
    }
	return (
		<div className="board-section">
			<div className="board-section-title">
				<h3>{section.title}</h3>
				<FaPlus id="board-section-title-add-task" />
				<FaEllipsisH id="board-section-title-options" />
			</div>
			<Droppable droppableId={section.id.toString()}>
				{(provided) => (
					<TaskList innerRef={provided.innerRef} provided={provided}>
						{Object.keys(tasks).map((key, index) => (
							<Task key={tasks[key].id} task={tasks[key]} index={index} projectId={projectId}/>
						))}
						{provided.placeholder}
						<div onClick={addTaskEnd} id="section-add-task-button-lower"> + Add a task</div>
					</TaskList>
				)}
			</Droppable>
		</div>
	);
};

export default Section;
