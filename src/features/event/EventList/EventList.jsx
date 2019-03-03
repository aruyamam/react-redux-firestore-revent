import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroller';
import EventListItem from './EventListItem';

class EventList extends Component {
   state = {};

   render() {
      const {
         events, getNextEvents, loading, moreEvents,
      } = this.props;

      return (
         <div>
            {events && events.length !== 0 && (
               <InfiniteScroll
                  hasMore={!loading && moreEvents}
                  initialLoad={false}
                  loadMore={getNextEvents}
                  pageStart={0}
               >
                  {events.map(event => (
                     <EventListItem key={event.id} event={event} />
                  ))}
               </InfiniteScroll>
            )}
         </div>
      );
   }
}

EventList.propTypes = {
   events: PropTypes.arrayOf(
      PropTypes.shape({
         id: PropTypes.string.isRequired,
      }),
   ).isRequired,
};

export default EventList;
