import { CAlert, CLoadingButton } from '@coreui/react-pro';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import withForm from 'src/hook/form';

import TextInput from 'components/common/form/text-input';

interface AddTableToDatabaseMonitoringProps {
  loading: boolean;
  error: any;
  success: boolean;
  submitForm: Function;
}

const AddTableToDatabaseMonitoring: React.FC<AddTableToDatabaseMonitoringProps> = ({
  submitForm,
  loading,
  error,
  success,
}) => {
  const { t } = useTranslation(['pages_monitoring_[name]']);

  const { handleSubmit, setValue } = useFormContext();

  const handleSubmitForm = async (data: any) => {
    const success = await submitForm(data);
    success && setValue('name', '');
  };

  return (
    <div className='mt-4'>
      <h6>{t('settingsModal.addTable.title')}</h6>
      <p className='text-secondary'>
        <small>{t('settingsModal.addTable.content')}</small>
      </p>
      <form
        className='d-flex gap-2 flex-column justify-content-start align-items-start'
        onSubmit={handleSubmit(handleSubmitForm)}
      >
        <div className='w-100'>
          <TextInput
            name='name'
            label={t('settingsModal.addTable.form.name.label')}
            showLabel
            placeholder={t('settingsModal.addTable.form.name.placeholder')}
            required
          />
        </div>

        <CLoadingButton type='submit' loading={loading} disabled={loading}>
          {t('settingsModal.addTable.form.submit')}
        </CLoadingButton>
        {!!error && (
          <CAlert className=' w-100' color='danger'>
            {error}
          </CAlert>
        )}
        {success && (
          <CAlert className=' w-100' color='success'>
            {t('settingsModal.addTable.form.success')}
          </CAlert>
        )}
      </form>
    </div>
  );
};

export default withForm(AddTableToDatabaseMonitoring);
