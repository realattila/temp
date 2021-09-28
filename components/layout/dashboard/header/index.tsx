import React from 'react';
import { CContainer, CHeader, CHeaderBrand, CHeaderNav, CHeaderToggler, CNavItem } from '@coreui/react-pro';
import { useAppDispatch } from 'src/hook/store';
import { toggleAsideDashboard } from 'store/dashboard';

const AppHeader = (): JSX.Element => {
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
        <CHeaderToggler className='px-md-0 me-md-3'></CHeaderToggler>
      </CContainer>
    </CHeader>
  );
};

export default AppHeader;
