import { useReducer } from 'react';

import monitoringReducer from './reducer';
import CREATE_TICKET_ACTIONS from './actions';
import { MONITORING_CONTEXT_STATE, MonitroingContextProvider } from './index';

import { getAuditLogDatabaseTablesAPI } from 'services/api/monitoring';

// *************************************************************************

const MonitoringContextContainer: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(monitoringReducer, MONITORING_CONTEXT_STATE);

  const getDatabaseTables = async (DatabaseName: string) => {
    dispatch({
      type: CREATE_TICKET_ACTIONS.GET_TABLES_DATABASE,
      payload: { loading: true, error: null, data: null, isDone: false },
    });

    const res = await getAuditLogDatabaseTablesAPI({
      DatabaseName,
    });

    if (!res.hasError) {
      dispatch({
        type: CREATE_TICKET_ACTIONS.GET_TABLES_DATABASE,
        payload: { loading: false, error: null, data: res.data, isDone: true },
      });
    } else {
      dispatch({
        type: CREATE_TICKET_ACTIONS.GET_TABLES_DATABASE,
        payload: { loading: false, error: res.errorText, data: null, isDone: true },
      });
    }
  };
  return <MonitroingContextProvider value={{ ...state, getDatabaseTables }}>{children}</MonitroingContextProvider>;
};

export default MonitoringContextContainer;
