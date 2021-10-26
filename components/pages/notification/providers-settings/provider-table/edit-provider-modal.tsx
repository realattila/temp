import { CModal, CModalBody, CModalHeader, CModalTitle } from '@coreui/react-pro';
import { useTranslation } from 'react-i18next';

import AddEditProviderFormNotification from 'components/pages/notification/providers-settings/add-edit-provider-form';
import { useState } from 'react';
import { addProvderNotificationAPI } from 'services/api/notification';

interface EditProviderModalNotificationProps {
  show: boolean;
  onHide: Function;
  data?: any;
  getProviders?: any;
}

const EditProviderModalNotification: React.FC<EditProviderModalNotificationProps> = ({
  show,
  onHide,
  data,
  getProviders,
}) => {
  const { t } = useTranslation('pages_notification_providers-setting');

  const [apiLoading, setApiLoading] = useState<boolean>(false);

  const [apiError, setApiError] = useState<any>(null);

  const handleSubmitForm = async (formDataSubmit: any) => {
    setApiLoading(true);

    const res = await addProvderNotificationAPI({ ...formDataSubmit, guid: data?.guid });

    if (!res.hasError) {
      setApiLoading(false);
      await getProviders();
    } else {
      setApiError(res?.data || res?.response?.data || true);
      setApiLoading(false);
    }
  };

  return (
    <CModal size='lg' visible={show} alignment='center' onDismiss={() => onHide(false)}>
      <CModalHeader onDismiss={() => onHide()}>
        <CModalTitle>{t('addEditModal.titles.edit', { name: data?.providerName || 'no Name' })}</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <AddEditProviderFormNotification
          loading={apiLoading}
          error={apiError}
          data={data}
          handleSubmitForm={handleSubmitForm}
        />
      </CModalBody>
    </CModal>
  );
};

export default EditProviderModalNotification;
