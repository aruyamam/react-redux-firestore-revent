import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Grid } from 'semantic-ui-react';
import { Switch, Redirect, Route } from 'react-router-dom';
import SettingsNav from './SettingsNav';
import AboutPage from './AboutPage';
import AccountPage from './AccountPage';
import BasicPage from './BasicPage';
import PhotosPage from './PhotosPage';
import { updatePassword } from '../../auth/authActions';
import { updateProfile } from '../userActions';

const actions = {
   updatePassword,
   updateProfile,
};

const mapState = state => ({
   providerId: state.firebase.auth.providerData[0].providerId,
   user: state.firebase.profile,
});

const SettingsDashboard = ({
   updatePassword, providerId, user, updateProfile,
}) => (
   <Grid>
      <Grid.Column width={12}>
         <Switch>
            <Redirect exact from="/settings" to="/settings/basic" />
            <Route
               path="/settings/basic"
               render={() => <BasicPage initialValues={user} updateProfile={updateProfile} />}
            />
            <Route
               path="/settings/about"
               render={() => <AboutPage initialValues={user} updateProfile={updateProfile} />}
            />
            <Route path="/settings/photos" component={PhotosPage} />
            <Route
               path="/settings/account"
               render={() => (
                  <AccountPage updatePassword={updatePassword} providerId={providerId} />
               )}
            />
         </Switch>
      </Grid.Column>
      <Grid.Column width={4}>
         <SettingsNav />
      </Grid.Column>
   </Grid>
);

SettingsDashboard.propTypes = {
   providerId: PropTypes.string.isRequired,
   updatePassword: PropTypes.func.isRequired,
   updateProfile: PropTypes.func.isRequired,
   user: PropTypes.shape({
      createdAt: PropTypes.object,
      displayName: PropTypes.string,
      gender: PropTypes.string,
      isEmpty: PropTypes.bool,
      isLoaded: PropTypes.bool,
      photoURL: PropTypes.string,
   }).isRequired,
};

export default connect(
   mapState,
   actions,
)(SettingsDashboard);
