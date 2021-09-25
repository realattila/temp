import React from 'react';
import { CSidebar, CSidebarNav, CSidebarToggler } from '@coreui/react-pro';

import { AppSidebarNav } from './aside-nav';

import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';

// sidebar nav config
import navigation from './nav';

const AppSidebar = () => {
  return (
    <CSidebar position='fixed' selfHiding='lg' visible={true}>
      <CSidebarNav>
        <SimpleBar>
          <AppSidebarNav items={navigation} />
        </SimpleBar>
      </CSidebarNav>
      <CSidebarToggler className='d-none d-lg-flex' />
    </CSidebar>
  );
};

export default React.memo(AppSidebar);
