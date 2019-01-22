import React, { Component } from 'react';
import { Form, Label, List } from 'semantic-ui-react';
import Script from 'react-load-script';
import PlacesAutocomplete from 'react-places-autocomplete';

const autocompleteStyle = {
   position: 'absolute',
   left: '0',
   right: '0',
   top: '37.8px',
   zIndex: '100',
   padding: '0',
   margin: '0',
   backgroundColor: '#fff',
   boxShadow: '0 4px 6px 0 rgba(32,33,36,0.28)',
};

const autocompleteItemStyle = {
   margin: '1px',
   padding: '5px 15px',
   cursor: 'pointer',
};

class PlaceInput extends Component {
   state = {
      scriptLoaded: false,
   };

   handleScriptLoaded = () => this.setState({ scriptLoaded: true });

   render() {
      const { scriptLoaded } = this.state;
      const {
         input: { value, onChange },
         width,
         onSelect,
         placeholder,
         options,
         meta: { touched, error },
      } = this.props;

      return (
         <Form.Field error={touched && !!error} width={width}>
            <Script
               url={`https://maps.googleapis.com/maps/api/js?key=${
                  process.env.REACT_APP_GOOGLE_MAP_API
               }&libraries=places`}
               onLoad={this.handleScriptLoaded}
            />
            {scriptLoaded && (
               <PlacesAutocomplete
                  value={value}
                  searchOptions={options}
                  onChange={onChange}
                  onSelect={onSelect}
               >
                  {({
                     getInputProps, suggestions, getSuggestionItemProps, loading,
                  }) => (
                     <div style={{ position: 'relative' }}>
                        <input {...getInputProps({ placeholder })} />
                        {loading && (
                           <List style={autocompleteStyle}>
                              <List.Item style={autocompleteItemStyle}>Loading...</List.Item>
                           </List>
                        )}
                        <List style={autocompleteStyle}>
                           {suggestions.map((suggestion) => {
                              const activeStyle = suggestion.active
                                 ? { backgroundColor: '#e8e8e8' }
                                 : { backgroundColor: '#fff' };

                              return (
                                 <List.Item
                                    {...getSuggestionItemProps(suggestion)}
                                    style={{
                                       ...autocompleteItemStyle,
                                       ...activeStyle,
                                    }}
                                 >
                                    {suggestion.description}
                                 </List.Item>
                              );
                           })}
                        </List>
                     </div>
                  )}
               </PlacesAutocomplete>
            )}
            {touched && error && <Label>{error}</Label>}
         </Form.Field>
      );
   }
}

export default PlaceInput;
