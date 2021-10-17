import { CModal, CModalBody, CModalHeader, CModalTitle } from '@coreui/react-pro';
import { useTranslation } from 'react-i18next';

import randomIntNumber from 'utility/random-int-number';

interface DetailsModallogSmssTableNotificationProps {
  onHide: Function;
  show: boolean;
  data: any;
}

const DetailsModallogSmssTableNotification: React.FC<DetailsModallogSmssTableNotificationProps> = ({
  data,
  show,
  onHide,
}) => {
  const { t } = useTranslation('pages_notification_show-smss');

  return (
    <CModal size='lg' visible={show} alignment='center' onDismiss={() => onHide(false)}>
      <CModalHeader onDismiss={() => onHide()}>
        <CModalTitle>{t('table.logDetailModal.title')}</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <div className='d-flex flex-column gap-2'>
          <div>
            <strong>{t(`table.head.items.id`)}</strong>
            <span> : </span>
            <span>{data?.id}</span>
          </div>

          <div>
            <strong>{t(`table.head.items.requesterName`)}</strong>
            <span> : </span>
            <span>{data?.requesterName}</span>
          </div>

          <div>
            <strong>{t(`table.head.items.recipient`)}</strong>
            <span> : </span>
            <span>{data?.recipient}</span>
          </div>

          <div>
            <strong>{t(`table.head.items.status`)}</strong>
            <span> : </span>
            <span>{data?.status}</span>
          </div>

          <div>
            <strong>{t(`table.head.items.createDateFa`)}</strong>
            <span> : </span>
            <span>{data?.createDateFa}</span>
          </div>

          <div>
            <strong>{t(`table.head.items.providerName`)}</strong>
            <span> : </span>
            <span>{data?.providerName}</span>
          </div>

          <div>
            <strong>{t(`table.head.items.body`)}</strong>
            <span> : </span>
            <span>{data?.body}</span>
          </div>

          {/* <div>
            <strong>{t(`table.head.items.notificationType`)}</strong>
            <span> : </span>
            <span>{data?.notificationType}</span>
          </div> */}
        </div>
      </CModalBody>
    </CModal>
  );
};

export default DetailsModallogSmssTableNotification;
