import LoadingSession from 'components/common/loading-session';
import { useRouter } from 'next/router';
import { memo, useContext, useEffect, useState } from 'react';

import withContext from 'src/hoc/with-context';
import MonitoringContextContainer from 'store/context/monitoring/container';
import { getAuditLogsDataAPI, getAuditLogDatabaseTablesAPI } from 'services/api/monitoring';
import MonitroingContext from 'store/context/monitoring';

import SettingsModalMonitoring from '../settings-modal';
import AuditLogHeadingMonitioring from './header';

import { paginationType } from 'types/pagination';
import AuditLogMonitoringList from './list';

interface AuditLogMonitoringProps {}

const AuditLogMonitoring: React.FC<AuditLogMonitoringProps> = () => {
  const router = useRouter();

  const { getDatabaseTables, currentDatabasTables } = useContext(MonitroingContext);

  const [settingsModal, setSettingsModal] = useState<boolean>(false);

  const [loadingAuditLogsData, setLoadingAuditLogsData] = useState<boolean>(true);
  const [errorAuditLogsData, setErrorAuditLogsData] = useState<any>(null);
  const [auditLogsData, setAuditLogsData] = useState<any>(null);

  const [pagination, setPagination] = useState<paginationType>({
    pageNumber: 1,
    totalPages: 1,
    pageSize: 50,
  });

  const getAuditLogTablesData = async () => {
    await getDatabaseTables(String(router.query?.name));
  };

  const getAuditLogsData = async (pagination: any, filters: any) => {
    setLoadingAuditLogsData(true);
    setErrorAuditLogsData(null);
    setAuditLogsData(null);
    const res = await getAuditLogsDataAPI({
      pagination,
      filters: {},
      sort: ['CreateDate Desc'],
    });
    if (!res.hasError) {
      setAuditLogsData(res.data);
    } else {
      setErrorAuditLogsData(res.errorText);
    }
    setLoadingAuditLogsData(false);
  };

  const onRetryGetData = () => {
    //   currentDatabasTables.data is success
    if (!!currentDatabasTables.data) {
      getAuditLogTablesData();
    } else {
      getAuditLogsData(pagination, {});
    }
  };

  useEffect(() => {
    getAuditLogTablesData();
  }, []);

  useEffect(() => {
    //   currentDatabasTables.data is success
    if (!!currentDatabasTables.data) {
      getAuditLogsData(pagination, {});
    }
  }, [currentDatabasTables.data]);

  const handleShowSettingsModal = (data?: any) => setSettingsModal(data || true);
  const handleCloseSettingsModal = async (reloadData: boolean) => {
    if (reloadData) {
      getAuditLogTablesData();
      setSettingsModal(false);
    } else {
      setSettingsModal(false);
    }
  };

  return (
    <div className=''>
      {/* <LoadingSession
        loading={loadingAuditLogTablesData || loadingAuditLogsData}
        error={errorAuditLogTablesData || errorAuditLogsData}
        data={auditLogTablesData || auditLogsData}
        onRetry={() => onRetryGetData()}
        style={{ height: '400px' }}
      > */}

      <LoadingSession
        loading={currentDatabasTables.loading}
        error={currentDatabasTables.error}
        data={currentDatabasTables.data}
        onRetry={() => onRetryGetData()}
        style={{ height: '400px' }}
      >
        <AuditLogHeadingMonitioring openSettings={() => handleShowSettingsModal(true)} />

        <AuditLogMonitoringList data={auditLogsData} />

        {settingsModal && <SettingsModalMonitoring show={!!settingsModal} onHide={handleCloseSettingsModal} />}
      </LoadingSession>
    </div>
  );
};

export default memo(withContext(AuditLogMonitoring, MonitoringContextContainer));
