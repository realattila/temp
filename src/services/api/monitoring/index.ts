import API from '..';

export const getMonitoringDatebasesAPI = () =>
  API({
    baseURL: process.env.API_BASE_URL_MONITORING_SERVICE,
    url: '/api/auditlog/GetDataBases',
    method: 'get',
    withAuth: true,
  });

export const getAuditLogsDataAPI = (data: any) =>
  API({
    baseURL: process.env.API_BASE_URL_MONITORING_SERVICE,
    url: 'api/auditlog/Get',
    method: 'post',
    data,
    withAuth: true,
  });

export const getAuditLogDatabaseTablesAPI = (params: any) =>
  API({
    baseURL: process.env.API_BASE_URL_MONITORING_SERVICE,
    url: 'api/auditlog/GetTables',
    method: 'get',
    params,
    withAuth: true,
  });

export const removeAuditLogDatabaseTables = (GuidList: Array<string>) =>
  API({
    baseURL: process.env.API_BASE_URL_MONITORING_SERVICE,
    url: 'api/auditlog/DeleteTable',
    method: 'delete',
    data: { GuidList },
    withAuth: true,
  });
