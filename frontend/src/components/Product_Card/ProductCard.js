import React from 'react';
import PropTypes from 'prop-types';
import styles from './css/styles.css';
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
      url
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
        />
      </div>
    );
  }
}

ProductCard.propTypes = {
  photos: PropTypes.arrayOf(PropTypes.string),
  price: PropTypes.number,
  productName: PropTypes.string,
  description: PropTypes.string,
  buttonText: PropTypes.string,
  url: PropTypes.string
};

export default ProductCard;
