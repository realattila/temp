import React, { FC, ReactNode } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { CBadge, CNavLink } from '@coreui/react-pro';
import CIcon from '@coreui/icons-react';

import { Badge, NavItem } from './nav';
import { useRouter } from 'next/router';

interface AppSidebarNavProps {
  items: NavItem[];
}

export const AppSidebarNav: FC<AppSidebarNavProps> = ({ items }) => {
  const router = useRouter();
  const navLink = (name: string | JSX.Element, icon: string | ReactNode, badge?: Badge) => {
    return (
      <>
        <span className='me-2'>
          {icon && typeof icon === 'string' ? <CIcon icon={icon} customClassName='nav-icon' /> : icon}
        </span>
        {name && <span>{name}</span>}
        {badge && (
          <CBadge color={badge.color} className='ms-auto'>
            <span>{badge.text}</span>
          </CBadge>
        )}
      </>
    );
  };

  const navItem = (item: NavItem, index: number) => {
    const { component, name, badge, icon, to, disabled, ...rest } = item;
    const Component = component;
    if (!!disabled) {
      return <Component key={index} {...rest} className='d-flex align-items-center flex-wrap ' />;
    }
    return (
      <Component key={index} {...rest} className='d-flex align-items-center flex-wrap '>
        <Link href={to}>
          <CNavLink className={router.asPath === to ? 'active' : ''} href={to}>
            {navLink(name, icon, badge)}
          </CNavLink>
        </Link>
      </Component>
    );
  };
  const navGroup = (item: NavItem, index: number) => {
    const { component, name, icon, to, ...rest } = item;
    const Component = component;
    return (
      <Component idx={String(index)} key={index} toggler={navLink(name, icon)} visible={true} {...rest}>
        {item.items?.map((item: NavItem, index: number) => (item.items ? navGroup(item, index) : navItem(item, index)))}
      </Component>
    );
  };

  return (
    <React.Fragment>
      {items &&
        items.map((item: NavItem, index: number) => (item.items ? navGroup(item, index) : navItem(item, index)))}
    </React.Fragment>
  );
};

AppSidebarNav.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any).isRequired,
};
