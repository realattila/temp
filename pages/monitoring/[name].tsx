import { useState } from 'react';
import { CCol, CContainer, CRow } from '@coreui/react-pro';
import { GetServerSideProps, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { ParsedUrlQuery } from 'querystring';
import { useTranslation } from 'react-i18next';

import SeoHead from 'components/common/seo-head';
import DashboardLayout from 'components/layout/dashboard';
import TabsMonitioring from 'components/pages/monitoring/[name]/tabs';
import AuditLogMonitoring from 'components/pages/monitoring/[name]/audit-log';

interface MonitoringNameProps {
  query: ParsedUrlQuery;
}

const MonitoringName: NextPage<MonitoringNameProps> = ({ query }) => {
  const { t } = useTranslation(['pages_monitoring_[name]']);

  const [selectedTab, setSelectedTab] = useState<string>('audit');
  return (
    <>
      <DashboardLayout>
        <CContainer className='monitoring-name'>
          <CRow>
            <CCol xs={12}>
              <TabsMonitioring selectedTabState={[selectedTab, setSelectedTab]} />
              {selectedTab === 'audit' && <AuditLogMonitoring />}
            </CCol>
          </CRow>
        </CContainer>
      </DashboardLayout>
      <SeoHead title={t('seo.title')} description={t('seo.description')} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ locale, query }) => {
  return {
    props: {
      ...(await serverSideTranslations(String(locale))),
      query: query,
    },
  };
};

export default MonitoringName;
