import { useTranslation } from 'next-i18next';
import { useFormContext } from 'react-hook-form';
import { CButton, CCol, CRow } from '@coreui/react-pro';

import DatePickerInput from 'components/common/form/date-picker-input';
import Form from 'components/common/form';

import SelectInput from 'components/common/form/select-input';
import PhoneNumberInput from 'components/common/form/phone-number-input';
import SwitchInput from 'components/common/form/switch-input';
import TextInput from 'components/common/form/text-input';
import withForm from 'src/hook/form';

interface FilterLogsSmssTableNotificationProps {
  providers: any;
  handleChangeFilters: (data?: any) => void;
}

const FilterLogsSmssTableNotification: React.FC<FilterLogsSmssTableNotificationProps> = ({
  providers,
  handleChangeFilters,
}) => {
  const { t } = useTranslation('pages_notification_show-smss');

  const { watch, reset, handleSubmit } = useFormContext();

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

  const resetFormData = () => {
    reset({
      Recipient: '',
      ObjectValue: '',
      Body: '',
    });
  };

  const RenderDatePicker = () => {
    const showDateInFilterValue = watch('showDateInFilter');

    return (
      <>
        <CCol className='d-flex align-self-end mb-2'>
          <SwitchInput name='showDateInFilter' label={t('filters.showDateInFilter.label')} defaultValue={false} />
        </CCol>
        <CCol xxl={2} xl={3} lg={6} md={12} className='mb-2'>
          {showDateInFilterValue && (
            <DatePickerInput name='CreateDate' label={t('filters.createDate.label')} defaultValue={new Date()} />
          )}
        </CCol>
      </>
    );
  };

  return (
    <div className='shadow p-4 bg-white mb-3 '>
      <h4>{t('filters.title')}</h4>
      <form onSubmit={handleSubmit(handleChangeFilters)}>
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
              defaultValue=''
            />
          </CCol>
          <CCol xxl={2} xl={3} lg={6} md={12} className='mb-2'>
            <TextInput
              name='ObjectValue'
              label={t('filters.objectValue.label')}
              placeholder={t('filters.objectValue.placeholder')}
              showLabel
              defaultValue=''
            />
          </CCol>

          <CCol xxl={2} xl={3} lg={6} md={12} className='mb-2'>
            <TextInput
              name='Body'
              label={t('filters.body.label')}
              placeholder={t('filters.body.placeholder')}
              showLabel
              defaultValue=''
            />
          </CCol>
          <RenderDatePicker />

          <CCol sm={12} className='d-flex gap-2'>
            <CButton onClick={() => resetFormData()} className='mt-2' color='danger' variant='outline'>
              {t('filters.reset')}
            </CButton>

            <CButton className='me-auto mt-2' type='submit'>
              {t('filters.submit')}
            </CButton>
          </CCol>
        </CRow>
      </form>
    </div>
  );
};

export default withForm(FilterLogsSmssTableNotification);
