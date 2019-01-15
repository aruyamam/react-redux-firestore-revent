import React from 'react';
import {
   Button, Grid, Icon, Segment,
} from 'semantic-ui-react';

const EventDetailedInfo = () => (
   <Segment.Group>
      <Segment>
         <Grid>
            <Grid.Column width={1}>
               <Icon name="info" size="large" color="teal" />
            </Grid.Column>
            <Grid.Column width={15}>
               <p>Description of Event</p>
            </Grid.Column>
         </Grid>
      </Segment>
      <Segment>
         <Grid>
            <Grid.Column width={1}>
               <Icon name="calendar" size="large" color="teal" />
            </Grid.Column>
            <Grid.Column width={15}>
               <span>Event Date</span>
            </Grid.Column>
         </Grid>
      </Segment>
      <Segment>
         <Grid>
            <Grid.Column width={1}>
               <Icon name="marker" size="large" color="teal" />
            </Grid.Column>
            <Grid.Column width={11}>
               <span>Event Venue</span>
            </Grid.Column>
            <Grid.Column width={4}>
               <Button content="Show Map" size="tiny" color="teal" />
            </Grid.Column>
         </Grid>
      </Segment>
   </Segment.Group>
);

export default EventDetailedInfo;
