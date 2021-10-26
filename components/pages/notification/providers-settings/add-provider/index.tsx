import { CButton, CCol } from '@coreui/react-pro';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

import AddProviderModalNotification from 'components/pages/notification/providers-settings/add-provider/modal';
interface AddProviderNotificationProps {
  getProviders: any;
}

const AddProviderNotification: React.FC<AddProviderNotificationProps> = ({ getProviders }) => {
  const { t } = useTranslation('pages_notification_providers-setting');

  const [toggleModal, setToggleModal] = useState<boolean>(false);

  const handleToggleModal = (value: boolean) => setToggleModal(value);

  return (
    <>
      <CCol>
        <div className='d-flex'>
          <CButton className='ms-auto' onClick={() => handleToggleModal(true)}>
            <div className='d-flex align-items-center gap-1' color='primary'>
              <span className='hidden--xs'>{t('addNew.title')}</span>
              <i className='cil-plus '></i>
            </div>
          </CButton>
        </div>
      </CCol>
      <AddProviderModalNotification getProviders={getProviders} show={toggleModal} onHide={handleToggleModal} />
    </>
  );
};

export default AddProviderNotification;
