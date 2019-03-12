import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Feed } from 'semantic-ui-react';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';

class EventActivityItem extends Component {
   renderSummary = (activity) => {
      switch (activity.type) {
         case 'newEvent':
            return (
               <div>
                  New Event
                  {' '}
                  <Feed.User as={Link} to={{ pathname: `/profile/${activity.hostedBy}` }}>
                     {activity.hostedBy}
                  </Feed.User>
                  {' '}
                  is hosting
                  {' '}
                  <Link to={{ pathname: `/event/${activity.eventId}` }}>{activity.title}</Link>
               </div>
            );

         case 'cancelledEvent':
            return (
               <div>
                  Event Cancelled!
                  {' '}
                  <Feed.User as={Link} to={{ pathname: `/profile/${activity.hostUid}` }}>
                     {activity.hostedBy}
                  </Feed.User>
                  {' '}
                  has cancelled
                  {' '}
                  <Link to={{ pathname: `/event/${activity.eventId}` }}>{activity.title}</Link>
               </div>
            );

         default:
      }
   };

   render() {
      const { activity } = this.props;

      return (
         <Feed.Event>
            <Feed.Label>
               <img src={activity.photoURL || '/assets/user.png'} alt="" />
            </Feed.Label>
            <Feed.Content>
               <Feed.Summary>{this.renderSummary(activity)}</Feed.Summary>
               <Feed.Meta>
                  <Feed.Date>
                     {distanceInWordsToNow(activity.timestamp.toDate())}
                     {' ago'}
                  </Feed.Date>
               </Feed.Meta>
            </Feed.Content>
         </Feed.Event>
      );
   }
}

EventActivityItem.propTypes = {
   activity: PropTypes.shape({
      eventId: PropTypes.string.isRequired,
      hostedBy: PropTypes.string.isRequired,
      hostUid: PropTypes.string,
      photoURL: PropTypes.string.isRequired,
      timestamp: PropTypes.object.isRequired,
      title: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
   }).isRequired,
};

export default EventActivityItem;
