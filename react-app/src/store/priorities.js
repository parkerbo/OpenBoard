const LOAD_PRIORITIES = 'priorities/LOAD_PRIORITIES'

const loadPriorities = (priorities) => ({
	type: LOAD_PRIORITIES,
	payload: priorities,
});


const initialState = { priorities: " " };

export const getPriorities = () => async (dispatch) => {
	const response = await fetch(`/api/users/priorities`);

	if (response.ok) {
		const data = await response.json();
		dispatch(loadPriorities(data));
		return data;
	} else {
		return response;
	}
};

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case LOAD_PRIORITIES:
			return action.payload;
		default:
			return state;
	}
}
