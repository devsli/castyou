import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Columns, Column } from 'bulma-react'

import { createObject, moveObject } from '../actions'
import { BoardTabs, Canvas, Controls } from '../components'

class App extends Component {
	onDragEnd(e) {
		this.props.onDragEnd(this.props.activeBoard, e);
	}

	render() {
		let { boards, activeBoard, onOpen } = this.props;
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
								onDragEnd={ this.onDragEnd.bind(this) }
							/>
						</Column>
					</Columns>
				</div>
			</div>
		)
	}
}

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

export default connect(mapStateToProps, mapDispatchToProps)(App)
