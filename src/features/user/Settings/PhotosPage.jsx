import React, { Component } from 'react';
import {
   Button, Card, Divider, Grid, Header, Icon, Image, Segment,
} from 'semantic-ui-react';
import Dropzone from 'react-dropzone';

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

class PhotosPage extends Component {
   state = {
      files: [],
      fileName: '',
   };

   onDrop = (files) => {
      this.setState({
         files: files.map(file => Object.assign(file, { preview: URL.createObjectURL(file) })),
         fileName: files[0].name,
      });
   };

   render() {
      const { files } = this.state;

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
               </Grid.Column>
               <Grid.Column width={1} />
               <Grid.Column width={4}>
                  <Header color="teal" content="Step 3 - Preview and Upload" />
                  <Image style={ImagePreviewStyle} src={files[0] && files[0].preview} />
               </Grid.Column>
            </Grid>
            <Divider />
            <Header color="teal" content="All Photos" sub />
            <Card.Group itemsPerRow={5}>
               <Card>
                  <Image src="https://randomuser.me/api/portraits/men/20.jpg" />
                  <Button positive>Main Photo</Button>
               </Card>
               <Card>
                  <Image src="https://randomuser.me/api/portraits/men/20.jpg" />
                  <div className="ui two buttons">
                     <Button basic color="green">
                        Main
                     </Button>
                     <Button basic color="red" icon="trash" />
                  </div>
               </Card>
            </Card.Group>
         </Segment>
      );
   }
}

export default PhotosPage;
