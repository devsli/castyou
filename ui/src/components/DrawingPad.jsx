import React from 'react';
import PropTypes from 'prop-types';
import { Columns, Column } from 'bulma-react'
import { BoardTabs, Canvas, Controls } from '.'
import {createObject, moveObject} from "../actions";

const DrawingPad = ({ onDragEnd, boards, activeBoard, onOpen }) => {
	let board = boards.filter(({ id }) => id === activeBoard).pop();

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
							onDragEnd={ onDragEnd }
						/>
					</Column>
				</Columns>
			</div>
		</div>
	);
};

export default DrawingPad;
