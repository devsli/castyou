import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { AppContainer } from 'react-hot-loader'

import App from './containers/App'
import configureStore from './store/configureStore'

import "bulma/css/bulma.css"

const store = configureStore();

const renderer = (App) => render(
	<AppContainer>
		<Provider store={store}>
			<App />
		</Provider>
	</AppContainer>,
	document.getElementById('root')
);

renderer(App);
if (module.hot) {
	module.hot.accept('./containers/App', () => (
		renderer(require('./containers/App').default)
	));
}
