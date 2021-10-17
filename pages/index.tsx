import { useEffect, useState } from 'react';
import type { GetServerSideProps, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { CCol, CContainer, CRow } from '@coreui/react-pro';
import Link from 'next/link';

import { getLogSmssNotificationAPI, getStatusNotificationAPI } from 'services/api/notification';

import DashboardLayout from 'components/layout/dashboard';
import DatePickerInput from 'components/common/form/date-picker-input';
import Form from 'components/common/form';
import LoadingSession from 'components/common/loading-session';
import DashboardStatusList from 'components/pages/dashboard/dashboard_status/dashboard_status_list';
import routes from 'services/routes';
import LogsSmsTableNotification from 'components/pages/notification/log-smss/table';

const Home: NextPage = () => {
  const { t } = useTranslation('page_dashboard');

  const [apiStatusData, setApiStatusData] = useState<any>(null);
  const [apiStatusError, setApiStatusError] = useState<any>(null);
  const [apiStatusLoading, setApiStatusLoading] = useState<boolean>(true);

  const [statusDate, setStatusDate] = useState<Date>(new Date());

  const [apiLogsData, setApiLogsData] = useState<any>(null);
  const [apiLogsError, setApiLogsError] = useState<any>(null);
  const [apiLogsLoading, setApiLogsLoading] = useState<boolean>(true);

  const getLogs = async () => {
    setApiLogsLoading(true);
    setApiLogsError(null);
    setApiLogsData(null);

    const res = await getLogSmssNotificationAPI({
      pagination: {
        pageNumber: 1,
        pageSize: 10,
      },
      filters: {},
      sort: ['CreateDate Desc'],
    });

    if (!res.hasError) {
      setApiLogsData(res.data);
    } else {
      setApiLogsError(res?.data || res?.response?.data || true);
    }

    setApiLogsLoading(false);
  };

  const getStatus = async (data = new Date()) => {
    setApiStatusLoading(true);
    setApiStatusError(null);
    setApiStatusData(null);

    const res = await getStatusNotificationAPI(data);

    if (!res.hasError) {
      setApiStatusData(res.data);
    } else {
      setApiStatusError(res?.data || res?.response?.data || true);
    }
    setApiStatusLoading(false);
  };

  const DatePickerSection = () => {
    const { handleSubmit } = useFormContext();

    return (
      <DatePickerInput
        name='date'
        showLabel={false}
        onChange={() =>
          handleSubmit((data) => {
            setStatusDate(data.date);
            getStatus(new Date(data.date));
          })()
        }
      />
    );
  };

  useEffect(() => {
    getLogs();
    getStatus(statusDate);
  }, []);

  return (
    <DashboardLayout>
      <CContainer>
        <CRow>
          <CCol xs={12}>
            <h2 className='dashboard__title'>{t('title')}</h2>
          </CCol>

          <CCol xs={12} className='d-flex  my-4 align-items-end'>
            <h6 className=''>{t('status.title')}</h6>
            <div className='ms-2'>
              <Form onSubmit={(data) => {}}>
                <DatePickerSection />
              </Form>
            </div>
          </CCol>

          <CCol xs={12}>
            <LoadingSession
              data={!!apiStatusData}
              error={apiStatusError}
              loading={apiStatusLoading}
              onRetry={() => getStatus(statusDate)}
              style={{ background: 'none', height: '100px' }}
            >
              <DashboardStatusList data={apiStatusData} />
            </LoadingSession>
          </CCol>

          <CCol xs={12}>
            <Link href={routes.dashboard.notification.sendSms()}>
              <a className='dashboard_page__link'>{t('logs.title')}</a>
            </Link>
          </CCol>

          <CCol xs={12}>
            <LoadingSession
              data={!!apiLogsData?.items.length}
              error={apiLogsError}
              loading={apiLogsLoading}
              onRetry={getLogs}
              style={{ height: '400px' }}
            >
              <LogsSmsTableNotification showPagination={false} data={apiLogsData} />
            </LoadingSession>
          </CCol>
        </CRow>
      </CContainer>
    </DashboardLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(String(locale))),
    },
  };
};

export default Home;

{
  /* <div className='body2'>
        <div className='scene'>
          <div className='floor'></div>
          <div className='cube'>
            <div className='front'></div>
            <div className='back'></div>
            <div className='left'></div>
            <div className='right'></div>
            <div className='top'>
              <div className='ballShadow'></div>
            </div>
            <div className='bottom'></div>
          </div>
          <div className='ball'></div>
        </div>
      </div> */
}
