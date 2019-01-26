import {
   INCREMENT_COUNTER,
   DECREMENT_COUNTER,
   COUNTER_ACTION_STARTED,
   COUNTER_ACTION_FINISHED,
} from './testConstants';

export const incrementCounter = () => ({
   type: INCREMENT_COUNTER,
});

export const decrementCounter = () => ({
   type: DECREMENT_COUNTER,
});

export const startCounterAction = () => ({
   type: COUNTER_ACTION_STARTED,
});

export const finishCounterAction = () => ({
   type: COUNTER_ACTION_FINISHED,
});

export const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

export const incrementAsync = () => async (dispatch) => {
   dispatch(startCounterAction());
   await delay(1000);
   dispatch({ type: INCREMENT_COUNTER });
   dispatch(finishCounterAction());
};

export const decrementAsync = () => async (dispatch) => {
   dispatch(startCounterAction());
   await delay(1000);
   dispatch({ type: DECREMENT_COUNTER });
   dispatch(finishCounterAction());
};
