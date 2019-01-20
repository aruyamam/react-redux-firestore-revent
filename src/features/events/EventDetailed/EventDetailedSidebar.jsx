import React from 'react';
import {
   Item, Label, List, Segment,
} from 'semantic-ui-react';

const itemContentStyle = {
   display: 'flex',
   alignItems: 'center',
   flexDirection: 'row-reverse',
   justifyContent: 'flex-end',
};

const EventDetailedSidebar = ({ attendees }) => (
   <div>
      <Segment
         textAlign="center"
         attached="top"
         secondary
         inverted
         color="teal"
         style={{ border: 'none' }}
      >
         {attendees && attendees.length}
         {' '}
         {attendees && attendees.length === 1 ? 'Person' : 'People'}
         {' '}
Going
      </Segment>
      <Segment attached>
         <List relaxed divided>
            {attendees
                  && attendees.map(attendee => (
                     <Item key={attendee.id} style={{ position: 'relative' }}>
                        <Label ribbon="right" color="orange" style={{ position: 'absolute' }}>
                           Host
                        </Label>
                        <Item.Content verticalAlign="middle" style={itemContentStyle}>
                           <Item.Header as="h3">
                              <a>{attendee.name}</a>
                           </Item.Header>
                           <Item.Image
                              src={attendee.photoURL}
                              size="tiny"
                              style={{ marginRight: '1rem' }}
                           />
                        </Item.Content>
                     </Item>
                  ))}
         </List>
      </Segment>
   </div>
);

export default EventDetailedSidebar;
