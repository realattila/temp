import { useState } from 'react';
import {
  CButton,
  CLoadingButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from '@coreui/react-pro';
import { useTranslation } from 'react-i18next';

import AddEditProviderFormNotification from 'components/pages/notification/providers-settings/add-edit-provider-form';
import { addProvderNotificationAPI } from 'services/api/notification';

interface AddProviderModalNotificationProps {
  show: boolean;
  onHide: Function;
  getProviders?: any;
}

const AddProviderModalNotification: React.FC<AddProviderModalNotificationProps> = ({ show, onHide, getProviders }) => {
  const { t } = useTranslation('pages_notification_providers-setting');

  const [apiLoading, setApiLoading] = useState<boolean>(false);
  const [apiError, setApiError] = useState<any>(null);

  const handleSubmitForm = async (data: any) => {
    setApiLoading(true);

    const res = await addProvderNotificationAPI(data);

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
        <CModalTitle>{t('addEditModal.titles.add')}</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <AddEditProviderFormNotification error={apiError} loading={apiLoading} handleSubmitForm={handleSubmitForm} />
      </CModalBody>
    </CModal>
  );
};

export default AddProviderModalNotification;
