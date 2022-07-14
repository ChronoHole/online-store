import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { Context } from '../index'
import { Row } from 'react-bootstrap'
import ClothesItem from './ClothesItem'

const ClothesList = observer(() => {
	const { clothes } = useContext(Context)

	return (
		<Row className='d-flex'>
			{clothes.clothes.map(clothes => (
				<ClothesItem key={clothes.id} clothes={clothes} />
			))}
		</Row>
	)
})

export default ClothesList
