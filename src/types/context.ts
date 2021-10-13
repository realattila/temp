// infrastructure for data that recevied from API
//  TODO: this muse be remove
export interface initAPIDataInfra {
  data: any;
  status: {
    loading: boolean;
    errors: any;
    done: boolean;
  };
}

//////////////////////////////////////////////////
export interface APIDataInfraType {
  data: any;
  status: {
    loading: boolean;
    errors: any;
    done: boolean;
  };
}
//////////////////////////////////////////////////

export interface action {
  type?: string;
  payload?: any;
}
