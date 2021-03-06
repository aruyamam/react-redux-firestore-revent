import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import {
   Button, Card, Divider, Grid, Header, Icon, Image, Segment,
} from 'semantic-ui-react';
import Dropzone from 'react-dropzone';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import { toastr } from 'react-redux-toastr';
import { uploadProfileImage, deletePhoto, setMainPhoto } from '../userActions';

const dropZoneStyle = {
   border: '1px dashed black',
   borderRadius: '5px',
   padding: '10px 0',
   textAlign: 'center',
};

const dropZoneStyleActive = {
   opacity: '0.5',
};

const ImagePreviewStyle = {
   minHeight: '200px',
   minWidth: '200px',
};

const query = ({ auth }) => [
   {
      collection: 'users',
      doc: auth.uid,
      subcollections: [{ collection: 'photos' }],
      storeAs: 'photos',
   },
];

const actions = {
   uploadProfileImage,
   deletePhoto,
   setMainPhoto,
};

const mapState = state => ({
   auth: state.firebase.auth,
   profile: state.firebase.profile,
   photos: state.firestore.ordered.photos,
   loading: state.async.loading,
});

class PhotosPage extends Component {
   constructor(props) {
      super(props);

      this.state = {
         files: [],
         fileName: '',
         cropResult: null,
         image: {},
      };

      this.cropperRef = React.createRef();
   }

   uploadImage = async () => {
      const { image, fileName } = this.state;
      const { uploadProfileImage } = this.props;

      try {
         await uploadProfileImage(image, fileName);
         this.cancelCrop();
         toastr.success('Success!', 'Photo has been uploaded');
      }
      catch (error) {
         toastr.error('Oops', error.message);
      }
   };

   handlePhotoDelete = photo => async () => {
      try {
         const { deletePhoto } = this.props;
         deletePhoto(photo);
      }
      catch (error) {
         toastr.error('Oops', error.message);
      }
   };

   handleSetMainPhoto = photo => async () => {
      try {
         const { setMainPhoto } = this.props;
         await setMainPhoto(photo);
      }
      catch (error) {
         toastr.error('Oops', error.message);
      }
   };

   cancelCrop = () => {
      this.setState({
         files: [],
         image: {},
      });
   };

   cropImage = () => {
      if (typeof this.cropperRef.current.getCroppedCanvas() === 'undefined') {
         return;
      }

      this.cropperRef.current.getCroppedCanvas().toBlob((blob) => {
         const imageUrl = URL.createObjectURL(blob);
         this.setState({
            cropResult: imageUrl,
            image: blob,
         });
      });
   };

   onDrop = (files) => {
      this.setState({
         files: files.map(file => Object.assign(file, { preview: URL.createObjectURL(file) })),
         fileName: files[0].name,
      });
   };

   render() {
      const { cropResult, files } = this.state;
      const { photos, profile, loading } = this.props;

      let filteredPhoto;
      if (photos) {
         filteredPhoto = photos.filter(photo => photo.url !== profile.photoURL);
      }

      return (
         <Segment>
            <Header content="Your Photos" dividing size="large" />
            <Grid>
               <Grid.Row />
               <Grid.Column width={4}>
                  <Header color="teal" content="Step 1 - Add Photo" />
                  <Dropzone onDrop={this.onDrop} multiple={false}>
                     {({ getRootProps, isDragActive }) => {
                        const style = isDragActive
                           ? { ...dropZoneStyle, ...dropZoneStyleActive }
                           : dropZoneStyle;

                        return (
                           <div {...getRootProps()} style={style}>
                              <Icon name="upload" size="huge" />
                              <Header content="Drop image here or click to add" />
                           </div>
                        );
                     }}
                  </Dropzone>
               </Grid.Column>
               <Grid.Column width={1} />
               <Grid.Column width={4}>
                  <Header color="teal" content="Step 2 - Resize image" />
                  {files[0] && (
                     <Cropper
                        aspectRatio={1}
                        crop={this.cropImage}
                        cropBoxMovable
                        cropBoxResizable
                        dragMode="move"
                        guides={false}
                        ref={this.cropperRef}
                        scalable
                        src={files[0].preview}
                        style={{ height: 200, width: '100%' }}
                        viewMode={0}
                     />
                  )}
               </Grid.Column>
               <Grid.Column width={1} />
               <Grid.Column width={4}>
                  <Header color="teal" content="Step 3 - Preview and Upload" />
                  {files[0] && (
                     <div>
                        <Image style={ImagePreviewStyle} src={cropResult} />
                        <Button.Group>
                           <Button
                              onClick={this.uploadImage}
                              icon="check"
                              loading={loading}
                              positive
                              style={{ width: '100px' }}
                           />
                           <Button
                              onClick={this.cancelCrop}
                              disabled={loading}
                              icon="close"
                              style={{ width: '100px' }}
                           />
                        </Button.Group>
                     </div>
                  )}
               </Grid.Column>
            </Grid>
            <Divider />
            <Header color="teal" content="All Photos" sub />
            <Card.Group itemsPerRow={5}>
               <Card>
                  <Image src={profile.photoURL || '/assets/user.png'} />
                  <Button positive>Main Photo</Button>
               </Card>
               {photos
                  && filteredPhoto.map(photo => (
                     <Card key={photo.id}>
                        <Image src={photo.url} />
                        <div className="ui two buttons">
                           <Button loading={loading} onClick={this.handleSetMainPhoto(photo)} basic color="green">
                              Main
                           </Button>
                           <Button
                              onClick={this.handlePhotoDelete(photo)}
                              basic
                              color="red"
                              icon="trash"
                           />
                        </div>
                     </Card>
                  ))}
            </Card.Group>
         </Segment>
      );
   }
}

PhotosPage.defaultProps = {
   photos: [],
   profile: {
      photoURl: '',
   },
};

PhotosPage.propTypes = {
   photos: PropTypes.arrayOf(
      PropTypes.shape({
         id: PropTypes.string,
         url: PropTypes.string,
      }),
   ),
   profile: PropTypes.shape({
      photoURL: PropTypes.string,
   }),
   uploadProfileImage: PropTypes.func.isRequired,
   deletePhoto: PropTypes.func.isRequired,
   setMainPhoto: PropTypes.func.isRequired,
   loading: PropTypes.bool.isRequired,
};

export default compose(
   connect(
      mapState,
      actions,
   ),
   firestoreConnect(auth => query(auth)),
)(PhotosPage);
