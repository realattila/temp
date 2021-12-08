import React from 'react';

import { CNavGroup, CNavItem } from '@coreui/react-pro';
import { ElementType } from 'react';
import { useTranslation } from 'react-i18next';

export type Badge = {
  color: string;
  text: string;
};

export type NavItem = {
  component: string | ElementType;
  name: string | JSX.Element;
  icon?: string | JSX.Element;
  badge?: Badge;
  to: string;
  items?: NavItem[];
  disabled?: boolean;
  key?: string;
};

const nav = (t: any): NavItem[] => {
  return [
    {
      key: 'home',
      component: CNavItem,
      name: t('sidebar.items.home'),
      icon: <i className='cil-home'></i>,
      to: '/',
    },
    {
      key: 'SMS_PROVIDER',
      component: CNavGroup,
      name: t('sidebar.items.notification.head'),
      icon: <i className='cil-bell'></i>,
      to: '/notification',
      items: [
        {
          component: CNavItem,
          name: t('sidebar.items.notification.sendSms'),
          icon: <i className='cil-send'></i>,
          to: '/notification/send-sms',
        },
        {
          component: CNavItem,
          name: t('sidebar.items.notification.providersSetting'),
          icon: <i className='cil-settings'></i>,
          to: '/notification/providers-setting',
        },
        {
          component: CNavItem,
          name: t('sidebar.items.notification.showSMSs'),
          icon: <i className='cil-spreadsheet'></i>,
          to: '/notification/show-smss',
        },
      ],
    },
    {
      key: 'AUDIT_LOG',
      component: CNavGroup,
      name: t('sidebar.items.monitoring.head'),
      icon: <i className='cil-monitor'></i>,
      to: '/monitoring',
      items: [],
    },
    {
      key: 'WORKFLOW_DESIGNER',
      component: CNavItem,
      name: t('sidebar.items.workflowDesigner'),
      icon: <i className='cil-chart-show'></i>,
      to: String(process.env.WORK_FLOW_DESIGNER_URL),
    },
    {
      key: 'REPORT_GENERATOR',
      component: CNavItem,
      name: t('sidebar.items.report_generator'),
      icon: <i className='cil-report'></i>,
      to: String(process.env.REPORT_GENERATOR),
    },
    {
      key: 'SSO_ADMIN',
      component: CNavGroup,
      name: t('sidebar.items.sso.head'),
      icon: <i className='cil-shield'></i>,
      to: `${process.env.SSO_ADMIN}/`,
      items: [
        {
          component: CNavItem,
          name: t('sidebar.items.sso.users'),
          icon: <i className='cil-user'></i>,
          to: `${process.env.SSO_ADMIN}/Identity/Users/`,
        },
        {
          component: CNavItem,
          name: t('sidebar.items.sso.clients'),
          icon: <i className='cil-monitor'></i>,
          to: `${process.env.SSO_ADMIN}/Configuration/Clients/`,
        },
        {
          component: CNavItem,
          name: t('sidebar.items.sso.roles'),
          icon: <i className='cil-lock-locked '></i>,
          to: `${process.env.SSO_ADMIN}/Identity/Roles/`,
        },
      ],
    },
  ];
};

export default nav;
