import React from 'react';
import { CContainer, CHeader, CHeaderBrand, CHeaderNav, CHeaderToggler, CNavItem } from '@coreui/react-pro';

const AppHeader = (): JSX.Element => {
  return (
    <CHeader position='sticky' className='mb-4'>
      <CContainer fluid>
        <CHeaderToggler className='ps-1'></CHeaderToggler>
        <CHeaderBrand className='mx-auto d-md-none'></CHeaderBrand>
        <CHeaderNav className='d-none d-md-flex me-auto'>
          <CNavItem>Dashboard</CNavItem>
        </CHeaderNav>
        <CHeaderToggler className='px-md-0 me-md-3'></CHeaderToggler>
      </CContainer>
    </CHeader>
  );
};

export default AppHeader;
