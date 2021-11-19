// constants
const SET_USER = 'session/SET_USER';
const UPDATE_NOTEPAD = "session/UPDATE_NOTEPAD";
const REMOVE_USER = 'session/REMOVE_USER';

const setUser = (user) => ({
  type: SET_USER,
  payload: user
});

const removeUser = () => ({
  type: REMOVE_USER,
})

const updateNotepad = (notepad) => ({
    type: UPDATE_NOTEPAD,
    payload: notepad
});

const initialState = { user: null, notepad: {content: "" }};

export const getNotepad = () => async (dispatch) => {
	const response = await fetch("/api/users/notepad", {
		headers: {
			"Content-Type": "application/json",
		},
	});
	if (response.ok) {
		const data = await response.json();
    dispatch(updateNotepad(data));
		return data;
	}
};

export const saveNotepad = (notepad) => async (dispatch) => {
	const response = await fetch(`/api/users/notepad/${notepad.userId}`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(notepad),
	});

	if (response.ok) {
		dispatch(updateNotepad(notepad.notepad));
		return notepad.notepad;
	} else {
    return response
  }
};

export const authenticate = () => async (dispatch) => {
  const response = await fetch('/api/auth/', {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return;
    }

    dispatch(setUser(data));
  }
}

export const login = (email, password) => async (dispatch) => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email,
      password
    })
  });


  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data))
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.']
  }

}

export const logout = () => async (dispatch) => {
  const response = await fetch('/api/auth/logout', {
    headers: {
      'Content-Type': 'application/json',
    }
  });

  if (response.ok) {
    dispatch(removeUser());
  }
};


export const signUp = (fullname, email, password) => async (dispatch) => {
  const response = await fetch('/api/auth/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      fullname,
      email,
      password,
    }),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data))
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.']
  }
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
		case SET_USER:
			return { user: action.payload, notepad: "" };
		case REMOVE_USER:
			return { user: null };
		case UPDATE_NOTEPAD:
			return { ...state, notepad: action.payload };
		default:
			return state;
	}
}
