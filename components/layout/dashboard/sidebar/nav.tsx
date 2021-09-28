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
};

const nav = (): NavItem[] => {
  const { t } = useTranslation('layout_dashboard');

  return [
    {
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
  ];
};

export default nav;
