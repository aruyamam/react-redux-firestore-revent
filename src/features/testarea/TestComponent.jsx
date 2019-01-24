import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';
import Script from 'react-load-script';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { incrementCounter, decrementCounter } from './testActions';
import { openModal } from '../modals/modalActions';

const mapState = state => ({
   data: state.test.data,
});

const actions = {
   incrementCounter,
   decrementCounter,
   openModal,
};

class TestComponent extends Component {
   static defaultProps = {
      center: {
         lat: 59.95,
         lng: 30.33,
      },
      zoom: 11,
   };

   state = {
      address: '',
      scriptLoaded: false,
   };

   handleScriptLoad = () => {
      this.setState({ scriptLoaded: true });
   };

   handleSelect = (address) => {
      geocodeByAddress(address)
         .then(results => getLatLng(results[0]))
         .then(latlng => console.log('Success', latlng))
         .catch(error => console.error('Error', error));
   };

   handleChange = address => this.setState({ address });

   render() {
      const { scriptLoaded, address } = this.state;
      const {
         incrementCounter, decrementCounter, data, openModal,
      } = this.props;

      return (
         <div>
            <Script
               url={`https://maps.googleapis.com/maps/api/js?key=${
                  process.env.REACT_APP_GOOGLE_MAP_API
               }&libraries=places`}
               onLoad={this.handleScriptLoad}
            />
            <h1>Test Area</h1>
            <h3>{`The answer is: ${data}`}</h3>
            <Button onClick={incrementCounter} color="green" content="Increment" />
            <Button onClick={decrementCounter} color="red" content="Decrement" />
            <Button
               onClick={() => openModal('TestModal', { data: 43 })}
               color="teal"
               content="Open Modal"
            />
            <br />
            <br />
            <form onSubmit={this.handleFormSubmit}>
               {scriptLoaded && (
                  <PlacesAutocomplete
                     value={address}
                     onChange={this.handleChange}
                     onSelect={this.handleSelect}
                  >
                     {({
                        getInputProps, suggestions, getSuggestionItemProps, loading,
                     }) => (
                        <div>
                           <input
                              {...getInputProps({
                                 placeholder: 'Search Places ...',
                                 className: 'location-search-input',
                              })}
                           />
                           <div className="autocomplete-dropdown-container">
                              {loading && <div>Loading...</div>}
                              {suggestions.map((suggestion) => {
                                 const className = suggestion.active
                                    ? 'suggestion-item--active'
                                    : 'suggestion-item';
                                 // inline style for demonstration purpose
                                 const style = suggestion.active
                                    ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                    : { backgroundColor: '#ffffff', cursor: 'pointer' };
                                 return (
                                    <div
                                       {...getSuggestionItemProps(suggestion, {
                                          className,
                                          style,
                                       })}
                                    >
                                       <span>{suggestion.description}</span>
                                    </div>
                                 );
                              })}
                           </div>
                        </div>
                     )}
                  </PlacesAutocomplete>
               )}
            </form>
         </div>
      );
   }
}

export default connect(
   mapState,
   actions,
)(TestComponent);
