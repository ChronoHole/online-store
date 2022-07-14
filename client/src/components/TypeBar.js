import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { Context } from '../index'
import ListGroup from 'react-bootstrap/ListGroup'

const TypeBar = observer(() => {
	const { clothes } = useContext(Context)
	return (
		<ListGroup>
			{clothes.types.map(type => (
				<ListGroup.Item
					style={{ cursor: 'pointer' }}
					active={type.id === clothes.selectedType.id}
					onClick={() => clothes.setSelectedType(type)}
					key={type.id}
				>
					{type.name}
				</ListGroup.Item>
			))}
		</ListGroup>
	)
})

export default TypeBar
