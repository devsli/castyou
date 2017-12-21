import React from 'react';
import PropTypes from 'prop-types';
import { Columns, Column } from 'bulma-react';
import { connect } from 'react-redux';

import { BoardTabs, Canvas, Controls } from '.';
import {createObject, moveObject} from "../actions";


const DrawingPad = ({ onDragEnd, boards, activeBoard, onOpen }) => {
	let board = boards.filter(({ id }) => id === activeBoard).pop();
	const onDragEndHandler = (e) => {
		onDragEnd(activeBoard, e);
	};

	return (
		<div className='hero is-fullheight'>
			<div className='hero-head'>
				<BoardTabs
					boards={ boards }
					active={ activeBoard }
					onOpen={ onOpen }
				/>
			</div>

			<div className='hero-body' style={{position: 'relative'}}>
				<Columns is-overlay>
					<Column is-narrow style={{ width: '3rem' }}>
						<Controls />
					</Column>
					<Column style={{position: 'relative'}}>
						<Canvas
							objects={ board.objects }
							onDragEnd={ onDragEndHandler }
						/>
					</Column>
				</Columns>
			</div>
		</div>
	);
};

const mapStateToProps = (state) => ({
	activeBoard: state.activeBoard,
	boards: state.boards
});

const mapDispatchToProps = (dispatch) => ({
	onDragEnd: (boardId, data) => {
		switch (data.dropType) {
			case 'create':
				dispatch(createObject(boardId, data));
				break;

			case 'move':
				dispatch(moveObject(data));
				break;

			default:
				console.log(data);
		}
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(DrawingPad);
