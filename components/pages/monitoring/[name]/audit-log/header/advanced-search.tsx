import { CCol, CRow } from '@coreui/react-pro';
import { memo, useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import withForm from 'src/hook/form';
import MonitroingContext from 'store/context/monitoring';
import eventBus, { EVENT_BUS_ACTIONS } from 'services/event-bus';

import SelectInput from 'components/common/form/select-input';
import MyButton from 'components/common/my-button';
import DatePickerInput from 'components/common/form/date-picker-input';
import { FieldValues, SubmitHandler, useFormContext } from 'react-hook-form';
import SwitchInput from 'components/common/form/switch-input';

interface AdvancedSearchHeaderAuditMonitoringProps {
  handleSubmitForm: SubmitHandler<FieldValues>;
}

const AdvancedSearchHeaderAuditMonitoring: React.FC<AdvancedSearchHeaderAuditMonitoringProps> = ({
  handleSubmitForm,
}) => {
  const { t } = useTranslation('pages_monitoring_[name]');

  const { handleSubmit, reset, watch } = useFormContext();

  const { currentDatabasTables } = useContext(MonitroingContext);

  const tablesNameList = (currentDatabasTables.data || []).map((item: any) => {
    return { value: item.name, label: item.name };
  });

  useEffect(() => {
    eventBus.on(EVENT_BUS_ACTIONS.MONITORING.SEARCH_SUBMITED, (data) => {
      reset();
    });
    return () => {
      eventBus.remove(EVENT_BUS_ACTIONS.MONITORING.SEARCH_SUBMITED, () => {});
    };
  }, []);

  const resetForm = () => {
    reset();
  };

  const RenderDatePicker = () => {
    const showDateInFilterValue = watch('showDateInFilter');

    return (
      <>
        <CCol xxl={2} xl={2} lg={3} md={6} sm={6} xs={12} className='d-flex align-self-end mb-2'>
          <SwitchInput name='showDateInFilter' label={t('auditLogs.header.advancedSearch.showDateInFilter.label')} />
        </CCol>

        <CCol xs={12} sm={6} md={6} lg={4} xl={4} xxl={3}>
          {showDateInFilterValue && (
            <div className='monitoring-name__header__advanced-search__item'>
              <DatePickerInput
                name='ActionDateTime'
                showLabel
                label={t('auditLogs.header.advancedSearch.datePicker.label')}
              />
            </div>
          )}
        </CCol>
      </>
    );
  };

  return (
    <form
      onSubmit={handleSubmit((data) => {
        eventBus.dispatch(EVENT_BUS_ACTIONS.MONITORING.ADVANCED_SEARCH_SUBMITED, '');
        handleSubmitForm(data);
      })}
      className='monitoring-name__header__advanced-search'
    >
      <CRow className='align-items-end'>
        <CCol xs={12} sm={6} md={6} lg={4} xl={3} xxl={3}>
          <div className='monitoring-name__header__advanced-search__item'>
            <SelectInput
              name='tableName'
              label={t('auditLogs.header.advancedSearch.tabelName.label')}
              showLabel
              list={tablesNameList}
            />
          </div>
        </CCol>
        <CCol xs={12} sm={6} md={6} lg={4} xl={3} xxl={3}>
          <div className='monitoring-name__header__advanced-search__item'>
            <SelectInput
              name='actionType'
              label={t('auditLogs.header.advancedSearch.status.label')}
              showLabel
              list={[
                {
                  value: 'update',
                  label: 'Update',
                },
                {
                  value: 'delete',
                  label: 'Delete',
                },
              ]}
            />
          </div>
        </CCol>

        <RenderDatePicker />

        <CCol xs={12} className='d-flex'>
          <div className='monitoring-name__header__advanced-search__item d-flex ms-auto mt-2 gap-2'>
            <MyButton color='danger' variant='outline' onClick={() => resetForm()}>
              {t('auditLogs.header.advancedSearch.reset')}
            </MyButton>

            <MyButton type='submit'>{t('auditLogs.header.advancedSearch.submit')}</MyButton>
          </div>
        </CCol>
      </CRow>
    </form>
  );
};

export default memo(withForm(AdvancedSearchHeaderAuditMonitoring));
