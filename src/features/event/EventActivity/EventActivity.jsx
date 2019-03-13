import React from 'react';
import PropTypes from 'prop-types';
import {
   Feed, Header, Segment, Sticky,
} from 'semantic-ui-react';
import EventActivityItem from './EventActivityItem';

const EventActivity = ({ activities, contextRef }) => (
   <Sticky context={contextRef} offset={100}>
      <Header attached="top" content="Recent Activity" />
      <Segment attached>
         <Feed>
            {activities
               && activities.map(activity => (
                  <EventActivityItem key={activity.id} activity={activity} />
               ))}
         </Feed>
      </Segment>
   </Sticky>
);

EventActivity.propTypes = {
   activities: PropTypes.arrayOf(
      PropTypes.shape({
         id: PropTypes.string.isRequired,
      }),
   ).isRequired,
   contextRef: PropTypes.object.isRequired,
};

export default EventActivity;
