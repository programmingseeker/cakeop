// import GalleryToggle from './GalleryToggle';
import React from 'react'
import { Col, Card} from 'react-bootstrap'

function ProductCard({product}) {
    return (
      <Col sm>
        <Card className='p-2 rounded-lg mt-2'>
          <Card.Img variant="top" src="/img/product-img-1.png" alt="..." />
          <Card.Body>
            <Card.Title>{product.name}</Card.Title>
            <Card.Text>{product.theme}</Card.Text>
            <h3>{`₹ ${product.price}`}</h3>
          </Card.Body>
        </Card>
      </Col>
    );
}
export default ProductCard