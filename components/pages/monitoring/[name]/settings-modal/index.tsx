import { CAlert, CLoadingButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react-pro';
import { memo, useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';

import randomIntNumber from 'utility/random-int-number';

import MyButton from 'components/common/my-button';
import MonitroingContext from 'store/context/monitoring';
import { removeAuditLogDatabaseTables } from 'services/api/monitoring';

interface SettingsModalMonitoringProps {
  show: boolean;
  onHide: Function;
}
const SettingsModalMonitoring: React.FC<SettingsModalMonitoringProps> = ({ show, onHide }) => {
  const { t } = useTranslation(['pages_monitoring_[name]']);

  const { currentDatabasTables } = useContext(MonitroingContext);

  const [listItem, setListItem] = useState<Array<any>>(
    (currentDatabasTables.data || []).map((item: any) => {
      return {
        ...item,
        deleted: false,
      };
    }),
  );

  const [deleteItemsLoading, setDeleteItemsLoading] = useState<boolean>(false);
  const [deleteItemsError, setDeleteItemsError] = useState<any>(null);
  const [deleteItemsSuccess, setDeleteItemsSuccess] = useState<boolean>(false);

  const setDeletedToTrueItem = (itemName: string) => {
    setListItem((preValueList: Array<any>) =>
      preValueList.map((item) => (item.name === itemName ? { ...item, deleted: true } : item)),
    );
  };

  const setDeletedToFalseItem = (itemName: string) => {
    setListItem((preValueList: Array<any>) =>
      preValueList.map((item) => (item.name === itemName ? { ...item, deleted: false } : item)),
    );
  };

  const saveChangeOnDeletedTables = async () => {
    setDeleteItemsLoading(false);
    setDeleteItemsError(null);
    setDeleteItemsSuccess(false);

    let selectedItemsToDelete: Array<any> = [];

    listItem.map((item) => {
      if (item.deleted) {
        selectedItemsToDelete.push(item.guid);
      }
    });

    const res = await removeAuditLogDatabaseTables(selectedItemsToDelete);

    if (!res.hasError) {
      setDeleteItemsSuccess(true);
    } else {
      setDeleteItemsError(res.errorText);
    }
    setDeleteItemsLoading(false);
  };

  const RenderItems = () => {
    return (
      <div className='monitoring-name__header__settings-modal__items'>
        {listItem.map((item: any) => {
          return (
            <div key={randomIntNumber()} className='monitoring-name__header__settings-modal__items__item'>
              {item?.deleted ? (
                <span
                  className='monitoring-name__header__settings-modal__items__item__action'
                  onClick={() => setDeletedToFalseItem(item.name)}
                >
                  <i className='cil-plus'></i>
                </span>
              ) : (
                <span
                  className='monitoring-name__header__settings-modal__items__item__action'
                  onClick={() => setDeletedToTrueItem(item.name)}
                >
                  <i className='cil-trash'></i>
                </span>
              )}
              <span>{item.name}</span>
            </div>
          );
        })}
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
            <MyButton color='dark' variant='ghost' onClick={() => onHide()}>
              {t('settingsModal.action.cancel')}
            </MyButton>
            <CLoadingButton
              loading={deleteItemsLoading}
              disabled={deleteItemsLoading}
              onClick={() => saveChangeOnDeletedTables()}
            >
              {t('settingsModal.action.submit')}
            </CLoadingButton>
          </div>
        </div>
        {!!deleteItemsError && (
          <CAlert className='mt-2 w-100' color='danger'>
            {deleteItemsError}
          </CAlert>
        )}

        {deleteItemsSuccess && (
          <CAlert className='mt-2 w-100' color='success'>
            {t('settingsModal.successDeleted')}
          </CAlert>
        )}
      </CModalFooter>
    </CModal>
  );
};

export default memo(SettingsModalMonitoring);
