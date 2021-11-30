import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Section from "./Section";
import TaskDetail from "./TaskDetail";
import { getProject } from "../../store/project";
import { useTaskDetail } from "../../context/TaskDetailContext";
import { updateSection } from "../../store/project";
import { DragDropContext } from "react-beautiful-dnd";
import "./ProjectPage.css";
const ProjectPage = () => {
	const { projectId } = useParams();
	const {
		showTaskDetail,
		currentTask,
		setShowTaskDetail,
		setCurrentTask,
		fromHome,
		setFromHome,
	} = useTaskDetail();
	const dispatch = useDispatch();
	const project = useSelector((state) => state.project);
	const [currentProject, setCurrentProject] = useState(project);
	const sections_order = currentProject.sections_order;
	const [sections, setSections] = useState(currentProject.sections);
	useEffect(() => {
		if (project) {
			setCurrentProject(project);
			setSections(project.sections);
		}
	}, [project, projectId]);
	useEffect(() => {
		if (projectId) {
			if (fromHome){
				setFromHome(false)
			} else {
			setShowTaskDetail(false);
			setCurrentTask("");
			}
		}
	}, [projectId]);
	const onDragEnd = async (result) => {
		const { destination, source, draggableId } = result;
		if (!destination) {
			return;
		}
		if (
			destination.droppableId === source.droppableId &&
			destination.index === source.index
		) {
			return;
		}

		const start = sections[source.droppableId];
		const end = sections[destination.droppableId];
		if (start === end) {
			const section = sections[source.droppableId];
			const newTasksOrder = Array.from(section.tasks_order);
			newTasksOrder.splice(source.index, 1);
			newTasksOrder.splice(destination.index, 0, parseInt(draggableId));

			const newSection = {
				...section,
				tasks_order: newTasksOrder,
			};
			const newSectionId = newSection.id;
			sections[newSectionId] = newSection;
			const newSectionsState = {
				...sections,
			};
			setSections(newSectionsState);
			await dispatch(updateSection(newSectionId, newSection));
			return;
		}

		const start_tasks_order = Array.from(start.tasks_order);
		start_tasks_order.splice(source.index, 1);
		const newStartSection = {
			...start,
			tasks_order: start_tasks_order,
		};
		const droppedTaskId = parseInt(draggableId);
		const droppedTask = newStartSection.tasks[droppedTaskId];
		delete newStartSection.tasks[droppedTaskId];
		const end_tasks_order = Array.from(end.tasks_order);
		end_tasks_order.splice(destination.index, 0, parseInt(draggableId));
		const newEndSection = {
			...end,
			tasks_order: end_tasks_order,
		};
		newEndSection.tasks[droppedTask.id] = droppedTask;

		const newStartSectionId = newStartSection.id;
		const newEndSectionId = newEndSection.id;
		sections[newStartSectionId] = newStartSection;
		sections[newEndSectionId] = newEndSection;
		const newSectionsState = {
			...sections,
		};
		
		setSections(newSectionsState);
		await dispatch(updateSection(newStartSectionId, newStartSection));
		await dispatch(
			updateSection(newEndSectionId, newEndSection, droppedTaskId)
		);
		await dispatch(getProject(projectId));
		if (showTaskDetail) {
		}
		return;
	};

	return (
		<div className="projectpage-main">
			<div className="projectpage-board">
				<div
					onClick={() => {
						setCurrentTask("");
						setShowTaskDetail(false);
					}}
					className={`projectpage-board-body ${
						showTaskDetail ? "projectpage-board-body-details-open" : null
					}`}
				>
					<DragDropContext onDragEnd={onDragEnd}>
						{sections_order.map((sectionId) => {
							const section = sections[sectionId[0]];
							const tasks = section.tasks_order.map(
								(taskId) => section.tasks[taskId]
							);

							return (
								<Section
									key={section.id}
									section={section}
									tasks={tasks}
									projectId={projectId}
								/>
							);
						})}
					</DragDropContext>
				</div>
				<TaskDetail
					show={showTaskDetail}
					task={currentTask}
					projectId={projectId}
				/>
			</div>
		</div>
	);
};

export default ProjectPage;
