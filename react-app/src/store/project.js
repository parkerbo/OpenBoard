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

export const updateSection = (sectionId, section) => async (dispatch) => {
	const response = await fetch(`/api/sections/${sectionId}`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(section),
	});

	if (response.ok) {
		dispatch(reRenderSection(section));
		return section;
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
            const newState = {...state}
			return newState
		default:
			return state;
	}
}
