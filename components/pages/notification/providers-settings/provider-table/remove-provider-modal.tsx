import { CAlert, CLoadingButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react-pro';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { removeProvderNotificationAPI } from 'services/api/notification';

interface RemoveProviderModalNotificationProps {
  show: boolean;
  onHide: Function;
  data?: any;
  getProviders?: any;
}

const RemoveProviderModalNotification: React.FC<RemoveProviderModalNotificationProps> = ({
  onHide,
  show,
  data,
  getProviders = () => {},
}) => {
  const { t } = useTranslation('pages_notification_providers-setting');

  const [apiLoading, setApiLoading] = useState<boolean>(false);
  const [apiError, setApiError] = useState<any>(null);

  const handleRemoveProvider = async () => {
    setApiError(null);
    setApiLoading(false);

    const formData: FormData = new FormData();

    formData.append('guid', data.guid);

    const res = await removeProvderNotificationAPI(formData);

    if (!res.hasError) {
      setApiLoading(false);
      onHide();
      await getProviders();
    } else {
      setApiLoading(false);
      setApiError(res?.data?.error || res?.response?.data?.error || true);
    }
  };

  return (
    <CModal size='lg' visible={show} alignment='center' onDismiss={() => !apiLoading && onHide(false)}>
      <CModalHeader onDismiss={() => onHide()}>
        <CModalTitle>{t('table.removeProviderModal.title')}</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <p>{t('table.removeProviderModal.content', { name: data?.providerName })}</p>
        {!!apiError && (
          <CAlert className='mt-2' color='danger'>
            {apiError}
          </CAlert>
        )}
      </CModalBody>
      <CModalFooter>
        <CLoadingButton
          disabled={apiLoading}
          loading={apiLoading}
          className='px-5'
          color='danger'
          onClick={() => handleRemoveProvider()}
        >
          {t('table.removeProviderModal.submit')}
        </CLoadingButton>
        <CLoadingButton
          disabled={apiLoading}
          loading={apiLoading}
          className='px-5'
          variant='outline'
          onClick={() => !apiLoading && onHide()}
        >
          {t('table.removeProviderModal.cancel')}
        </CLoadingButton>
      </CModalFooter>
    </CModal>
  );
};

export default RemoveProviderModalNotification;
