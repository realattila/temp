import { CFormInput } from '@coreui/react-pro';
import MyButton from 'components/common/my-button';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import AdvancedSearchHeaderAuditMonitoring from './advanced-search';

interface AuditLogHeadingMonitioringProps {
  openSettings: Function;
}

const AuditLogHeadingMonitioring: React.FC<AuditLogHeadingMonitioringProps> = ({ openSettings }) => {
  const { t } = useTranslation('pages_monitoring_[name]');
  const [showAdvancedSearch, setShowAdvancedSearch] = useState<boolean>(false);
  const handleOpenShowAdvancedSearch = () => setShowAdvancedSearch(true);
  const handleCloseShowAdvancedSearch = () => setShowAdvancedSearch(false);
  return (
    <div className='monitoring-name__header'>
      <div className='monitoring-name__header__box'>
        <div className='d-flex gap-2'>
          <CFormInput type='text' placeholder={t('auditLogs.header.search.placeholder')} />
          <MyButton variant='outline'>
            <i className='cil-zoom'></i>
          </MyButton>
        </div>
        <div className='d-flex gap-2 ms-auto'>
          <MyButton variant='outline' onClick={() => openSettings()}>
            <i className='cil-settings'></i>
          </MyButton>
          <MyButton variant='outline'>
            <i className='cil-copy'></i>
          </MyButton>

          {!showAdvancedSearch && (
            <MyButton onClick={() => handleOpenShowAdvancedSearch()}>
              {t('auditLogs.header.advancedSearch.title')}
            </MyButton>
          )}
          {showAdvancedSearch && (
            <MyButton onClick={() => handleCloseShowAdvancedSearch()}>
              <i className='cil-arrow-top'></i>
            </MyButton>
          )}
        </div>
      </div>
      {showAdvancedSearch && <AdvancedSearchHeaderAuditMonitoring />}
    </div>
  );
};

export default AuditLogHeadingMonitioring;
