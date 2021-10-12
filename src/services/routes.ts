const routes = {
  dashboard: {
    notification: {
      index: () => '/notification',
      sendSms: () => '/notification/send-sms',
      providersSetting: () => '/notification/providers-setting',
      showSmss: () => '/notification/show-smss',
    },
    monitoring: {
      databases: (name: string) => `/monitoring/${name}`,
    },
  },
  auth: {
    login: () => '/login',
  },
};

export default routes;
