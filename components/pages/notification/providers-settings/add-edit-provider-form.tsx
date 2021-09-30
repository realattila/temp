import { CAlert, CCol, CContainer, CLoadingButton, CRow } from '@coreui/react-pro';
import { useTranslation } from 'react-i18next';

import Form from 'components/common/form';
import TextInput from 'components/common/form/text-input';
import NumberInput from 'components/common/form/number-input';
import SwitchInput from 'components/common/form/switch-input';
import PhoneNumberInput from 'components/common/form/phone-number-input';

interface AddEditProviderFormNotificationProps {
  handleSubmitForm: (data?: any) => void;
  data?: any;
  loading?: boolean;
  error?: any;
}

const AddEditProviderFormNotification: React.FC<AddEditProviderFormNotificationProps> = ({
  handleSubmitForm,
  data = null,
  loading = false,
  error = null,
}) => {
  const { t } = useTranslation('pages_notification_providers-setting');

  return (
    <Form onSubmit={handleSubmitForm}>
      <CContainer>
        <CRow>
          <CCol xs={12} lg={6} xl={4} className='mb-3'>
            <TextInput
              name='providerName'
              label={t('addEditModal.form.providerName.label')}
              placeholder={t('addEditModal.form.providerName.placeholder')}
              defaultValue={!!data ? data?.providerName || '' : ''}
              required
              showLabel
            />
          </CCol>
          <CCol xs={12} lg={6} xl={4} className='mb-3'>
            <TextInput
              name='tokenUrl'
              label={t('addEditModal.form.tokenUrl.label')}
              placeholder={t('addEditModal.form.tokenUrl.placeholder')}
              defaultValue={!!data ? data?.tokenUrl || '' : ''}
              showLabel
            />
          </CCol>
          <CCol xs={12} lg={6} xl={4} className='mb-3'>
            <TextInput
              name='postUrl'
              label={t('addEditModal.form.postUrl.label')}
              placeholder={t('addEditModal.form.postUrl.placeholder')}
              defaultValue={!!data ? data?.postUrl || '' : ''}
              showLabel
            />
          </CCol>
          <CCol xs={12} lg={6} xl={4} className='mb-3'>
            <PhoneNumberInput
              name='fromNumber'
              label={t('addEditModal.form.fromNumber.label')}
              placeholder={t('addEditModal.form.fromNumber.placeholder')}
              defaultValue={!!data ? data?.fromNumber || '' : ''}
              showLabel
              required
            />
          </CCol>
          <CCol xs={12} lg={6} xl={4} className='mb-3'>
            <PhoneNumberInput
              name='toTestNumber'
              label={t('addEditModal.form.toTestNumber.label')}
              placeholder={t('addEditModal.form.toTestNumber.placeholder')}
              defaultValue={!!data ? data?.toTestNumber || '' : ''}
              showLabel
            />
          </CCol>
          <CCol xs={12} lg={6} xl={4} className='mb-3'>
            <NumberInput
              name='ports'
              label={t('addEditModal.form.ports.label')}
              placeholder={t('addEditModal.form.ports.placeholder')}
              defaultValue={!!data ? data?.ports || '' : ''}
              required
              showLabel
            />
          </CCol>
          <CCol xs={12} lg={6} xl={4} className='mb-3'>
            <SwitchInput
              name='isActive'
              label={t('addEditModal.form.isActive.label')}
              defaultValue={!!data ? data?.isActive : false}
            />
          </CCol>
          <CCol xs={12} className='d-flex'>
            <CLoadingButton color='success' loading={loading} disabled={loading} type='submit' className='ms-auto'>
              {!data ? t('addEditModal.form.submit.add') : t('addEditModal.form.submit.edit')}
            </CLoadingButton>
          </CCol>
          {!!error && (
            <CCol xs={12}>
              <CAlert className='mt-2' color='danger'>
                {error}
              </CAlert>
            </CCol>
          )}
        </CRow>
      </CContainer>
    </Form>
  );
};

export default AddEditProviderFormNotification;
