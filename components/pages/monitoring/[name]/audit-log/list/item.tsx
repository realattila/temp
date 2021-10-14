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
                <span>{t('auditLogs.list.item.tableName')}</span>
              </div>
              <div>{data?.tableName}</div>
            </div>
            <div className='text-right'>
              <div className='text-secondary d-flex gap-2 align-items-center'>
                <span>{t('auditLogs.list.item.fieldName')}</span>
              </div>
              <div>{data?.fieldName}</div>
            </div>
            <div className='text-right'>
              <div className='text-secondary d-flex gap-2 align-items-center'>
                <span>{t('auditLogs.list.item.ip')}</span>
              </div>
              <div>{data?.ip}</div>
            </div>
            <div className='text-right d-flex flex-column '>
              <div className='text-secondary d-flex gap-2 align-items-center text-size-small'>
                <i className='cil-clock'></i>
                <span>{t('auditLogs.list.item.actionDate')}</span>
              </div>
              <div>{data?.actionDateTime}</div>
            </div>
          </div>
        </CAccordionButton>
      </CAccordionHeader>
      <CAccordionCollapse visible={activeKey === 1}>
        <CAccordionBody>
          <strong>This is the first item&#39;s accordion body.</strong> It is hidden by default, until the collapse
          plugin adds the appropriate classes that we use to style each element. These classes control the overall
          appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS
          or overriding our default variables. It&#39;s also worth noting that just about any HTML can go within the{' '}
          <code>.accordion-body</code>, though the transition does limit overflow.
        </CAccordionBody>
      </CAccordionCollapse>
    </CAccordionItem>
  );
};

export default AuditLogMonitoringListItem;
