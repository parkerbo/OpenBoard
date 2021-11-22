import "./TaskDetail.css"

const TaskDetail = ({show, task}) => {
    const divShowStatus = show?'inherit':'none';

    return (
        <div className={`task-detail-overlay ${show?'task-detail-overlay-open': null}`}
       >
            <div className='task-detail-inner-content'>
            {task?(
                <div>
                    {task.title}
                    {task.description}
                </div>
            ):null}
            </div>
        </div>

    )
}

export default TaskDetail
