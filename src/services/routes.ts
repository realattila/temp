const routes = {
  dashboard: {
    notification: {
      index: () => '/notification',
      sendSms: () => '/notification/send-sms',
      providersSetting: () => '/notification/providers-setting',
      showSmss: () => '/notification/show-smss',
    },
  },
  auth: {
    login: () => '/login',
  },
};

export default routes;
