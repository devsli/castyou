import React, { Component } from 'react'

export default class Controls extends Component {
	dragStart(type, event) {
		event.dataTransfer.setData('application/json', JSON.stringify({
			dropType: 'create',
			shape: type
		}));
	}

	renderButton(type, icon) {
		return (
			<span
				className="icon is-large"
				draggable={ true }
				onDragStart={ this.dragStart.bind(this, type) }
			>
				<i className={ `fa fa-${icon}` } />
			</span>
		)
	}

	render() {
		return (
			<div>
				{ this.renderButton('circle', 'circle') }
				{ this.renderButton('square', 'square') }
			</div>
		)
	}
}
