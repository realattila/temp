import { useState } from 'react';
import { CCol, CContainer, CRow } from '@coreui/react-pro';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'react-i18next';

import { AuthProvider } from 'services/auth-service';

import SeoHead from 'components/common/seo-head';
import DashboardLayout from 'components/layout/dashboard';
// import TabsMonitioring from 'components/pages/monitoring/[name]/tabs';
import AuditLogMonitoring from 'components/pages/monitoring/[name]/audit-log';

const MonitoringName = () => {
  const { t } = useTranslation(['pages_monitoring_[name]']);

  const [selectedTab, setSelectedTab] = useState<string>('audit');
  return (
    <>
      <CContainer className='monitoring-name'>
        <CRow>
          <CCol xs={12}>
            {/* <TabsMonitioring selectedTabState={[selectedTab, setSelectedTab]} /> */}
            {selectedTab === 'audit' && <AuditLogMonitoring />}
          </CCol>
        </CRow>
      </CContainer>

      <SeoHead title={t('seo.title')} description={t('seo.description')} />
    </>
  );
};

MonitoringName.getLayout = function getLayout(page: any) {
  return (
    <DashboardLayout>
      <AuthProvider>{page}</AuthProvider>
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

export default MonitoringName;
