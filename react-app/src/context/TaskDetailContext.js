import { createContext, useContext, useState } from "react";

export const TaskDetailContext = createContext();

export const useTaskDetail = () => useContext(TaskDetailContext);

export default function TaskDetailProvider({ children }) {
	const [showTaskDetail, setShowTaskDetail] = useState(false);
    const [currentTask, setCurrentTask] = useState(false);
	const [fromHome, setFromHome] = useState(false);

	return (
		<TaskDetailContext.Provider
			value={{
				showTaskDetail,
				setShowTaskDetail,
                currentTask,
                setCurrentTask,
				fromHome,
				setFromHome
			}}
		>
			{children}
		</TaskDetailContext.Provider>
	);
}
