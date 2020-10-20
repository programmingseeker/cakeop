// import GalleryToggle from './GalleryToggle';
import React from 'react'
import { Col, Card,Button} from 'react-bootstrap'

import ProductCard from './Product_Card/ProductCard'

function ProductCards({product}) {
  
  const returnArrayOfImg=(image)=>{
    const original = [...image] ;
    const newarray = original.map((img)=>{
      return (`/img/${img}`)
    });
    return newarray;
  };
    return (
      <Col sm>
          <ProductCard photos={returnArrayOfImg(product.images)} price={`₹${product.price}`} productName={product.name} description={product.theme} buttonText="Add To Cart" />
      </Col>
    );
}
export default ProductCards