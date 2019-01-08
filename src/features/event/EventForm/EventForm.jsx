import React, { Component } from 'react';
import { Segment, Form, Button } from 'semantic-ui-react';

class EventForm extends Component {
  state = {
    event: {
      title: '',
      date: '',
      city: '',
      venue: '',
      hostedBy: '',
    },
  };

  onFormSubmit = (evt) => {
    evt.preventDefault();
    console.log(this.state.event);
  };

  onInputChange = (evt) => {
    const newEvent = this.state.event;
    newEvent[evt.target.name] = evt.target.value;

    this.setState({
      event: newEvent,
    });
  };

  render() {
    const { handleCancel } = this.props;
    const { event } = this.state;

    return (
      <Segment>
        <Form onSubmit={this.onFormSubmit}>
          <Form.Field>
            <label htmlFor="title">
              Event Title
              <input
                onChange={this.onInputChange}
                type="text"
                id="title"
                name="title"
                value={event.title}
                placeholder="Event Title"
              />
            </label>
          </Form.Field>
          <Form.Field>
            <label htmlFor="date">
              Event Date
              <input
                onChange={this.onInputChange}
                type="date"
                id="date"
                name="date"
                placeholder="Event Date"
              />
            </label>
          </Form.Field>
          <Form.Field>
            <label htmlFor="city">
              City
              <input
                onChange={this.onInputChange}
                type="text"
                id="city"
                name="city"
                placeholder="City event is taking place"
              />
            </label>
          </Form.Field>
          <Form.Field>
            <label htmlFor="venue">
              Venue
              <input
                onChange={this.onInputChange}
                type="text"
                id="venue"
                name="venue"
                placeholder="Enter the Venue of the event"
              />
            </label>
          </Form.Field>
          <Form.Field>
            <label htmlFor="hostedBy">
              Hosted By
              <input
                onChange={this.onInputChange}
                type="text"
                id="hostedBy"
                name="hostedBy"
                placeholder="Enter the name of person hosting"
              />
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
