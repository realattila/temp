import LoadingSession from 'components/common/loading-session';
import { useRouter } from 'next/router';
import { memo, useContext, useEffect, useState } from 'react';

import withContext from 'src/hoc/with-context';
import MonitoringContextContainer from 'store/context/monitoring/container';
import { getAuditLogsDataAPI } from 'services/api/monitoring';
import MonitroingContext from 'store/context/monitoring';

import SettingsModalMonitoring from 'components/pages/monitoring/[name]/settings-modal/index';
import AuditLogHeadingMonitioring from 'components/pages/monitoring/[name]/audit-log/header/index';
import AuditLogMonitoringList from 'components/pages/monitoring/[name]/audit-log/list/index';

import { paginationType } from 'types/pagination';

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

  const [filters, setFilters] = useState<any>({});

  const getAuditLogTablesData = async () => {
    await getDatabaseTables(String(router.query?.name));
  };

  const getAuditLogsData = async (pagination: any, filters: any, OperationType: string = 'AND') => {
    setLoadingAuditLogsData(true);
    setErrorAuditLogsData(null);
    setAuditLogsData(null);
    const res = await getAuditLogsDataAPI({
      OperationType,
      pagination,
      filters: { ...filters, DatabaseName: router.query?.name },
      sort: ['CreateDate Desc'],
    });
    if (!res.hasError) {
      setAuditLogsData(res.data);
      setPagination({
        pageNumber: res.data?.pagination?.pageNumber,
        pageSize: res.data?.pagination?.pageSize,
        totalPages: Math.ceil(res.data?.total / res.data?.pagination?.pageSize),
      });
    } else {
      setErrorAuditLogsData(res.errorText);
    }
    setLoadingAuditLogsData(false);
  };

  useEffect(() => {
    getAuditLogTablesData();
  }, []);

  useEffect(() => {
    //   currentDatabasTables.data is success
    if (!!currentDatabasTables.data) {
      getAuditLogsData(pagination, filters, 'AND');
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

  const handleChangePage = async (data: any) => {
    const newPagination = { ...pagination, pageNumber: Number(data.page) };
    setPagination(newPagination);
    getAuditLogsData(newPagination, filters, 'AND');
  };

  const onRetryGetData = () => {
    //   currentDatabasTables.data is success
    if (!!currentDatabasTables.data) {
      getAuditLogTablesData();
    } else {
      getAuditLogsData(pagination, filters, 'AND');
    }
  };

  const handlechangeAdvancedSearch = async (data: any) => {
    if (!data.showDateInFilter) {
      delete data.ActionDateTime;
    }
    delete data.showDateInFilter;

    Object.keys(data).map((item) => {
      if (data[item] === '-1' || data[item] === '') {
        delete data[item];
      }
    });
    setFilters(data);
    getAuditLogsData({ ...pagination, pageNumber: 1 }, data, 'AND');
  };

  const handleChangeSearch = async (data: any) => {
    const searchFiels: Array<string> = [
      'ip',
      'fieldName',
      'tableName',
      'username',
      'rowId',
      'originalValueOnUpdate',
      'currentValue',
      'rc',
      'archive',
      'tableNameFa',
      'fieldNameFa',
      'folderCode',
      'requestNO',
    ];
    const newFilters: any = () => {
      let tempObject: any = {};
      if (data.search != '') {
        searchFiels.map((item) => {
          tempObject = { ...tempObject, [item]: data.search };
        });
      } else {
        searchFiels.map((item) => {
          delete tempObject[item];
        });
      }
      return tempObject;
    };

    setFilters(newFilters());
    getAuditLogsData({ ...pagination, pageNumber: 1 }, newFilters(), 'OR');
  };
  return (
    <div className=''>
      <LoadingSession
        loading={currentDatabasTables.loading}
        error={currentDatabasTables.error}
        data={currentDatabasTables.data}
        onRetry={() => onRetryGetData()}
        style={{ height: '400px' }}
      >
        <AuditLogHeadingMonitioring
          openSettings={() => handleShowSettingsModal(true)}
          handlechangeAdvancedSearch={handlechangeAdvancedSearch}
          handleChangeSearch={handleChangeSearch}
          auditLogsData={auditLogsData}
        />

        <LoadingSession
          loading={loadingAuditLogsData}
          error={errorAuditLogsData}
          data={auditLogsData?.items?.length}
          onRetry={() => onRetryGetData()}
          style={{ height: '400px' }}
        >
          <AuditLogMonitoringList data={auditLogsData} handleChangePage={handleChangePage} pagination={pagination} />
        </LoadingSession>

        {settingsModal && <SettingsModalMonitoring show={!!settingsModal} onHide={handleCloseSettingsModal} />}
      </LoadingSession>
    </div>
  );
};

export default memo(withContext(AuditLogMonitoring, MonitoringContextContainer));
