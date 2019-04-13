import { MODAL_CLOSE, MODAL_OPEN } from './modalConstants';
import createReducer from '../../app/common/util/reducerUtil';

const initialState = null;

export const openModal = (state, payload) => {
   const { modalType, modalPorps } = payload;

   return { modalType, modalPorps };
};

export const closeModal = () => null;

export default createReducer(initialState, {
   [MODAL_OPEN]: openModal,
   [MODAL_CLOSE]: closeModal,
});
