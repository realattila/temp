import { CAlert, CLoadingButton } from '@coreui/react-pro';
import { useTranslation } from 'react-i18next';

import TextInput from 'components/common/form/text-input';
import SelectInput from 'components/common/form/select-input';
import TextAreaInput from 'components/common/form/text-area-input';
import Form from 'components/common/form';
import { useEffect, useState } from 'react';
import { sendSmsExperimentalNotificationAPI } from 'services/api/notification';
import ErrorInApiAlert from 'components/common/error-in-api-alert';
import { useFormContext } from 'react-hook-form';

interface SendSmsNotificationFormProps {
  providersList: any;
}

const SendSmsNotificationForm: React.FC<SendSmsNotificationFormProps> = ({ providersList }) => {
  const { t } = useTranslation('pages_notification_send-sms');

  const [sendSmsLoading, SetSendSmsLoading] = useState<boolean>(false);
  const [sendSmsError, setSendSmsError] = useState<any>(null);
  const [sendSmsSuccess, setSendSmsSuccess] = useState<boolean>(false);

  const handleSendSms = async (data: any) => {
    SetSendSmsLoading(true);
    setSendSmsSuccess(false);
    setSendSmsError(null);
    const res = await sendSmsExperimentalNotificationAPI({
      ...data,
      RequesterName: 'DSUSer',
      RequesterFaName: '-',
      NotificationType: 'SMSSecurity',
    });

    if (!res.hasError) {
      setSendSmsSuccess(true);
    } else {
      setSendSmsError(res.errorText);
    }
    SetSendSmsLoading(false);
  };

  const RenderRecipientInput = () => {
    const { setValue, watch } = useFormContext();
    const [disable, setDisable] = useState<boolean>(false);
    const providerNameValue = watch('providerName');

    useEffect(() => {
      if (!!providerNameValue) {
        (providersList || []).map((item: any) => {
          if (item.value === providerNameValue) {
            if (!!item.toTestNumber) {
              setDisable(true);
            } else {
              setDisable(false);
            }
            setValue('Recipient', item.toTestNumber || '');
          } else {
            setDisable(false);
            setValue('Recipient', '');
          }
        });
      }
    }, [providerNameValue]);

    return (
      <TextInput
        disabled={disable}
        name='Recipient'
        label={t('form.phone.label')}
        placeholder={t('form.phone.placeholder')}
        showLabel
        required
      />
    );
  };

  return (
    <div className='bg-white p-4'>
      <Form onSubmit={handleSendSms}>
        <div className='d-flex flex-column gap-2'>
          <SelectInput name='providerName' label={t('form.provider.label')} showLabel list={providersList} required />
          <RenderRecipientInput />
          <TextAreaInput
            name='Body'
            label={t('form.body.label')}
            placeholder={t('form.body.placeholder')}
            showLabel
            required
          />
          <CLoadingButton loading={sendSmsLoading} disabled={sendSmsLoading} className='mt-4' type='submit'>
            {t('form.submit')}
          </CLoadingButton>
          {sendSmsSuccess && (
            <CAlert className='mt-2' color='success'>
              {t('form.success')}
            </CAlert>
          )}
          {!!sendSmsError && <ErrorInApiAlert className='mt-2'>{sendSmsError}</ErrorInApiAlert>}
        </div>
      </Form>
    </div>
  );
};

export default SendSmsNotificationForm;
