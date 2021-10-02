import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'react-i18next';
import { CContainer, CRow } from '@coreui/react-pro';
import { useEffect, useState } from 'react';

import DashboardLayout from 'components/layout/dashboard';
import SeoHead from 'components/common/seo-head';
import AddProviderNotification from 'components/pages/notification/providers-settings/add-provider';
import { getNotificationProvidersAPI } from 'services/api/notification';
import LoadingSession from 'components/common/loading-session';
import ProviderTableNotification from 'components/pages/notification/providers-settings/provider-table';

const ProvidersSettingDashboard = () => {
  const { t } = useTranslation('pages_notification_providers-setting');

  const [ProviderNotificationData, setProviderNotificationData] = useState<any>(null);
  const [providerNotificationError, setProviderNotificationError] = useState<any>(null);
  const [providerNotificationLoading, setProviderNotificationLoading] = useState<boolean>(true);

  const getProvidersNotification = async () => {
    setProviderNotificationLoading(true);
    setProviderNotificationError(null);
    setProviderNotificationData(null);
    const res = await getNotificationProvidersAPI();
    if (!res.hasError) {
      setProviderNotificationData(res.data);
    } else {
      setProviderNotificationError(res.errorText);
    }
    setProviderNotificationLoading(false);
  };

  useEffect(() => {
    getProvidersNotification();
  }, []);

  return (
    <>
      <DashboardLayout>
        <h1 className='dashboard__title'>{t('title')}</h1>
        <CContainer fluid>
          <CRow>
            <LoadingSession
              error={providerNotificationError}
              data={ProviderNotificationData}
              loading={providerNotificationLoading}
              onRetry={getProvidersNotification}
              style={{ height: '400px' }}
            >
              <AddProviderNotification getProviders={getProvidersNotification} />
              <ProviderTableNotification data={ProviderNotificationData} getProviders={getProvidersNotification} />
            </LoadingSession>
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

export default ProvidersSettingDashboard;
