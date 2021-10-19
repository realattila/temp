import {
  CAccordionBody,
  CAccordionButton,
  CAccordionCollapse,
  CAccordionHeader,
  CAccordionItem,
  CBadge,
} from '@coreui/react-pro';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import jalaliMoment from 'jalali-moment';

interface AuditLogMonitoringListItemProps {
  status: {
    content: string;
    type:
      | 'primary'
      | 'secondary'
      | 'success'
      | 'danger'
      | 'warning'
      | 'info'
      | 'dark'
      | 'light'
      | 'primary-gradient'
      | 'secondary-gradient'
      | 'success-gradient'
      | 'danger-gradient'
      | 'warning-gradient'
      | 'info-gradient'
      | 'dark-gradient'
      | 'light-gradient'
      | string;
  };
  data: any;
}

const AuditLogMonitoringListItem: React.FC<AuditLogMonitoringListItemProps> = ({ status, data }) => {
  const [activeKey, setActiveKey] = useState(0);

  const { t } = useTranslation(['pages_monitoring_[name]']);

  return (
    <CAccordionItem className='monitoring-name__results__item'>
      <CAccordionHeader>
        <CAccordionButton
          collapsed={activeKey !== 1}
          onClick={() => (activeKey === 1 ? setActiveKey(0) : setActiveKey(1))}
        >
          <div className='monitoring-name__results__item__status '>
            <CBadge color={status.type}>{status.content}</CBadge>
          </div>
          <div className='d-flex  gap-4 flex-wrap'>
            <div className='text-right'>
              <div className='text-secondary d-flex gap-2 align-items-center'>
                <span>{t('auditLogs.list.item.username')}</span>
              </div>
              <div>{data?.userName}</div>
            </div>
            <div className='text-right'>
              <div className='text-secondary d-flex gap-2 align-items-center'>
                <span>{t('auditLogs.list.item.details.tableNameFa')}</span>
              </div>
              <div>{data?.tableNameFa || data?.tableName}</div>
            </div>
            <div className='text-right'>
              <div className='text-secondary d-flex gap-2 align-items-center'>
                <span>{t('auditLogs.list.item.details.fieldNameFa')}</span>
              </div>
              <div>{data?.fieldNameFa || data?.fieldName}</div>
            </div>
            <div className='text-right d-flex flex-column '>
              <div className='text-secondary d-flex gap-2 align-items-center text-size-small'>
                <span>{t('auditLogs.list.item.details.originalValueOnUpdate')}</span>
              </div>
              <div>{data?.originalValueOnUpdate}</div>
            </div>
            <div className='text-right d-flex flex-column '>
              <div className='text-secondary d-flex gap-2 align-items-center text-size-small'>
                <span>{t('auditLogs.list.item.details.currentValue')}</span>
              </div>
              <div>{data?.currentValue}</div>
            </div>
            <div className='text-right d-flex flex-column '>
              <div className='text-secondary d-flex gap-2 align-items-center text-size-small'>
                <i className='cil-clock'></i>
                <span>{t('auditLogs.list.item.actionDate')}</span>
              </div>
              <div>{jalaliMoment(data?.actionDateTime).format('jYYYY/jM/jD HH:mm')}</div>
            </div>
          </div>
        </CAccordionButton>
      </CAccordionHeader>
      <CAccordionCollapse visible={activeKey === 1}>
        <CAccordionBody>
          <div className='d-flex flex-column gap-2'>
            <div>
              <span>
                <strong>{t('auditLogs.list.item.details.rowId')}</strong>
              </span>
              <span> : </span>
              <span>{data?.rowId}</span>
            </div>
            <div>
              <span>
                <strong>{t('auditLogs.list.item.details.originalValueOnUpdate')}</strong>
              </span>
              <span> : </span>
              <span>{data?.originalValueOnUpdate}</span>
            </div>
            <div>
              <span>
                <strong>{t('auditLogs.list.item.details.originalValuesOnDelete')}</strong>
              </span>
              <span> : </span>
              <span className='ltr'>{data?.originalValuesOnDelete}</span>
            </div>
            <div>
              <span>
                <strong>{t('auditLogs.list.item.details.currentValue')}</strong>
              </span>
              <span> : </span>
              <span>{data?.currentValue}</span>
            </div>
            <div>
              <span>
                <strong>{t('auditLogs.list.item.details.rc')}</strong>
              </span>
              <span> : </span>
              <span>{data?.rc}</span>
            </div>
            <div>
              <span>
                <strong>{t('auditLogs.list.item.details.archive')}</strong>
              </span>
              <span> : </span>
              <span>{data?.archive}</span>
            </div>
            <div>
              <span>
                <strong>{t('auditLogs.list.item.tableName')}</strong>
              </span>
              <span> : </span>
              <span>{data?.tableName}</span>
            </div>
            <div>
              <span>
                <strong>{t('auditLogs.list.item.fieldName')}</strong>
              </span>
              <span> : </span>
              <span>{data?.fieldName}</span>
            </div>
            <div>
              <span>
                <strong>{t('auditLogs.list.item.details.tableNameFa')}</strong>
              </span>
              <span> : </span>
              <span>{data?.tableNameFa}</span>
            </div>
            <div>
              <span>
                <strong>{t('auditLogs.list.item.details.fieldNameFa')}</strong>
              </span>
              <span> : </span>
              <span>{data?.fieldNameFa}</span>
            </div>
            <div>
              <span>
                <strong>{t('auditLogs.list.item.details.folderCode')}</strong>
              </span>
              <span> : </span>
              <span>{data?.folderCode}</span>
            </div>
            <div>
              <span>
                <strong>{t('auditLogs.list.item.details.requestNO')}</strong>
              </span>
              <span> : </span>
              <span>{data?.requestNO}</span>
            </div>

            <div>
              <span>
                <strong>{t('auditLogs.list.item.ip')}</strong>
              </span>
              <span> : </span>
              <span>{data?.ip}</span>
            </div>
          </div>
        </CAccordionBody>
      </CAccordionCollapse>
    </CAccordionItem>
  );
};

export default AuditLogMonitoringListItem;
