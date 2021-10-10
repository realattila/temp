import { GetStaticProps, NextPage } from 'next';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { CCol, CContainer, CRow } from '@coreui/react-pro';

import { getLogSmssNotificationAPI, getNotificationProvidersAPI } from 'services/api/notification';

import SeoHead from 'components/common/seo-head';
import DashboardLayout from 'components/layout/dashboard';
import LoadingSession from 'components/common/loading-session';
import LogsSmsTableNotification from 'components/pages/notification/log-smss/table';
import FilterLogsSmssTableNotification from 'components/pages/notification/log-smss/filter';
import { withAuth } from 'services/auth-service';

export type paginationType = {
  pageNumber: number;
  totalPages: number;
  pageSize: number;
};

const ShowSmsDashboard: NextPage = () => {
  const { t } = useTranslation('pages_notification_show-smss');

  const [apiData, setApiData] = useState<any>(null);
  const [apiError, setApiError] = useState<any>(null);
  const [apiLoading, setApiLoading] = useState<boolean>(true);

  const [apiProviderData, setApiProviderData] = useState<any>(null);
  const [apiProviderError, setApiProviderError] = useState<any>(null);
  const [apiProviderLoading, setApiProviderLoading] = useState<boolean>(true);

  const [pagination, setPagination] = useState<paginationType>({
    pageNumber: 1,
    totalPages: 1,
    pageSize: 50,
  });

  const [filters, setFilters] = useState<any>({});

  const getProviders = async () => {
    setApiProviderLoading(true);
    setApiProviderError(null);
    setApiProviderData(null);
    const res = await getNotificationProvidersAPI();
    if (!res.hasError) {
      setApiProviderData(res.data);
    } else {
      setApiProviderError(res?.data || res?.response?.data || true);
    }
    setApiProviderLoading(false);
  };

  const getLogs = async (pagination: paginationType, filters: any) => {
    setApiLoading(true);
    setApiError(null);
    setApiData(null);
    if (!filters.showDateInFilter) {
      delete filters.CreateDate;
    }
    delete filters.showDateInFilter;
    const res = await getLogSmssNotificationAPI({
      pagination,
      filters,
      sort: ['CreateDate Desc'],
    });

    if (!res.hasError) {
      setApiData(res.data);

      setPagination({
        totalPages: Math.ceil(res.data?.total / res.data?.pagination?.pageSize),
        pageSize: res.data?.pagination?.pageSize,
        pageNumber: res.data?.pagination?.pageNumber,
      });
    } else {
      setApiError(res?.data || res?.response?.data || true);
    }

    setApiLoading(false);
  };

  const handleChangePage = async (data: any) => {
    const newPagination = { ...pagination, pageNumber: Number(data.page) };
    setPagination(newPagination);
    getLogs(newPagination, filters);
  };

  const handleChangeFilters = async (data: any) => {
    Object.keys(data).map((item) => {
      if (data[item] === '-1' || data[item] === '') {
        delete data[item];
      }
    });
    setFilters(data);
    getLogs({ ...pagination, pageNumber: 1 }, data);
  };

  useEffect(() => {
    getLogs(pagination, filters);
    getProviders();
  }, []);

  return (
    <>
      <DashboardLayout>
        <h1 className='dashboard__title'>{t('title')}</h1>
        <CContainer fluid className='show-smss'>
          <CRow>
            <CCol xs={12} className='show-smss__filter__wapper'>
              <LoadingSession
                loading={apiProviderLoading}
                error={apiProviderError}
                onRetry={getProviders}
                data={!!apiProviderData}
                style={{ height: '100px' }}
              >
                <FilterLogsSmssTableNotification
                  providers={apiProviderData}
                  handleChangeFilters={handleChangeFilters}
                />
              </LoadingSession>
            </CCol>
            <CCol xs={12}>
              <LoadingSession
                loading={apiLoading}
                error={apiError}
                data={!!apiData?.items?.length}
                onRetry={() => getLogs(pagination, filters)}
                style={{ height: '400px' }}
              >
                <LogsSmsTableNotification data={apiData} pagination={pagination} handleChangePage={handleChangePage} />
              </LoadingSession>
            </CCol>
          </CRow>
        </CContainer>
      </DashboardLayout>
      <SeoHead title={t('seo.title')} description={t('seo.description')} />
    </>
  );
};
export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(String(locale))),
    },
  };
};

export default withAuth(ShowSmsDashboard);
