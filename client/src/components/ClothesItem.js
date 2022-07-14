import React from 'react'
import { Card, Col } from 'react-bootstrap'
import Image from 'react-bootstrap/Image'
import star from '../assets/star.png'
import { useHistory } from 'react-router-dom'
import { CLOTHES_ROUTE } from '../utils/consts'

const ClothesItem = ({ clothes }) => {
	const history = useHistory()
	return (
		<Col
			md={3}
			className={'mt-3'}
			onClick={() => history.push(CLOTHES_ROUTE + '/' + clothes.id)}
		>
			<Card style={{ width: 150, cursor: 'pointer' }} border={'light'}>
				<Image
					width={150}
					height={150}
					src={process.env.REACT_APP_API_URL + clothes.img}
				/>
				<div className='text-black-50 mt-1 d-flex justify-content-between align-items-center'>
					<div>Prada...</div>
					<div className='d-flex align-items-center'>
						<div>{clothes.rating}</div>
						<Image width={18} height={18} src={star} />
					</div>
				</div>
				<div>{clothes.name}</div>
			</Card>
		</Col>
	)
}

export default ClothesItem
