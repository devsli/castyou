import React from 'react'
import { Tabs, Tab } from 'bulma-react'

export default ({ boards, active, onOpen }) => (
	<Tabs>
		{ boards.map(({ id }) => (
			<Tab key={ id } is-active={ id === active }>
				<a onClick={ () => onOpen(id) }>Доска { id }</a>
			</Tab>
		))}
	</Tabs>
)
