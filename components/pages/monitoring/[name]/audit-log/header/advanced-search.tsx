import { CCol, CRow } from '@coreui/react-pro';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';

import withForm from 'src/hook/form';
import MonitroingContext from 'store/context/monitoring';

import DateRangePicker from 'components/common/form/date-range-picker';
import SelectInput from 'components/common/form/select-input';
import MyButton from 'components/common/my-button';

const AdvancedSearchHeaderAuditMonitoring: React.FC = () => {
  const { t } = useTranslation('pages_monitoring_[name]');

  const { currentDatabasTables } = useContext(MonitroingContext);

  const tablesNameList = (currentDatabasTables.data || []).map((item: any) => {
    return { value: item.name, label: item.name };
  });

  return (
    <div className='monitoring-name__header__advanced-search'>
      <CRow className='align-items-end'>
        <CCol xs={12} sm={6} md={6} lg={4} xl={4} xxl={3}>
          <div className='monitoring-name__header__advanced-search__item'>
            <DateRangePicker name='attila' showLabel label={t('auditLogs.header.advancedSearch.rangeDate.label')} />
          </div>
        </CCol>
        <CCol xs={12} sm={6} md={6} lg={4} xl={3} xxl={3}>
          <div className='monitoring-name__header__advanced-search__item'>
            <SelectInput
              name='sdasd'
              label={t('auditLogs.header.advancedSearch.tabelName.label')}
              showLabel
              list={tablesNameList}
            />
          </div>
        </CCol>
        <CCol xs={12} sm={6} md={6} lg={4} xl={3} xxl={3}>
          <div className='monitoring-name__header__advanced-search__item'>
            <SelectInput
              name='sdasd'
              label={t('auditLogs.header.advancedSearch.status.label')}
              showLabel
              list={[
                {
                  value: 'all',
                  label: 'همه',
                },
                {
                  value: 'none',
                  label: 'هیچ کدام',
                },
              ]}
            />
          </div>
        </CCol>
        <CCol xs={12} sm={6} md={6} lg={12} xl={2} xxl={3} className='d-flex'>
          <div className='monitoring-name__header__advanced-search__item d-flex ms-auto'>
            <MyButton type='submit'>{t('auditLogs.header.advancedSearch.submit')}</MyButton>
          </div>
        </CCol>
      </CRow>
    </div>
  );
};

export default withForm(AdvancedSearchHeaderAuditMonitoring);
