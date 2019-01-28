import React, { Component } from 'react';
import format from 'date-fns/format';
import {
   Button, Grid, Icon, Segment,
} from 'semantic-ui-react';
import EventDetailedMap from './EventDetailedMap';

class EventDetailedInfo extends Component {
   state = {
      showMap: false,
   };

   componentWillUnmount() {
      this.setState({ showMap: false });
   }

   showMapToggle = () => {
      this.setState(prevState => ({
         showMap: !prevState.showMap,
      }));
   };

   render() {
      const { event } = this.props;
      const { showMap } = this.state;

      return (
         <Segment.Group>
            <Segment>
               <Grid>
                  <Grid.Column width={1}>
                     <Icon name="info" size="large" color="teal" />
                  </Grid.Column>
                  <Grid.Column width={15}>
                     <p>{event.description}</p>
                  </Grid.Column>
               </Grid>
            </Segment>
            <Segment>
               <Grid>
                  <Grid.Column width={1}>
                     <Icon name="calendar" size="large" color="teal" />
                  </Grid.Column>
                  <Grid.Column width={15}>
                     <span>
                        {`${format(event.date, 'dddd Do MMMM')} at ${format(event.date, 'h:mm A')}`}
                     </span>
                  </Grid.Column>
               </Grid>
            </Segment>
            <Segment>
               <Grid>
                  <Grid.Column width={1}>
                     <Icon name="marker" size="large" color="teal" />
                  </Grid.Column>
                  <Grid.Column width={11}>
                     <span>{event.venue}</span>
                  </Grid.Column>
                  <Grid.Column width={4}>
                     <Button
                        onClick={this.showMapToggle}
                        content={showMap ? 'HIde Map' : 'Show Map'}
                        size="tiny"
                        color="teal"
                     />
                  </Grid.Column>
               </Grid>
            </Segment>
            {showMap && (
               <EventDetailedMap lat={event.venueLatLng.lat} lng={event.venueLatLng.lng} />
            )}
         </Segment.Group>
      );
   }
}

export default EventDetailedInfo;
