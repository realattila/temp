import { createContext } from 'react';

interface monitoringContextStateInterface {
  currentDatabasTables: {
    loading: boolean;
    error: any;
    data: any;
    isDone: boolean;
  };
}

interface monitoringContextInterface extends monitoringContextStateInterface {
  getDatabaseTables: (DatabaseName: string) => any;
}

export const MONITORING_CONTEXT_STATE: monitoringContextStateInterface = {
  currentDatabasTables: {
    loading: true,
    error: null,
    data: null,
    isDone: false,
  },
};

const MonitroingContext = createContext<monitoringContextInterface>({
  ...MONITORING_CONTEXT_STATE,
  getDatabaseTables: () => {},
});

export default MonitroingContext;

export const MonitroingContextProvider = MonitroingContext.Provider;
export const MonitroingContextConsumer = MonitroingContext.Consumer;
