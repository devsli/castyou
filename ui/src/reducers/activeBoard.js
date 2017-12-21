import { OPEN_BOARD } from '../constants'

const initialState = 1;

export default (state = initialState, action) => {
	switch (action.type) {
		case OPEN_BOARD:
			return action.id;

		default:
			return state;
	}
}
