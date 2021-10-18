import React, { useContext, useEffect, useState } from 'react';
import { CAvatar, CDropdown, CDropdownDivider, CDropdownItem, CDropdownMenu, CDropdownToggle } from '@coreui/react-pro';

import images from 'public/images';
import AuthContext, { AuthService } from 'services/auth-service';
import { useTranslation } from 'react-i18next';

const AppHeaderDropdown: React.FC = () => {
  const { t } = useTranslation('layout_dashboard');
  const [userName, setUserName] = useState<string>('');

  useEffect(() => {
    const AuthServiceInstance = new AuthService();
    AuthServiceInstance.getUser().then((user) => {
      setUserName(user?.profile?.name || '');
    });
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
        <CDropdownDivider />
        <CDropdownItem onClick={logoutUser} className='text-right cursor-pointer'>
          {t('header.avatar.menu.logout')}
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  );
};

export default AppHeaderDropdown;
