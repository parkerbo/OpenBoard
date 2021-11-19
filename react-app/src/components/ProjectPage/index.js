import { useSelector, useDispatch } from "react-redux"
import { useState } from "react";
import Section from "./Section";
import { updateSection } from "../../store/project";
import {DragDropContext} from 'react-beautiful-dnd'
import "./ProjectPage.css"
const ProjectPage = () => {
    const dispatch = useDispatch();
    const project = useSelector((state) => state.project);
    const sections_order = project.sections_order
    const [sections, setSections] = useState(project.sections)
    const onDragEnd = async(result) => {
      const {destination, source, draggableId} = result;
      if (!destination){
          return;
      }
      if (destination.droppableId === source.droppableId &&
        destination.index === source.index){
            return;
        }
        if (destination.droppableId === source.droppableId){
        const section = sections[source.droppableId]
        const newTasksOrder = Array.from(section.tasks_order);
        newTasksOrder.splice(source.index, 1);
        newTasksOrder.splice(destination.index, 0, parseInt(draggableId))

        const newSection = {
            ...section,
            tasks_order: newTasksOrder
        }
        const newSectionId = newSection.id;
        sections[newSectionId] = newSection;
        const newSectionsState = {
            ...sections
        }
        setSections(newSectionsState);
        await dispatch(updateSection(newSectionId, newSection))
    }
    }
    return (
        <div className="projectpage-main">
            <div className="projectpage-board">
                <div className="projectpage-board-body">
        <DragDropContext onDragEnd={onDragEnd}>
        {sections_order.map(sectionId => {
            const section = sections[sectionId[0]];
            const tasks = section.tasks_order.map(taskId => section.tasks[taskId])

            return <Section key={section.id} section={section} tasks={tasks} />;
        })}
        </DragDropContext>
                </div>
            </div>
        </div>
    )
}

export default ProjectPage
