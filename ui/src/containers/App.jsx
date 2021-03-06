import React, { Component } from 'react'
import {
	BrowserRouter as Router,
	Route,
	Link
} from 'react-router-dom'

import Home from './Home';
import DrawingPad from './DrawingPad';

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
	render() {
		const router = (
			<Router>
				<div>
					<Route exact path="/" component={Home}/>
					<Route path="/topics" component={Topics}/>
					<Route path="/invar" component={DrawingPad}/>
				</div>
			</Router>
		);

		return (
			<div>
				<section className="hero is-primary">
					<div className="hero-body">
						<div className="container">
							<h1 className="title">
								Cast you!
							</h1>
							<p className="subtitle">
								Podcast server for lazy people
							</p>
						</div>
					</div>
				</section>

				<section className="section">
					<div className="container">
						{ router }
					</div>
				</section>
			</div>
		)
	}
}

export default App;
