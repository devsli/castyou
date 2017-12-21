import { combineReducers } from 'redux'

import activeBoard from './activeBoard'
import boards from './boards'

export default combineReducers({
	activeBoard,
	boards
})
