import React from 'react';
import { Link } from 'react-router-dom';
const ProductCardDescription = ({
  productName,
  description,
  buttonText,
  rating,
  url,
  id
}) => {

  const renderButton = () => {
    if (buttonText) {
      return (
        <div className="row">
          <a className="buy-button" href={url}>
            {buttonText}
          </a>
        </div>
      );
    } else {
      return null;
    }
  };
  return (
    <>
    <div className="product-card-description-box">
        <Link to={`/cakes/${id}`} className="product-card-name" style={{ textDecoration:'none'}}>
          {productName}
        </Link>
      <p className="product-card-description">{description}</p>
      {renderButton()}
    </div>
    </>
  );
};

export default ProductCardDescription;
