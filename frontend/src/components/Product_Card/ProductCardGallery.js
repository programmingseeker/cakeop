import React from 'react';

import GalleryToggle from './GalleryToggle';


class ProductCardGallery extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      activeItem: 0
    };
  }
  
  rotateRight() {
    let n = this.props.photos.length;
    
    this.setState({
      activeItem: (((this.state.activeItem+1)%n)+n)%n
    });
  }
  
  rotateLeft() {
    let n = this.props.photos.length;
    this.setState({
      activeItem: (((this.state.activeItem-1)%n)+n)%n
    });
  }
  
  render() {
    let {
      photos
    } = this.props;
    
    return (
      <div className="product-card-gallery">
  {
    // gallery-item active 
	  photos.map((photo, i) => {
      const a=this.state.activeItem===i ? "active":"";
      console.log(photo);
      return (
	      <div
		    className={`gallery-item ${a}`}
	     style={{
		   backgroundImage: `url(${photo})`
		 }}
		 />
	    );
	  })
	}
     <GalleryToggle
       icon='>'
       action={this.rotateRight.bind(this)}
       right
      />
     <GalleryToggle
       icon='<'
       action={this.rotateLeft.bind(this)}
       left
      />
      </div>
    );
  }
}

export default ProductCardGallery;
