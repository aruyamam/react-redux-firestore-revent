import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button, Grid, Segment } from 'semantic-ui-react';

const UserDetailedSidebar = ({
   followUser, isCurrentUser, isFollowing, profile, unfollowUser,
}) => {
   let Btn = null;
   if (isCurrentUser) {
      Btn = <Button as={Link} to="/settings" basic color="teal" content="Edit Profile" fluid />;
   }
   else {
      Btn = isFollowing ? (
         <Button onClick={() => unfollowUser(profile)} color="teal" content="Unfollow" fluid />
      ) : (
         <Button onClick={() => followUser(profile)} basic color="teal" content="Follow" fluid />
      );
   }

   return (
      <Grid.Column width={4}>
         <Segment>{Btn}</Segment>
      </Grid.Column>
   );
};

UserDetailedSidebar.propTypes = {
   followUser: PropTypes.func.isRequired,
   isCurrentUser: PropTypes.bool.isRequired,
   isFollowing: PropTypes.bool.isRequired,
   profile: PropTypes.shape({
      displayName: PropTypes.string.isRequired,
      photoURL: PropTypes.string,
   }).isRequired,
   unfollowUser: PropTypes.func.isRequired,
};

export default UserDetailedSidebar;
