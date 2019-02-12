import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Grid, Segment } from 'semantic-ui-react';

const UserDetailedSidebar = () => (
   <Grid.Column width={4}>
      <Segment>
         <Button as={Link} to="/settings" basic color="teal" content="Edit Profile" fluid />
      </Segment>
   </Grid.Column>
);

export default UserDetailedSidebar;
