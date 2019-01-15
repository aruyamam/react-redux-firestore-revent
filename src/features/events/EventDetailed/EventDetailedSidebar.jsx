import React from 'react';
import {
   Item, Label, List, Segment,
} from 'semantic-ui-react';

const EventDetailedSidebar = () => (
   <div>
      <Segment
         textAlign="center"
         attached="top"
         secondary
         inverted
         color="teal"
         style={{ border: 'none' }}
      >
         2 People Going
      </Segment>
      <Segment attached>
         <List relaxed divided>
            <Item style={{ position: 'relative' }}>
               <Label ribbon="right" color="orange" style={{ position: 'absolute' }}>
                  Host
               </Label>
               <Item.Content verticalAlign="middle">
                  <Item.Image src="/assets/user.png" size="tiny" />
                  <Item.Header as="h3">
                     <a>Attendee Name</a>
                  </Item.Header>
               </Item.Content>
            </Item>
         </List>
      </Segment>
   </div>
);

export default EventDetailedSidebar;
