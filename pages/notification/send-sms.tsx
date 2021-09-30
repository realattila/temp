import { useEffect, useState } from 'react';
import { GetStaticProps, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'react-i18next';
import { CCol, CContainer, CRow } from '@coreui/react-pro';

import { getNotificationProvidersAPI } from 'services/api/notification';

import DashboardLayout from 'components/layout/dashboard';
import SeoHead from 'components/common/seo-head';
import SendSmsNotificationForm from 'components/pages/notification/send-sms/form';
import LoadingSession from 'components/common/loading-session';

const SendSmsNotification: NextPage = () => {
  const { t } = useTranslation('pages_notification_send-sms');

  const [notificationProvidersData, setNotificationProvidersData] = useState<any>(null);
  const [notificationProvidersLoading, setNotificationProvidersLoading] = useState<boolean>(true);
  const [notificationProvidersError, setNotificationProvidersError] = useState<any>(null);

  const getNotificationProviders = async () => {
    setNotificationProvidersLoading(true);
    setNotificationProvidersData(null);
    setNotificationProvidersError(null);
    const res = await getNotificationProvidersAPI();
    if (!res.hasError) {
      setNotificationProvidersData(res.data);
    } else {
      setNotificationProvidersError(res.errorText);
    }
    setNotificationProvidersLoading(false);
  };

  useEffect(() => {
    getNotificationProviders();
  }, []);

  let providersList: Array<any> = [];

  if (!!notificationProvidersData) {
    notificationProvidersData.map((item: any) => {
      if (item.isActive) {
        providersList.push({
          value: item.providerName,
          label: item.providerName,
          toTestNumber: item.toTestNumber,
        });
      }
    });
  }

  return (
    <>
      <DashboardLayout>
        <h1 className='  dashboard__title'>{t('title')}</h1>
        <CContainer>
          <CRow className='justify-content-center'>
            <CCol xs={12} sm={12} md={12} lg={10} xl={8} xxl={6}>
              <LoadingSession
                data={!!notificationProvidersData}
                loading={notificationProvidersLoading}
                error={notificationProvidersError}
                onRetry={getNotificationProviders}
                style={{ height: '400px' }}
              >
                <SendSmsNotificationForm providersList={providersList} />
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
export default SendSmsNotification;
