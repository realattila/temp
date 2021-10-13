import API from '..';

export const getMonitoringDatabasesAPI = () =>
  API({
    baseURL: process.env.API_BASE_URL_MONITORING_SERVICE,
    url: '/api/auditlog/GetDataBases',
    method: 'get',
    withAuth: true,
  });

export const getAuditLogsDataAPI = (data: any) =>
  API({
    baseURL: process.env.API_BASE_URL_MONITORING_SERVICE,
    url: '/api/auditlog/Get',
    method: 'post',
    data,
    withAuth: true,
  });

export const getAuditLogDatabaseTablesAPI = (params: any) =>
  API({
    baseURL: process.env.API_BASE_URL_MONITORING_SERVICE,
    url: '/api/auditlog/GetTables',
    method: 'get',
    params,
    withAuth: true,
  });

export const removeAuditLogDatabaseTablesAPI = (GuidList: Array<string>) =>
  API({
    baseURL: process.env.API_BASE_URL_MONITORING_SERVICE,
    url: '/api/auditlog/DeleteTable',
    method: 'post',
    data: GuidList,
    withAuth: true,
  });

export const addAuditLogDatabasesTableAPI = (data: any) =>
  API({
    baseURL: process.env.API_BASE_URL_MONITORING_SERVICE,
    url: '/api/auditlog/SaveTables',
    method: 'post',
    data: data,
    withAuth: true,
  });
