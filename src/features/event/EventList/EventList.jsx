import React from 'react';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroller';
import EventListItem from './EventListItem';

const EventList = ({
   events, getNextEvents, loading, moreEvents,
}) => (
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

EventList.propTypes = {
   events: PropTypes.arrayOf(
      PropTypes.shape({
         id: PropTypes.string.isRequired,
      }),
   ).isRequired,
   getNextEvents: PropTypes.func.isRequired,
   loading: PropTypes.bool.isRequired,
   moreEvents: PropTypes.bool.isRequired,
};

export default EventList;
