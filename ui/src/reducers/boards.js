import { MOVE_OBJECT, CREATE_OBJECT } from '../constants'

const initialState = [
	{
		id: 1,
		objects: []
	},
	{
		id: 2,
		objects: []
	},
	{
		id: 3,
		objects: []
	},
];

const objects = (state, action) => {
	switch (action.type) {
		case MOVE_OBJECT:
			if (state.id !== action.payload.id) {
				return state;
			}

			return Object.assign({}, state, {
				x: state.x + action.payload.dx,
				y: state.y + action.payload.dy
			});

		default:
			return state;
	}
};

const board = (state, action) => {
	if ( action.boardId && state.id !== action.boardId ) {
		return state;
	}

	switch (action.type) {
		case MOVE_OBJECT:
			return Object.assign({}, state, {
				objects: state.objects.map(o => objects(o, action))
			});

		case CREATE_OBJECT:
			return Object.assign({}, state, {
				objects: [ ...state.objects, action.payload ]
			});

		default:
			return state;
	}
};

export default (state = initialState, action) => {
	switch (action.type) {
		case CREATE_OBJECT:
		case MOVE_OBJECT:
			return state.map(b => board(b, action));

		default:
			return state;
	}
}
