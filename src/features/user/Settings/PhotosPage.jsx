import React, { Component } from 'react';
import {
   Button, Card, Divider, Grid, Header, Image, Segment,
} from 'semantic-ui-react';

class PhotosPage extends Component {
   state = {};

   render() {
      return (
         <Segment>
            <Header content="Your Photos" dividing size="large" />
            <Grid>
               <Grid.Row />
               <Grid.Column width={4}>
                  <Header color="teal" content="Step 1 - Add Photo" />
               </Grid.Column>
               <Grid.Column width={1} />
               <Grid.Column width={4}>
                  <Header color="teal" content="Step 2 - Resize image" />
               </Grid.Column>
               <Grid.Column width={1} />
               <Grid.Column width={4}>
                  <Header color="teal" content="Step 3 - Preview and Upload" />
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
