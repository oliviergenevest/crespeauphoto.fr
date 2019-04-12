import React from 'react'
import Img from 'gatsby-image'
import Gallery from 'react-photo-gallery'
import Lightbox from 'react-images'


const selectedImgStyle = {
  transform: "translateZ(0px) scale3d(0.9, 0.9, 1)",
  transition: "transform .135s cubic-bezier(0.0,0.0,0.2,1),opacity linear .15s"
};
const cont = {
  backgroundColor: "#eee",
  cursor: "pointer",
  overflow: "hidden",
  position: "relative"
};


const ImageComponent = ({index,onClick,photo,margin,direction,top,left}) => {
  //console.log(onClick, index)

  //calculate x,y scale
  const sx = (100 - (30 / photo.width) * 100) / 100;
  const sy = (100 - (30 / photo.height) * 100) / 100;
  selectedImgStyle.transform = `translateZ(0px) scale3d(${sx}, ${sy}, 1)`;

  if (direction === "column") {
    cont.position = "absolute";
    cont.left = left;
    cont.top = top;
  }

  return (
    <div
      style={{ margin, height: photo.height, width: photo.width, ...cont }}
      onClick={e => onClick(e, {index, photo})}
    >
      <Img 
        fluid={photo.fluid}  
       {...photo}
      />
    </div>
  );
};


 

class GalleryLightbox extends React.Component {
  constructor(props) {
    super(props)
    this.state = { currentImage: 0 , photos:this.props.photos, fullSizePhotos:this.props.fullSizePhotos, direction:this.props.direction, margin:this.props.margin}
    this.closeLightbox = this.closeLightbox.bind(this)
    this.openLightbox = this.openLightbox.bind(this)
    this.gotoNext = this.gotoNext.bind(this)
    this.gotoPrevious = this.gotoPrevious.bind(this)
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

          ImageComponent={ImageComponent} // on utilise gatsby-image pour rendre les images dans la galerie
          
	    />
        <Lightbox images={this.state.fullSizePhotos}
          backdropClosesModal={true}
          onClose={this.closeLightbox}
          onClickPrev={this.gotoPrevious}
          onClickNext={this.gotoNext}
          imageCountSeparator="/"
          currentImage={this.state.currentImage}
          isOpen={this.state.lightboxIsOpen}
          width={2000}
        />
      </div>
    )
  }
}

export default GalleryLightbox