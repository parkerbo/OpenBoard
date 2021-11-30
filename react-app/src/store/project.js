// constants
const LOAD_PROJECT = "project/LOAD_PROJECT";
const UPDATE_PROJECT_SECTION = "project/UPDATE_PROJECT_SECTION";

const loadProject = (project) => ({
	type: LOAD_PROJECT,
	payload: project,
});
const reRenderSection = (section) => ({
	type: UPDATE_PROJECT_SECTION,
	payload: section,
});

const initialState = { project: " " };
// PROJECT THUNKS
export const createProject = (payload) => async (dispatch) => {
	const response = await fetch(`/api/projects/`, {
        method: 'POST',
		headers: {
			"Content-Type": "application/json",
		},
        body: JSON.stringify(payload)
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(loadProject(data));
		return data;
	} else {
		return response;
	}
};


export const getProject = (projectId) => async (dispatch) => {
	const response = await fetch(`/api/projects/${projectId}`, {
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(loadProject(data));
		return data;
	} else {
		return response;
	}
};
export const saveProject = (payload) => async (dispatch) => {
	const response = await fetch(`/api/projects/edit`, {
        method:"POST",
		headers: {
			"Content-Type": "application/json",
		},
        body: JSON.stringify(payload)
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(loadProject(data));
		return data;
	} else {
		return response;
	}
};

export const deleteProject = (projectId) => async (dispatch) => {

	const response = await fetch(`/api/projects/${projectId}/delete`, {
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (response.ok) {
		const data = await response.json();
		return data;
	} else {
		return response;
	}
};

// TASK THUNKS
export const deleteTask = (sectionId, taskId) => async (dispatch) => {
    
    const data = {
        'sectionId' : sectionId
    }
	const response = await fetch(`/api/tasks/${taskId}/delete`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
        body: JSON.stringify(data)
	});

	if (response.ok) {
		const data = await response.json();
		return data;
	} else {
		return response;
	}
};
export const addTask = (sectionId, position) => async (dispatch) => {
	const data = {
		"sectionId": sectionId,
        "position": position
	};
	const response = await fetch(`/api/tasks/`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	});

	if (response.ok) {
		const data = await response.json();
		return data;
	} else {
		return response;
	}
};

export const updateSection =
	(sectionId, newSection, taskId) => async (dispatch) => {
		let data;
		if (taskId) {
			data = {
				newSection: newSection,
				taskId: taskId,
			};
		} else {
		data = {
			newSection: newSection,
			taskId: "None",
		};
    }
		const response = await fetch(`/api/sections/${sectionId}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});

		if (response.ok) {
			dispatch(reRenderSection(newSection));
			return newSection;
		} else {
			return response;
		}
	};

export const toggleCompleteTask = (taskId) => async (dispatch) => {
	const response = await fetch(`/api/tasks/${taskId}/complete`, {
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (response.ok) {
		return response.json();
	} else {
		return response;
	}
};

export const updateTask =
	(taskId, task) => async (dispatch) => {

		const response = await fetch(`/api/tasks/${taskId}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(task),
		});

		if (response.ok) {
			return response;
		} else {
			return response;
		}
	};

export const getTask = (taskId) => async (dispatch) => {
	const response = await fetch(`/api/tasks/${taskId}`);

	if (response.ok) {
		return response;
	} else {
		return response;
	}
};

export const addTaskComment = (taskId, comment) => async (dispatch) => {
    const data = {
        'commentText': comment
    }
	const response = await fetch(`/api/tasks/${taskId}/comment`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	});

	if (response.ok) {
		return response;
	} else {
		return response;
	}
};
export const updateTaskComment = (commentId, newComment) => async (dispatch) => {
	const data = {
		'newComment': newComment,
	};
	const response = await fetch(`/api/comments/${commentId}`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	});

	if (response.ok) {
		return response;
	} else {
		return response;
	}
};
export const deleteComment =
	(commentId) => async (dispatch) => {
		const response = await fetch(`/api/comments/${commentId}/delete`);

		if (response.ok) {
			return response;
		} else {
			return response;
		}
	};

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case LOAD_PROJECT:
			return action.payload;
		case UPDATE_PROJECT_SECTION:
			const sectionId = action.payload.id;
			state[sectionId] = action.payload;
			const newState = { ...state };
			return newState;
		default:
			return state;
	}
}
