import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';
import { incrementCounter, decrementCounter } from './testActions';

const mapState = state => ({
   data: state.test.data,
});

const actions = {
   incrementCounter,
   decrementCounter,
};

export class TestComponent extends Component {
   state = {};

   render() {
      const { incrementCounter, decrementCounter, data } = this.props;

      return (
         <div>
            <h1>Test Area</h1>
            <h3>{`The answer is: ${this.props.data}`}</h3>
            <Button onClick={incrementCounter} color="green" content="Increment" />
            <Button onClick={decrementCounter} color="red" content="Decrement" />
         </div>
      );
   }
}

export default connect(
   mapState,
   actions,
)(TestComponent);