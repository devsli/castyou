import React, { Component } from 'react'
import PropTypes from 'prop-types'
import DrawingObject from './DrawingObject'

import { elementOffset } from '../utils'

import * as style from './Canvas.module.css'

const preventDefault = e => e.preventDefault();

export default class Canvas extends Component {
	static propTypes: {
		onDragEnd: PropTypes.func,
	};

	dragEnd(event) {
		let dropped = JSON.parse(event.dataTransfer.getData('application/json'));
		let offset = elementOffset(this.refs.root);
		let payload = Object.assign(dropped, {
			x: event.clientX - offset.x,
			y: event.clientY - offset.y
		});

		if (payload.srcScreenX != null && payload.srcScreenY != null) {
			payload.dx = event.screenX - payload.srcScreenX;
			payload.dy = event.screenY - payload.srcScreenY;
		}

		this.props.onDragEnd(payload);
	}

	render() {
		let { objects } = this.props;
		return (
			<div
				ref='root'
				className={ `${style.canvas} is-overlay` }
				onDragEnter={ preventDefault }
				onDragOver={ preventDefault }
				onDrop={ this.dragEnd.bind(this) }
			>

				{ objects.map((obj) => (
					<DrawingObject
						object={ obj }
						key={ obj.id } />
				))}

			</div>
		)
	}
}
