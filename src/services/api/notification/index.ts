import API from 'services/api';

export const getNotificationProvidersAPI = () =>
  API({
    url: '/api/Message/GetSmsProviders',
    method: 'GET',
    withAuth: true,
  });

export const sendSmsExperimentalNotificationAPI = (data: any) =>
  API({
    url: 'api/notification/SendNotification',
    withAuth: true,
    method: 'POST',
    data,
  });

export const removeProvderNotificationAPI = (data: FormData) =>
  API({
    url: 'api/Message/DeleteSmsProviders',
    withAuth: true,
    method: 'DELETE',
    data,
  });

export const addProvderNotificationAPI = (data: FormData) =>
  API({
    url: '/api/Message/SaveSmsProviders',
    withAuth: true,
    method: 'POST',
    data,
  });

export const getLogSmssNotificationAPI = (data: any) =>
  API({ url: '/api/Message/Get', method: 'POST', withAuth: true, data });
