import API from 'services/api';

export const getNotificationProvidersAPI = () =>
  API({
    baseURL: process.env.API_BASE_URL_NOTIFICATION_SERVICE,
    url: '/api/Message/GetSmsProviders',
    method: 'GET',
    withAuth: true,
  });

export const sendSmsExperimentalNotificationAPI = (data: any) =>
  API({
    baseURL: process.env.API_BASE_URL_NOTIFICATION_SERVICE,
    url: 'api/notification/SendNotification',
    withAuth: true,
    method: 'POST',
    data,
  });

export const removeProvderNotificationAPI = (data: FormData) =>
  API({
    baseURL: process.env.API_BASE_URL_NOTIFICATION_SERVICE,
    url: 'api/Message/DeleteSmsProviders',
    withAuth: true,
    method: 'DELETE',
    data,
  });

export const addProvderNotificationAPI = (data: FormData) =>
  API({
    baseURL: process.env.API_BASE_URL_NOTIFICATION_SERVICE,
    url: '/api/Message/SaveSmsProviders',
    withAuth: true,
    method: 'POST',
    data,
  });

export const getLogSmssNotificationAPI = (data: any) =>
  API({
    baseURL: process.env.API_BASE_URL_NOTIFICATION_SERVICE,
    url: '/api/Message/Get',
    method: 'POST',
    withAuth: true,
    data,
  });

export const getStatusNotificationAPI = (date: Date) =>
  API({
    url: 'api/Message/GetStatisticData',
    method: 'GET',
    withAuth: true,
    params: { date },
    baseURL: process.env.API_BASE_URL_NOTIFICATION_SERVICE,
  });
