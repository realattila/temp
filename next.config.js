/** @type {import('next').NextConfig} */

const { i18n } = require('./next-i18next.config');
const path = require('path');
require('dotenv').config();

module.exports = {
  reactStrictMode: true,
  images: {
    disableStaticImages: false,
  },
  i18n,
  env: {
    API_BASE_URL_NOTIFICATION_SERVICE: process.env.API_BASE_URL_NOTIFICATION_SERVICE,
    SSO_AUTHORITY: process.env.SSO_AUTHORITY,
    SSO_ADMIN: process.env.SSO_ADMIN,
    SSO_API_URL: process.env.SSO_API_URL,
    SSO_CLIENT_ID: process.env.SSO_CLIENT_ID,
    SSO_REDIRECT_URI: process.env.SSO_REDIRECT_URI,
    SSO_SILENT_REDIRECT_URI: process.env.SSO_SILENT_REDIRECT_URI,
    SSO_POST_LOGOUT_REDIRECT_URI: process.env.SSO_POST_LOGOUT_REDIRECT_URI,
    SSO_SCOPE: process.env.SSO_SCOPE,
    API_BASE_URL_MONITORING_SERVICE: process.env.API_BASE_URL_MONITORING_SERVICE,
    WORK_FLOW_DESIGNER_URL: process.env.WORK_FLOW_DESIGNER_URL,
    SSO_ADMIN_ROLE_NAME: process.env.SSO_ADMIN_ROLE_NAME,
    REPORT_GENERATOR: process.env.REPORT_GENERATOR,
    ROLES: process.env.ROLES,
  },
  webpack(config, options) {
    config.resolve.alias = {
      ...config.resolve.alias,
      components: path.join(__dirname, './components'),
      utility: path.join(__dirname, './src/utility'),
      services: path.join(__dirname, './src/services'),
      types: path.join(__dirname, './src/types'),
      hooks: path.join(__dirname, './src/hooks'),
      store: path.join(__dirname, './src/store'),
      hoc: path.join(__dirname, './src/hoc'),
      styles: path.join(__dirname, './styles'),
      images: path.join(__dirname, './public/images'),
      public: path.join(__dirname, './public'),
    };
    return config;
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};
