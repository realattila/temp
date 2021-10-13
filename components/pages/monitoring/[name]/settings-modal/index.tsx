import { CAlert, CLoadingButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react-pro';
import { memo, useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';

import randomIntNumber from 'utility/random-int-number';
import { addAuditLogDatabasesTableAPI, removeAuditLogDatabaseTablesAPI } from 'services/api/monitoring';

import MonitroingContext from 'store/context/monitoring';

import MyButton from 'components/common/my-button';
import AddTableToDatabaseMonitoring from 'components/pages/monitoring/[name]/settings-modal/add-table';
import { useAppSelector } from 'src/hook/store';
import { useRouter } from 'next/router';

interface SettingsModalMonitoringProps {
  show: boolean;
  onHide: Function;
}
const SettingsModalMonitoring: React.FC<SettingsModalMonitoringProps> = ({ show, onHide }) => {
  const { t } = useTranslation(['pages_monitoring_[name]']);
  const { data: databasesList } = useAppSelector((state) => state.monitroing.databases);

  const router = useRouter();

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

  const [addLoading, setAddLoading] = useState<boolean>(false);
  const [addError, setAddError] = useState<any>(null);
  const [addSuccess, SetAddSuccess] = useState<boolean>(false);

  const closeModal = () => {
    onHide(deleteItemsSuccess || addSuccess);
  };

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

    const res = await removeAuditLogDatabaseTablesAPI(selectedItemsToDelete);

    if (!res.hasError) {
      setDeleteItemsSuccess(true);

      setListItem((preValue: Array<any>) => {
        let selectedItemsToDelete: Array<any> = [];
        preValue.map((item) => {
          if (!item.deleted) {
            selectedItemsToDelete.push(item);
          }
        });
        return selectedItemsToDelete;
      });
    } else {
      setDeleteItemsError(res.errorText);
    }
    setDeleteItemsLoading(false);
  };

  const addTableSubmitForm = async (data: any) => {
    setAddLoading(true);
    setAddError(null);
    SetAddSuccess(false);

    let databaseId = '';
    databasesList.map((item: any) => {
      if (item?.name === router?.query?.name) {
        return (databaseId = item.id);
      }
    });

    const res = await addAuditLogDatabasesTableAPI({
      Name: data.name || '',
      DatabaseId: databaseId,
    });

    console.log('res', res.data);

    if (!res.hasError) {
      SetAddSuccess(true);
      setAddLoading(false);
      setListItem((preValue: Array<any>) => [
        ...preValue,
        { ...res.data, deleted: false, name: res.data.Name, guid: res.data.Guid },
      ]);
      return true;
    } else {
      setAddError(res.errorText);
      setAddLoading(false);
      return false;
    }
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
      onDismiss={() => closeModal()}
    >
      <CModalHeader onDismiss={() => closeModal()}>
        <CModalTitle>{t('settingsModal.title')}</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <div className='p-2'>
          <h6>{t('settingsModal.subTitle')}</h6>
          <p className='text-secondary'>
            <small>{t('settingsModal.content')}</small>
          </p>
          <RenderItems />

          <AddTableToDatabaseMonitoring
            loading={addLoading}
            error={addError}
            success={addSuccess}
            submitForm={addTableSubmitForm}
          />
        </div>
      </CModalBody>
      <CModalFooter>
        <div className='d-flex w-100 flex-wrap gap-2'>
          <div className='me-auto'></div>
          <div className='d-flex gap-2'>
            <MyButton color='dark' variant='ghost' onClick={() => closeModal()}>
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
