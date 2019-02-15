import React, { Component } from 'react';
import PropTypes from 'prop-types';
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

      let eventDate;
      if (event.date) {
         eventDate = event.date.toDate();
      }

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
                        {`${format(eventDate, 'dddd Do MMMM')} at ${format(eventDate, 'h:mm A')}`}
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

EventDetailedInfo.propTypes = {
   event: PropTypes.shape({
      date: PropTypes.object.isRequired,
      description: PropTypes.string.isRequired,
      venueLatLng: PropTypes.shape({
         lat: PropTypes.number.isRequired,
         lng: PropTypes.number.isRequired,
      }).isRequired,
   }).isRequired,
};

export default EventDetailedInfo;
