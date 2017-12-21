import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
	BrowserRouter as Router,
	Route,
	Link
} from 'react-router-dom'

import { createObject, moveObject } from '../actions'
import { DrawingPad } from '../components'


const Home = () => (
	<div>
		<h2>Home</h2>
	</div>
);

const About = () => (
	<div>
		<h2>About</h2>
	</div>
);

const Topic = ({ match }) => (
	<div>
		<h3>{match.params.topicId}</h3>
	</div>
);

const Topics = ({ match }) => (
	<div>
		<h2>Topics</h2>
		<ul>
			<li>
				<Link to={`${match.url}/rendering`}>
					Rendering with React
				</Link>
			</li>
			<li>
				<Link to={`${match.url}/components`}>
					Components
				</Link>
			</li>
			<li>
				<Link to={`${match.url}/props-v-state`}>
					Props v. State
				</Link>
			</li>
		</ul>

		<Route path={`${match.url}/:topicId`} component={Topic}/>
		<Route exact path={match.url} render={() => (
			<h3>Please select a topic.</h3>
		)}/>
	</div>
);

class App extends Component {
	onDragEnd(e) {
		this.props.onDragEnd(this.props.activeBoard, e);
	}

	render() {
		let { boards, activeBoard, onOpen } = this.props;
		return (
			<Router>
				<div>
					<Route exact path="/" component={Home}/>
					<Route path="/about" component={About}/>
					<Route path="/topics" component={Topics}/>
					<Route path="/invar" component={() => (
						<DrawingPad
							onDragEnd={ this.onDragEnd.bind(this) }
							boards={ boards }
							activeBoard={ activeBoard }
							onOpen={ onOpen }
						/>
					)}/>
				</div>
			</Router>
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
