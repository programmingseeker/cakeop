import React, { useState } from 'react';
import { Row, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from './../../actions/cartActions';
const ProductCardDescription = ({
	productName,
	description,
	buttonText,
	rating,
	url,
	id,
}) => {
	const [btnText, setBtnText] = useState(buttonText);
	const dispatch = useDispatch();
	const addToCartHandler = () => {
		dispatch(addToCart(id, 1));
		setBtnText('Added to Cart');
	};
	const renderButton = () => {
		if (btnText) {
			return (
				<Row>
					<Button className='buy-button' onClick={addToCartHandler}>
						{btnText}
					</Button>
				</Row>
			);
		} else {
			return null;
		}
	};
	return (
		<>
			<div className='product-card-description-box'>
				<Link
					to={`/cakes/${id}`}
					className='product-card-name'
					style={{ textDecoration: 'none' }}
				>
					{productName}
				</Link>
				<p className='product-card-description'>{description}</p>
				{renderButton()}
			</div>
		</>
	);
};

export default ProductCardDescription;
