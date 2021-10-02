import { useTranslation } from 'next-i18next';
import { useFormContext } from 'react-hook-form';
import { CButton, CCol, CRow } from '@coreui/react-pro';

import DatePickerInput from 'components/common/form/date-picker-input';
import Form from 'components/common/form';

import SelectInput from 'components/common/form/select-input';
import PhoneNumberInput from 'components/common/form/phone-number-input';
import SwitchInput from 'components/common/form/switch-input';

interface FilterLogsSmssTableNotificationProps {
  providers: any;
  handleChangeFilters: (data?: any) => void;
}

const FilterLogsSmssTableNotification: React.FC<FilterLogsSmssTableNotificationProps> = ({
  providers,
  handleChangeFilters,
}) => {
  const { t } = useTranslation('pages_notification_show-smss');

  let providersList: Array<any> = [];

  if (!!providers) {
    (providers || []).map((item: any) => {
      providersList.push({
        value: item.providerName,
        label: item.providerName,
      });
    });
  }

  const notificationTypeList: Array<any> = [
    {
      value: 'SMS',
      label: t('filters.notificationType.items.sms'),
    },
    { value: 'SMSDorsa', label: t('filters.notificationType.items.smsDorsa') },
    { value: 'SMSSecurity', label: t('filters.notificationType.items.smsSecurity') },
  ];

  const statusTypeList: Array<any> = [
    {
      value: 'Done',
      label: t('filters.statusType.items.done'),
    },
    {
      value: 'Pending',
      label: t('filters.statusType.items.pending'),
    },
    {
      value: 'HasError',
      label: t('filters.statusType.items.hasError'),
    },
  ];

  const RenderDatePicker = () => {
    const { watch } = useFormContext();

    const showDateInFilterValue = watch('showDateInFilter');

    return (
      <>
        <CCol className='d-flex align-self-end mb-2'>
          <SwitchInput name='showDateInFilter' label={t('filters.showDateInFilter.label')} />
        </CCol>
        <CCol xxl={2} xl={3} lg={6} md={12} className='mb-2'>
          {showDateInFilterValue && <DatePickerInput name='CreateDate' label={t('filters.createDate.label')} />}
        </CCol>
      </>
    );
  };

  return (
    <div className='shadow p-4 bg-white mb-3 '>
      <h4>{t('filters.title')}</h4>
      <Form onSubmit={handleChangeFilters}>
        <CRow>
          <CCol xxl={2} xl={3} lg={6} md={12} className='mb-2'>
            <SelectInput
              name='NotificationType'
              list={notificationTypeList}
              label={t('filters.notificationType.label')}
              showLabel
            />
          </CCol>
          <CCol xxl={2} xl={3} lg={6} md={12} className='mb-2'>
            <SelectInput name='ProviderName' list={providersList} label={t('filters.providerName')} showLabel />
          </CCol>

          <CCol xxl={2} xl={3} lg={6} md={12} className='mb-2'>
            <SelectInput name='Status' list={statusTypeList} label={t('filters.statusType.label')} showLabel />
          </CCol>
          <CCol xxl={2} xl={3} lg={6} md={12} className='mb-2'>
            <PhoneNumberInput
              name='Recipient'
              label={t('filters.recipient.label')}
              placeholder={t('filters.recipient.placeholder')}
              showLabel
            />
          </CCol>

          <RenderDatePicker />

          <CCol sm={12} className='d-flex'>
            <CButton className='me-auto mt-2' type='submit' variant='outline'>
              {t('filters.submit')}
            </CButton>
          </CCol>
        </CRow>
      </Form>
    </div>
  );
};

export default FilterLogsSmssTableNotification;
