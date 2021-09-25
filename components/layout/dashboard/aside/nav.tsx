import React from 'react';

import { CNavItem } from '@coreui/react-pro';
import { ElementType } from 'react';

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

const nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    icon: <i className='cil-accessibility'></i>,
    badge: {
      color: 'info-gradient',
      text: 'NEW',
    },
    to: '/dashboard',
  },
  {
    component: CNavItem,
    name: 'Blank',
    icon: <i className='cil-accessibility'></i>,
    to: '/blank',
  },
];

export default nav;
