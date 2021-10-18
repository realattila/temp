import zipcelx from 'zipcelx';
import { useEffect, useState } from 'react';
import { SubmitHandler, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import Form, { FieldValues } from 'components/common/form';
import TextInput from 'components/common/form/text-input';
import MyButton from 'components/common/my-button';

import AdvancedSearchHeaderAuditMonitoring from 'components/pages/monitoring/[name]/audit-log/header/advanced-search';

import config from 'components/pages/monitoring/[name]/audit-log/header/excelConfig';
import eventBus, { EVENT_BUS_ACTIONS } from 'services/event-bus';
import withForm from 'src/hook/form';

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
  const { t } = useTranslation('pages_monitoring_[name]');
  const [showAdvancedSearch, setShowAdvancedSearch] = useState<boolean>(false);
  const handleOpenShowAdvancedSearch = () => setShowAdvancedSearch(true);
  const handleCloseShowAdvancedSearch = () => setShowAdvancedSearch(false);

  const handleCreateExcel = () => {
    let logsForExecl = auditLogsData;
    let newConfig = config;
    newConfig.sheet.data = [];
    newConfig.sheet.data.push([
      {
        value: 'ردیف ',
        type: 'string',
      },
      {
        value: 'تاریخ رویداد ',
        type: 'string',
      },
      {
        value: 'آی پی ',
        type: 'string',
      },
      {
        value: 'نام ستون',
        type: 'string',
      },
      {
        value: 'نام جدول',
        type: 'string',
      },
      {
        value: 'نام کاربری',
        type: 'string',
      },
      {
        value: 'شناسه',
        type: 'string',
      },
      {
        value: 'مقدار قبل حذف',
        type: 'string',
      },
      {
        value: 'مقدار کنونی',
        type: 'string',
      },
      {
        value: 'کد نوسازی',
        type: 'string',
      },
      {
        value: 'نام بایگانی',
        type: 'string',
      },
      {
        value: 'شماره پرونده',
        type: 'string',
      },
      {
        value: 'شماره درخواست',
        type: 'string',
      },
    ]);
    (logsForExecl?.items || []).map((item: any, index: number) => {
      newConfig.sheet.data.push([
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

    zipcelx(newConfig);
  };

  const SearchForm = withForm(() => {
    const { reset, handleSubmit } = useFormContext();
    useEffect(() => {
      eventBus.on(EVENT_BUS_ACTIONS.MONITORING.ADVANCED_SEARCH_SUBMITED, (data) => {
        reset({
          search: '',
        });
      });
      return () => {
        eventBus.remove(EVENT_BUS_ACTIONS.MONITORING.ADVANCED_SEARCH_SUBMITED, () => {});
      };
    }, []);

    const resetForm = () => {
      reset({
        search: '',
      });
    };

    return (
      <form
        onSubmit={handleSubmit((data) => {
          eventBus.dispatch(EVENT_BUS_ACTIONS.MONITORING.SEARCH_SUBMITED, '');
          handleChangeSearch(data);
        })}
      >
        <div className='d-flex gap-2'>
          <TextInput name='search' placeholder={t('auditLogs.header.search.placeholder')} />
          <MyButton onClick={() => resetForm()} color='danger' variant='outline'>
            <i className='cil-trash'></i>
          </MyButton>
          <MyButton type='submit'>
            <i className='cil-zoom'></i>
          </MyButton>
        </div>
      </form>
    );
  });

  return (
    <div className='monitoring-name__header'>
      <div className='monitoring-name__header__box'>
        <SearchForm />
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
