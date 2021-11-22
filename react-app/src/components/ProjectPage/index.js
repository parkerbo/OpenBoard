import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Section from "./Section";
import { getProject } from "../../store/project";
import { updateSection } from "../../store/project";
import { DragDropContext } from "react-beautiful-dnd";
import "./ProjectPage.css";
const ProjectPage = () => {
    const {projectId} = useParams();
	const dispatch = useDispatch();
	const project = useSelector((state) => state.project);
    const [currentProject, setCurrentProject] = useState(project);
	const sections_order = currentProject.sections_order;
	const [sections, setSections] = useState(currentProject.sections);
   useEffect(() => {
       if(project){
        setCurrentProject(project)
       }
   }, [project, projectId])
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
        console.log(start)
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
            start_tasks_order.splice(source.index,1);
            const newStartSection = {
                ...start,
                tasks_order: start_tasks_order
            }
            const droppedTaskId = parseInt(draggableId);
           const droppedTask = newStartSection.tasks[droppedTaskId];
           // NEED TO UPDATE INDIVIUDAL TASK
           delete newStartSection.tasks[source.index]
            const end_tasks_order = Array.from(end.tasks_order);
            end_tasks_order.splice(destination.index, 0, parseInt(draggableId));
            const newEndSection = {
                ...end,
                tasks_order: end_tasks_order
            }
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
            await dispatch(updateSection(newEndSectionId, newEndSection, droppedTaskId));
            return;

	};

	return (
		<div className="projectpage-main">
			<div className="projectpage-board">
				<div className="projectpage-board-body">
					<DragDropContext onDragEnd={onDragEnd}>
						{sections_order.map((sectionId) => {
							const section = sections[sectionId[0]];
							const tasks = section.tasks_order.map(
								(taskId) => section.tasks[taskId]
							);

							return (
								<Section key={section.id} section={section} tasks={tasks} />
							);
						})}
					</DragDropContext>
				</div>
			</div>
		</div>
	);
};

export default ProjectPage;