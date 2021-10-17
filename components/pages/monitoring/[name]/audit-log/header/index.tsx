import zipcelx from 'zipcelx';
import { useContext, useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import MonitroingContext from 'store/context/monitoring';

import Form, { FieldValues } from 'components/common/form';
import TextInput from 'components/common/form/text-input';
import MyButton from 'components/common/my-button';

import AdvancedSearchHeaderAuditMonitoring from 'components/pages/monitoring/[name]/audit-log/header/advanced-search';

import config from 'components/pages/monitoring/[name]/audit-log/header/excelConfig';

interface AuditLogHeadingMonitioringProps {
  openSettings: Function;
  handlechangeAdvancedSearch: SubmitHandler<FieldValues>;
  handleChangeSearch: SubmitHandler<FieldValues>;
  auditLogsData: any;
}

const AuditLogHeadingMonitioring: React.FC<AuditLogHeadingMonitioringProps> = ({
  openSettings,
  handlechangeAdvancedSearch,
  handleChangeSearch,
  auditLogsData,
}) => {
  const { currentDatabasTables } = useContext(MonitroingContext);
  const { t } = useTranslation('pages_monitoring_[name]');
  const [showAdvancedSearch, setShowAdvancedSearch] = useState<boolean>(false);
  const handleOpenShowAdvancedSearch = () => setShowAdvancedSearch(true);
  const handleCloseShowAdvancedSearch = () => setShowAdvancedSearch(false);

  const handleCreateExcel = () => {
    (auditLogsData?.items || []).map((item: any, index: number) => {
      config.sheet.data.push([
        {
          value: index + 1,
          type: 'string',
        },
        {
          value: item?.actionDateTime,
          type: 'string',
        },
        {
          value: item?.ip,
          type: 'string',
        },
        {
          value: item?.fieldNameFa || item?.fieldName,

          type: 'string',
        },
        {
          value: item?.tableNameFa || item?.tableName,

          type: 'string',
        },
        {
          value: item?.userName,

          type: 'string',
        },
        {
          value: item?.rowId,

          type: 'string',
        },
        {
          value: item?.originalValuesOnDelete,

          type: 'string',
        },
        {
          value: item?.currentValue,

          type: 'string',
        },
        {
          value: item?.rc,

          type: 'string',
        },
        {
          value: item?.archive,

          type: 'string',
        },
        {
          value: item?.folderCode,

          type: 'string',
        },

        {
          value: item?.requestNO,

          type: 'string',
        },
      ]);
    });
    zipcelx(config);
  };

  return (
    <div className='monitoring-name__header'>
      <div className='monitoring-name__header__box'>
        <Form onSubmit={handleChangeSearch}>
          <div className='d-flex gap-2'>
            <TextInput name='search' placeholder={t('auditLogs.header.search.placeholder')} />
            <MyButton type='submit' variant='outline'>
              <i className='cil-zoom'></i>
            </MyButton>
          </div>
        </Form>

        <div className='d-flex gap-2 ms-auto'>
          <MyButton variant='outline' onClick={() => openSettings()}>
            <i className='cil-settings'></i>
          </MyButton>
          <MyButton variant='outline' onClick={() => handleCreateExcel()}>
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
      {showAdvancedSearch && <AdvancedSearchHeaderAuditMonitoring handleSubmitForm={handlechangeAdvancedSearch} />}
    </div>
  );
};

export default AuditLogHeadingMonitioring;
