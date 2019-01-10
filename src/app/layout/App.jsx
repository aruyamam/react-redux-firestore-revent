import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import { Route } from 'react-router-dom';
import EventDashboard from '../../features/events/EventDashboard/EventDashboard';
import EventDetailedPage from '../../features/events/EventDetailed/EventDetailedPage';
import EventForm from '../../features/events/EventForm/EventForm';
import PeopleDashboard from '../../features/user/PeopleDashboard/PeopleDashboard';
import UserDetailedPage from '../../features/user/UserDetailed/UserDetailedPage';
import SettingsDashboard from '../../features/user/Settings/SettingsDashboard';
import NavBar from '../../features/nav/NavBar/NavBar';
import HomePage from '../../features/home/HomePage';

class App extends Component {
   state = {};

   render() {
      return (
         <div>
            <NavBar />
            <Container className="main">
               <Route exact path="/" component={HomePage} />
               <Route path="/events" component={EventDashboard} />
               <Route path="/event/:id" component={EventDetailedPage} />
               <Route path="/people" component={PeopleDashboard} />
               <Route path="/profile/:id" component={UserDetailedPage} />
               <Route path="/settings" component={SettingsDashboard} />
               <Route path="/createEvent" component={EventForm} />
            </Container>
         </div>
      );
   }
}

export default App;
