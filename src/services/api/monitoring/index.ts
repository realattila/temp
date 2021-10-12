import API from '..';

export const getMonitoringDatebasesAPI = () =>
  API({
    baseURL: process.env.API_BASE_URL_MONITORING_SERVICE,
    url: '/api/auditlog/GetDataBases',
    method: 'get',
    withAuth: true,
  });
