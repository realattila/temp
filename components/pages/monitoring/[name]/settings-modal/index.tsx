import { CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react-pro';
import MyButton from 'components/common/my-button';
import { useTranslation } from 'react-i18next';

interface SettingsModalMonitoringProps {
  show: boolean;
  onHide: Function;
}
const SettingsModalMonitoring: React.FC<SettingsModalMonitoringProps> = ({ show, onHide }) => {
  const { t } = useTranslation(['pages_monitoring_[name]']);

  const RenderItems = () => {
    return (
      <div className='monitoring-name__header__settings-modal__items'>
        <div className='monitoring-name__header__settings-modal__items__item'>
          <span className='monitoring-name__header__settings-modal__items__item__action'>
            <i className='cil-plus'></i>
          </span>
          <span>this database is fake</span>
        </div>
        <div className='monitoring-name__header__settings-modal__items__item'>
          <span className='monitoring-name__header__settings-modal__items__item__action'>
            <i className='cil-trash'></i>
          </span>
          <span>this database is fake</span>
        </div>
        <div className='monitoring-name__header__settings-modal__items__item'>
          <span className='monitoring-name__header__settings-modal__items__item__action'>
            <i className='cil-trash'></i>
          </span>
          <span>this database is fake</span>
        </div>
        <div className='monitoring-name__header__settings-modal__items__item'>
          <span className='monitoring-name__header__settings-modal__items__item__action'>
            <i className='cil-plus'></i>
          </span>
          <span>this database is fake</span>
        </div>
        <div className='monitoring-name__header__settings-modal__items__item'>
          <span className='monitoring-name__header__settings-modal__items__item__action'>
            <i className='cil-plus'></i>
          </span>
          <span>this database is fake</span>
        </div>
        <div className='monitoring-name__header__settings-modal__items__item'>
          <span className='monitoring-name__header__settings-modal__items__item__action'>
            <i className='cil-plus'></i>
          </span>
          <span>this database is fake</span>
        </div>
        <div className='monitoring-name__header__settings-modal__items__item'>
          <span className='monitoring-name__header__settings-modal__items__item__action'>
            <i className='cil-plus'></i>
          </span>
          <span>this database is fake</span>
        </div>
      </div>
    );
  };

  return (
    <CModal
      className='monitoring-name__header__settings-modal'
      visible={show}
      alignment='center'
      onDismiss={() => onHide(false)}
    >
      <CModalHeader onDismiss={() => onHide()}>
        <CModalTitle>{t('settingsModal.title')}</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <div className='p-2'>
          <h6>{t('settingsModal.subTitle')}</h6>
          <p className='text-secondary'>
            <small>{t('settingsModal.content')}</small>
          </p>
          <RenderItems />
        </div>
      </CModalBody>
      <CModalFooter>
        <div className='d-flex w-100 flex-wrap gap-2'>
          <div className='me-auto'>
            <MyButton color='dark' variant='ghost'>
              {t('settingsModal.action.reset')}
            </MyButton>
          </div>
          <div className='d-flex gap-2'>
            <MyButton color='dark' variant='ghost'>
              {t('settingsModal.action.cancel')}
            </MyButton>
            <MyButton color='success'>{t('settingsModal.action.submit')}</MyButton>
          </div>
        </div>
      </CModalFooter>
    </CModal>
  );
};

export default SettingsModalMonitoring;
