import { CCol, CRow } from '@coreui/react-pro';
import { useTranslation } from 'react-i18next';

import DashboardStatusCard from 'components/pages/dashboard/dashboard_status/dashboard_status_card';

interface DashboardStatusListProps {
  data: any;
}
const DashboardStatusList: React.FC<DashboardStatusListProps> = ({ data }) => {
  const { t } = useTranslation('page_dashboard');
  return (
    <div className='dashboard_page__status_list'>
      <CRow>
        <CCol xl={3} lg={3} md={6} sm={6} xs={12}>
          <DashboardStatusCard
            color='green'
            data={{
              label: t('status.card.done'),
              value: data.done,
            }}
          />
        </CCol>
        <CCol xl={3} lg={3} md={6} sm={6} xs={12}>
          <DashboardStatusCard
            color='orange'
            data={{
              label: t('status.card.pending'),
              value: data.pending,
            }}
          />
        </CCol>
        <CCol xl={3} lg={3} md={6} sm={6} xs={12}>
          <DashboardStatusCard
            color='red'
            data={{
              label: t('status.card.hasError'),
              value: data.hasError,
            }}
          />
        </CCol>
        <CCol xl={3} lg={3} md={6} sm={6} xs={12}>
          <DashboardStatusCard
            color='blue'
            data={{
              label: t('status.card.total'),
              value: data.total,
            }}
          />
        </CCol>
      </CRow>
    </div>
  );
};

export default DashboardStatusList;
