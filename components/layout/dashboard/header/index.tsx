import React from 'react';
import { CContainer, CHeader, CHeaderBrand, CHeaderNav, CHeaderToggler, CNavItem } from '@coreui/react-pro';
import { useAppDispatch } from 'src/hook/store';
import { toggleAsideDashboard } from 'store/dashboard';

import AppHeaderDropdown from 'components/layout/dashboard/header/header-dropdown';

type props = {
  userToken: any;
};

const AppHeader = ({ userToken }: props): JSX.Element => {
  const dispatch = useAppDispatch();

  const handleToggleAside = () => {
    dispatch(toggleAsideDashboard());
  };
  return (
    <CHeader position='sticky' className='mb-4'>
      <CContainer fluid>
        <CHeaderToggler className='p-0 pe-2' onClick={handleToggleAside}>
          <i className='cil-menu'></i>
        </CHeaderToggler>
        <CHeaderBrand className='mx-auto d-md-none'></CHeaderBrand>
        <CHeaderNav className='d-none d-md-flex me-auto'></CHeaderNav>
        <CHeaderNav className='ms-3 me-4'>
          <AppHeaderDropdown userToken={userToken} />
        </CHeaderNav>
      </CContainer>
    </CHeader>
  );
};

export default AppHeader;
