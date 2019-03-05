import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import format from 'date-fns/format';
import {
   Card, Grid, Header, Image, Segment, Tab,
} from 'semantic-ui-react';

const panes = [
   { menuItem: 'All Events', pane: { key: 'allEvents' } },
   { menuItem: 'Past Events', pane: { key: 'pastEvents' } },
   { menuItem: 'Future Events', pane: { key: 'futureEvents' } },
   { menuItem: 'Hosting', pane: { key: 'hosted' } },
];

const UserDetailedEvents = ({ changeTab, events, eventsLoading }) => (
   <Grid.Column width={12}>
      <Segment attached loading={eventsLoading}>
         <Header content="Events" icon="calendar outline" />
         <Tab
            onTabChange={(e, data) => changeTab(e, data)}
            menu={{ secondary: true, pointing: true }}
            panes={panes}
         />
         <br />
         <Card.Group itemsPerRow={5}>
            {events
               && events.map(event => (
                  <Card as={Link} to={`/event/${event.id}`} key={event.id}>
                     <Image src={`/assets/categoryImages/${event.category}.jpg`} />
                     <Card.Content>
                        <Card.Header textAlign="center">{event.title}</Card.Header>
                        <Card.Meta textAlign="center">
                           <div>{format(event.date && event.date.toDate(), 'DD MMM YYYY')}</div>
                           <div>{format(event.date && event.date.toDate(), 'h:mm A')}</div>
                        </Card.Meta>
                     </Card.Content>
                  </Card>
               ))}
         </Card.Group>
      </Segment>
   </Grid.Column>
);

UserDetailedEvents.propTypes = {
   changeTab: PropTypes.func.isRequired,
   events: PropTypes.arrayOf(
      PropTypes.shape({
         category: PropTypes.string,
         date: PropTypes.object,
         id: PropTypes.string,
         title: PropTypes.string,
      }),
   ).isRequired,
   eventsLoading: PropTypes.bool.isRequired,
};

export default UserDetailedEvents;
