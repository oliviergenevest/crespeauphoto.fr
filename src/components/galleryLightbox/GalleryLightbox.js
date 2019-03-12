import React from 'react';

import Gallery from 'react-photo-gallery';
import Lightbox from 'react-images';


class GalleryLightbox extends React.Component {
  constructor(props) {
    super(props);
    this.state = { currentImage: 0 , photos:this.props.photos, direction:this.props.direction, margin:this.props.margin};
    this.closeLightbox = this.closeLightbox.bind(this);
    this.openLightbox = this.openLightbox.bind(this);
    this.gotoNext = this.gotoNext.bind(this);
    this.gotoPrevious = this.gotoPrevious.bind(this);
  }
  openLightbox(event, obj) {
    this.setState({
      currentImage: obj.index,
      lightboxIsOpen: true,
    });
  }
  closeLightbox() {
    this.setState({
      currentImage: 0,
      lightboxIsOpen: false,
    });
  }
  gotoPrevious() {
    this.setState({
      currentImage: this.state.currentImage - 1,
    });
  }
  gotoNext() {
    this.setState({
      currentImage: this.state.currentImage + 1,
    });
  }
  render() {
    return (
      <div>
        <Gallery 
	        photos={this.state.photos} 
	        direction={this.state.direction} 
	        margin={this.state.margin} 
	        onClick={this.openLightbox} 
	    />
        <Lightbox images={this.state.photos}
          onClose={this.closeLightbox}
          onClickPrev={this.gotoPrevious}
          onClickNext={this.gotoNext}
          currentImage={this.state.currentImage}
          isOpen={this.state.lightboxIsOpen}
        />
      </div>
    )
  }
}

export default GalleryLightbox