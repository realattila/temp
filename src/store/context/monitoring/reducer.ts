import MONITORING_CONTEXT_ACTIONS from './actions';
import { action } from 'types/context';

const monitoringReducer = (state: any, { type, payload }: action) => {
  switch (type) {
    case MONITORING_CONTEXT_ACTIONS.GET_TABLES_DATABASE:
      return { ...state, currentDatabasTables: payload };
    default:
      return state;
  }
};

export default monitoringReducer;
