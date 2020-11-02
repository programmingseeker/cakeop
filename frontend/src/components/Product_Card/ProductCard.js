import React from 'react';
import PropTypes from 'prop-types';

import './css/styles.css';
import ProductCardDescription from './ProductCardDescription';
import ProductCardGallery from './ProductCardGallery';
import PriceTag from './PriceTag';


class ProductCard extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    let {
      photos,
      price,
      productName,
      description,
      buttonText,
      url,
      id,
      history
    } = this.props;
    return (
      <div className="product-card float card">
        <ProductCardGallery photos={photos} />
        <PriceTag price={price} />
        <ProductCardDescription
          productName={productName}
          description={description}
          buttonText={buttonText}
          url={url}
          id={id}
        />
      </div>
    );
  }
}

// ProductCard.propTypes = {
//   photos: PropTypes.arrayOf(PropTypes.string),
//   price: PropTypes.string,
//   productName: PropTypes.string,
//   description: PropTypes.string,
//   buttonText: PropTypes.string,
//   url: PropTypes.string
// };

export default ProductCard;
