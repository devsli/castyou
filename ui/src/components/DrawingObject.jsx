import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './DrawingObject.module.css'

export default class DrawingObject extends Component {
	static propTypes: {
		onDragEnd: PropTypes.func,
	};

	dragStart(event) {
		event.dataTransfer.setData('application/json', JSON.stringify({
			dropType: 'move',
			id: this.props.object.id,
			srcScreenX: event.screenX,
			srcScreenY: event.screenY
		}));
	}

	render() {
		let { object } = this.props;
		return (
			<div
				draggable={ true }
				onDragStart={ this.dragStart.bind(this) }

				className={`object ${object.shape}`}
				style={{
					left: object.x,
					top: object.y,
					backgroundColor: object.color
				}}>
				&nbsp;
			</div>
		)
	}
}
