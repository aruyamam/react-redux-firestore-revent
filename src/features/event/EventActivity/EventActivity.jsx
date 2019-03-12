import React from 'react';
import PropTypes from 'prop-types';
import { Feed, Header, Segment } from 'semantic-ui-react';
import EventActivityItem from './EventActivityItem';

const EventActivity = ({ activities }) => (
   <div>
      <Header attached="top" content="Recent Activity" />
      <Segment attached>
         <Feed>
            {activities
               && activities.map(activity => (
                  <EventActivityItem key={activity.id} activity={activity} />
               ))}
         </Feed>
      </Segment>
   </div>
);

EventActivity.propTypes = {
   activities: PropTypes.arrayOf(
      PropTypes.shape({
         id: PropTypes.string.isRequired,
      }),
   ).isRequired,
};

export default EventActivity;
