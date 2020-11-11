// import GalleryToggle from './GalleryToggle';
import React from 'react';
import { Col } from 'react-bootstrap';

import ProductCard from './Product_Card/ProductCard';

function ProductCards({ history, product }) {
	const returnArrayOfImg = (image) => {
		const original = [...image];
		const newarray = original.map((img) => {
			return `/img/cakes/${img}`;
		});
		return newarray;
	};
	return (
		<Col sm>
			<ProductCard
				photos={returnArrayOfImg(product.images)}
				price={`₹${product.price}`}
				productName={product.name}
				description={product.theme}
				id={product._id}
				buttonText='Add To Cart'
			/>
		</Col>
	);
}
export default ProductCards;
