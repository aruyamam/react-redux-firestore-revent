import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button, Grid, Segment } from 'semantic-ui-react';

const UserDetailedSidebar = ({ isCurrentUser }) => (
   <Grid.Column width={4}>
      <Segment>
         {isCurrentUser ? (
            <Button as={Link} to="/settings" basic color="teal" content="Edit Profile" fluid />
         ) : (
            <Button basic color="teal" content="Follow User" fluid />
         )}
      </Segment>
   </Grid.Column>
);

UserDetailedSidebar.propTypes = {
   isCurrentUser: PropTypes.bool.isRequired,
};

export default UserDetailedSidebar;
