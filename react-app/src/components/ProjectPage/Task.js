import "./Task.css";
import Container from "./Container";
import {BsCheckCircle, BsFillCheckCircleFill} from 'react-icons/bs'
import { useTaskDetail } from "../../context/TaskDetailContext";
import { Draggable } from "react-beautiful-dnd";
import { toggleCompleteTask, getProject} from "../../store/project";
import { useDispatch } from "react-redux";
import { useRef, useState , useEffect} from "react";
const Task = ({task, index, projectId}) => {
    const dispatch = useDispatch();
    const taskRef = useRef();
    const [active, setActive] = useState(false);
    const {setShowTaskDetail, currentTask, setCurrentTask} = useTaskDetail();


        useEffect(() => {
            if(currentTask.id === task.id){
                return setActive(true)
            }
            return setActive(false)
        },[currentTask])
        useEffect(() => {
            if (currentTask.id === task.id && currentTask.section_id !== task.section_id){
                setCurrentTask(task);
            }
            if (currentTask.id === task.id && currentTask.completed !== task.completed){
                setCurrentTask(task);
            }
        }, [task])
    const openTaskDetails = (e) => {
        e.stopPropagation();
        setShowTaskDetail(true);
        setCurrentTask(task);
        setTimeout(() => {
            e.target.scrollIntoView({behavior:'smooth'});

        }, 200)

    }

    const toggleCompleted = async(e) => {
        e.stopPropagation();
        e.preventDefault()
        const res = await dispatch(toggleCompleteTask(task.id))
        if (res){
            await dispatch(getProject(projectId))
        }
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
						className={`${active ? "task-card-active" : "task-card"} ${
							snapshot.isDragging ? "task-dragging" : "task-drag-null"
						} ${task.completed ? "task-completed" : null}`}
					>
						<div style={{height:"100%"}}ref={taskRef}>
							<div className="task-card-title">
								<div
									id={`${task.completed ? "task-card-check-mark-completed" : "task-card-check-mark"}`}
									onClick={toggleCompleted}
								>
									{task.completed ? (
										<BsFillCheckCircleFill />
									) : (
										<BsCheckCircle />
									)}
								</div>
								<h3>{task.title}</h3>
							</div>
							<div className="task-card-indicators">
								{task.priority !== "null" ? (
									<div
										className="task-card-indicator"
										id={`priority-${task.priority}`}
									>
										{task.priority}
									</div>
								) : null}
								{task.status !== "null" ? (
									<div className={`task-card-indicator status-${task.status}`}>
										{task.status}
									</div>
								) : null}
							</div>
						</div>
					</div>
				</Container>
			)}
		</Draggable>
	);
};

export default Task;
