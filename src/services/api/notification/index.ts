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
