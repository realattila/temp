import React, { useEffect } from 'react';
import { CButton, CNavItem, CNavLink, CSidebar, CSidebarBrand, CSidebarNav, CSidebarToggler } from '@coreui/react-pro';
import { showAsideDashboard } from 'store/dashboard';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';

import { useAppSelector, useAppDispatch } from 'src/hook/store';

import { AppSidebarNav } from './aside-nav';

import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';

import images from 'images/index';

// sidebar nav config
import navigation from './nav';

import routes from 'services/routes';
import { requestToGetDabasesMonitoring } from 'store/monitoring';

const monitoringListItem = (t: any, dispatch: any, getMonitoringList: any, monitroingDatabases: any) => {
  if (monitroingDatabases?.loading) {
    return [
      {
        component: (props: any) => (
          <CNavItem {...props}>
            <CNavLink>
              <span>{t('sidebar.items.loading')}</span>
            </CNavLink>
          </CNavItem>
        ),
        name: t('sidebar.items.loading'),
        to: '',
        disabled: true,
        key: 'loading',
      },
    ];
  } else if (!monitroingDatabases?.loading && !!monitroingDatabases?.error) {
    return [
      {
        component: (props: any) => (
          <CNavItem {...props}>
            <CNavLink>
              <span>{t('sidebar.items.error.title')}</span>
              <CButton onClick={() => getMonitoringList()} className='ms-2' color='secondary' variant='ghost'>
                {t('sidebar.items.error.action')}
              </CButton>
            </CNavLink>
          </CNavItem>
        ),
        name: t('sidebar.items.loading'),
        to: '',
        disabled: true,
        key: 'loading',
      },
    ];
  } else {
    return (monitroingDatabases?.data || []).map((item: any) => {
      return {
        component: CNavItem,
        name: item?.appName || item?.name,
        icon: <i className='cil-grip'></i>,
        to: routes.dashboard.monitoring.databases(item?.name),
      };
    });
  }
};

const AppSidebar = () => {
  const toggleAside = useAppSelector((state) => state.dashboard.toggleAside);
  const dispatch = useAppDispatch();
  const getMonitoringList = () => dispatch(requestToGetDabasesMonitoring());
  const monitroingDatabases = useAppSelector((state) => state.monitroing.databases);

  const { t } = useTranslation('layout_dashboard');

  const monitoringList = monitoringListItem(t, dispatch, getMonitoringList, monitroingDatabases);

  useEffect(() => {}, []);
  useEffect(() => {
    const breakPoint = String(window.getComputedStyle(document.body, ':before').content);
    if (breakPoint != '"xs"' && breakPoint != '"sm"' && breakPoint != '"md"' && breakPoint != '"lg"') {
      dispatch(showAsideDashboard());
    }
    getMonitoringList();
  }, []);

  let appSidebarNavList = navigation(t);

  function addMonitoringItemsToList() {
    appSidebarNavList.forEach((item) => {
      if (item.key === 'monitoring') {
        item.items = monitoringList;
      }
    });
  }
  addMonitoringItemsToList();

  return (
    <CSidebar position='fixed' selfHiding='sm' visible={toggleAside}>
      <CSidebarBrand className=' d-flex p-4'>
        <Link href='/'>
          <a>
            <img src={images.logo.saman.src} className='img-fluid' />
          </a>
        </Link>
      </CSidebarBrand>
      <CSidebarNav>
        <SimpleBar>
          <AppSidebarNav items={appSidebarNavList} />
        </SimpleBar>
      </CSidebarNav>
      {/* <CSidebarToggler className='d-none d-lg-flex' /> */}
    </CSidebar>
  );
};

export default React.memo(AppSidebar);
