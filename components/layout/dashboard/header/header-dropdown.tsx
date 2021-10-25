import React, { useEffect, useState } from 'react';
import { User } from 'oidc-client';

import { AuthService } from 'services/auth-service';
import { useTranslation } from 'react-i18next';

import {
  CAvatar,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react-pro';

import images from 'public/images';

const AppHeaderDropdown: React.FC = () => {
  const { t } = useTranslation('layout_dashboard');
  const [userName, setUserName] = useState<string>('');

  // get Usernmae
  useEffect(() => {
    const AuthServiceInstance = new AuthService();
    window.onstorage = () => {
      const token = window.localStorage.getItem('token');
      if (!!token) {
        AuthServiceInstance.getUser().then((user) => {
          setUserName(user?.profile?.name || '');
        });
      }
    };
    AuthServiceInstance.getUser().then((user) => {
      setUserName(user?.profile?.name || '');
    });
    return () => {
      window.onstorage = null;
    };
  }, []);

  const logoutUser = () => {
    const AuthServiceInstance = new AuthService();
    AuthServiceInstance.logout().then(() => {
      window.localStorage.removeItem('token');
    });
  };
  return (
    <CDropdown variant='nav-item' alignment='end'>
      <CDropdownToggle className='py-0 d-flex gap-2 align-items-center' caret={false}>
        <CAvatar src={images.public.avatar.src} size='md' />
        <span>{userName}</span>
      </CDropdownToggle>
      <CDropdownMenu className='pt-0'>
        <CDropdownHeader className='bg-light fw-semibold py-2 text-right'>
          {t('header.avatar.menu.setting.title')}
        </CDropdownHeader>

        <CDropdownItem href={process.env.SSO_AUTHORITY} className='text-right d-flex align-items-center'>
          <i className='cil-user me-2'></i>
          {t('header.avatar.menu.setting.items.account')}
        </CDropdownItem>

        <CDropdownDivider />
        <CDropdownItem onClick={logoutUser} className='text-right cursor-pointer'>
          {t('header.avatar.menu.logout')}
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  );
};

export default AppHeaderDropdown;
