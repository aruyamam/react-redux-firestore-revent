import React, { Component } from 'react';
import { Segment, Form, Button } from 'semantic-ui-react';

class EventForm extends Component {
  state = {};

  render() {
    const { handleCancel } = this.props;

    return (
      <Segment>
        <Form>
          <Form.Field>
            <label htmlFor="firstname">
              Event Title
              <input type="text" id="firstname" placeholder="First Name" />
            </label>
          </Form.Field>
          <Form.Field>
            <label htmlFor="date">
              Event Date
              <input type="date" id="date" placeholder="Event Date" />
            </label>
          </Form.Field>
          <Form.Field>
            <label htmlFor="city">
              City
              <input type="text" id="city" placeholder="City event is taking place" />
            </label>
          </Form.Field>
          <Form.Field>
            <label htmlFor="venue">
              Venue
              <input type="text" id="venue" placeholder="Enter the Venue of the event" />
            </label>
          </Form.Field>
          <Form.Field>
            <label htmlFor="host">
              Hosted By
              <input type="text" id="host" placeholder="Enter the name of person hosting" />
            </label>
          </Form.Field>
          <Button type="submit" positive>
            Submit
          </Button>
          <Button onClick={handleCancel} type="button">
            Cancel
          </Button>
        </Form>
      </Segment>
    );
  }
}

export default EventForm;
