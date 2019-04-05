import { connectedReduxRedirect } from 'redux-auth-wrapper/history4/redirect';
import { openModal } from '../modals/modalActions';

const UserIsAuthenticated = connectedReduxRedirect({
   wrapperDisplayName: 'UserIsAuthenticated',
   allowRedirectBack: true,
   redirectPath: '/events',
   authenticatedSelector: ({ firebase: { auth } }) => auth.isLoaded && !auth.isEmpty,
   redirectAction: () => dispatch => dispatch(openModal('UnauthModal')),
});

export default UserIsAuthenticated;
