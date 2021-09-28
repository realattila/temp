import React, { useEffect } from 'react';

import { CSidebar, CSidebarBrand, CSidebarNav, CSidebarToggler } from '@coreui/react-pro';

import { useAppSelector, useAppDispatch } from 'src/hook/store';

import { AppSidebarNav } from './aside-nav';

import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';

import images from 'images/index';

// sidebar nav config
import navigation from './nav';
import { showAsideDashboard } from 'store/dashboard';

const AppSidebar = () => {
  const toggleAside = useAppSelector((state) => state.dashboard.toggleAside);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const breakPoint = String(window.getComputedStyle(document.body, ':before').content);
    if (breakPoint != '"xs"' && breakPoint != '"sm"' && breakPoint != '"md"' && breakPoint != '"lg"') {
      dispatch(showAsideDashboard());
    }
  }, []);

  return (
    <CSidebar position='fixed' selfHiding='sm' visible={toggleAside}>
      <CSidebarBrand className=' d-flex p-4'>
        <img src={images.logo.saman.src} className='img-fluid' />
      </CSidebarBrand>
      <CSidebarNav>
        <SimpleBar>
          <AppSidebarNav items={navigation()} />
        </SimpleBar>
      </CSidebarNav>
      <CSidebarToggler className='d-none d-lg-flex' />
    </CSidebar>
  );
};

export default React.memo(AppSidebar);
