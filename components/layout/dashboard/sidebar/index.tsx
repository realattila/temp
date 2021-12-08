import React, { useContext, useEffect, useRef, useState } from 'react';
import { CButton, CNavItem, CNavLink, CSidebar, CSidebarBrand, CSidebarNav } from '@coreui/react-pro';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import SimpleBar from 'simplebar-react';

import { requestToGetDabasesMonitoring } from 'store/monitoring';
import AuthContext, { AuthService } from 'services/auth-service';
import { useAppSelector, useAppDispatch } from 'src/hook/store';
import routes from 'services/routes';
import { showAsideDashboard } from 'store/dashboard';

import { AppSidebarNav } from './aside-nav';

import images from 'images/index';

// sidebar nav config
import navigation, { NavItem } from './nav';

import 'simplebar/dist/simplebar.min.css';

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
  const { t } = useTranslation('layout_dashboard');

  const toggleAside = useAppSelector((state) => state.dashboard.toggleAside);
  const dispatch = useAppDispatch();
  const getMonitoringList = () => dispatch(requestToGetDabasesMonitoring());
  const monitroingDatabases = useAppSelector((state) => state.monitroing.databases);

  const [monitoringList, setMonitoringList] = useState(
    monitoringListItem(t, dispatch, getMonitoringList, monitroingDatabases),
  );

  const [list, setList] = useState<Array<NavItem>>(navigation(t));

  useEffect(() => {
    const breakPoint = String(window.getComputedStyle(document.body, ':before').content);
    if (breakPoint != '"xs"' && breakPoint != '"sm"' && breakPoint != '"md"' && breakPoint != '"lg"') {
      dispatch(showAsideDashboard());
    }
    getMonitoringList();
    generateList();
  }, []);

  useEffect(() => {
    setMonitoringList(monitoringListItem(t, dispatch, getMonitoringList, monitroingDatabases));
  }, [monitroingDatabases]);

  useEffect(() => {
    generateList();
  }, [monitoringList]);

  const generateList = async () => {
    const AuthServiceInstance = new AuthService();
    let tempData = list;

    await AuthServiceInstance.getUser()
      .then((user) => {
        // only one role have user
        if (user?.profile?.role instanceof String) {
          tempData = tempData.filter((item) => {
            return item.key === user.profile?.role;
          });
        }
        // user have multi roles
        else if (user?.profile?.role instanceof Array) {
          tempData = tempData.filter((item) => {
            return user?.profile?.role.includes(item.key);
          });
        }
        // role are not currect
        else {
          tempData = [];
        }
      })
      .catch((e) => {
        AuthServiceInstance.login({ state: window.location.href });
      });

    tempData.forEach((item) => {
      if (item.key === 'AUDIT_LOG') {
        return (item.items = monitoringList);
      } else {
        return item;
      }
    });

    setList(tempData);
  };

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
          <AppSidebarNav items={list} />
        </SimpleBar>
      </CSidebarNav>
      {/* <CSidebarToggler className='d-none d-lg-flex' /> */}
    </CSidebar>
  );
};

export default React.memo(AppSidebar);
