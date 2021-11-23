import "./Task.css";
import Container from "./Container";
import { MdCheckCircleOutline } from "react-icons/md";
import { useTaskDetail } from "../../context/TaskDetailContext";
import { Draggable } from "react-beautiful-dnd";
import { useRef, useState , useEffect} from "react";
const Task = ({task, index}) => {
    const taskRef = useRef();
    const [active, setActive] = useState(false);
    const {setShowTaskDetail, currentTask, setCurrentTask} = useTaskDetail();
    useEffect(() => {
			// add when mounted
			document.addEventListener("mousedown", handleClick);
			// return function to be called when unmounted
			return () => {
				document.removeEventListener("mousedown", handleClick);
			};
		}, []);

		const handleClick = (e) => {
			if (taskRef.current.contains(e.target)) {
				// inside click
				return setActive(true);
			}
			return setActive(false);

		};
        useEffect(() => {
            if (currentTask.id === task.id && currentTask.section_id !== task.section_id){
                setCurrentTask(task)
            }
        }, [task])
    const openTaskDetails = (e) => {
        setActive(true)
        setShowTaskDetail(true);
        setCurrentTask(task);
        setTimeout(() => {
            e.target.scrollIntoView({behavior:'smooth'});

        }, 200)

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
						}`}
					>
						<div ref={taskRef}>
							<div className="task-card-title">
								<div id="task-card-check-mark">
									<MdCheckCircleOutline size="1.2em" />
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
