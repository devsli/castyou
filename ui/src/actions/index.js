import { OPEN_BOARD, MOVE_OBJECT, CREATE_OBJECT } from '../constants'

let nextObjectId = 0;
export const createObject = (boardId, data) => ({
	type: CREATE_OBJECT,
	boardId,
	payload: Object.assign({
		id: nextObjectId++,
		color: rndColor()
	}, data)
});

export const moveObject = (data) => ({
	type: MOVE_OBJECT,
	payload: data
});

export const openBoard = (id) => ({
	type: OPEN_BOARD,
	id
});

let rndColor = () => `rgb(${rnd(255)}, ${rnd(255)}, ${rnd(255)})`;
let rnd = (max) => Math.round(max * Math.random());
