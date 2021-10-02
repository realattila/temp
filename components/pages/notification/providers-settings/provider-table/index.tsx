import {
  CButton,
  CCol,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react-pro';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import randomIntNumber from 'utility/random-int-number';
import EditProviderModalNotification from './edit-provider-modal';
import RemoveProviderModalNotification from './remove-provider-modal';

interface ProviderTableNotificationProps {
  data: Array<any>;
  getProviders: any;
}

const ProviderTableNotification: React.FC<ProviderTableNotificationProps> = ({ data, getProviders }) => {
  const { t } = useTranslation('pages_notification_providers-setting');

  const [removeProviderModal, setRemoveProviderModal] = useState<any | null>(null);
  const [editProviderModal, setEditProviderModal] = useState<any | null>(null);

  const handleOpenRemoveProviderModal = (data: any) => {
    setRemoveProviderModal(data);
  };

  const handleCloseRemoveProviderModal = () => setRemoveProviderModal(null);

  const handleOpenEditProviderModal = (data: any) => {
    setEditProviderModal(data);
  };

  const handleCloseEditProviderModal = () => setEditProviderModal(null);

  const headTable = [
    { text: t('table.head.items.id') },
    { text: t('table.head.items.providerName') },
    { text: t('table.head.items.tokenUrl') },
    { text: t('table.head.items.postUrl') },
    { text: t('table.head.items.fromNumber') },
    { text: t('table.head.items.toTestNumber') },
    { text: t('table.head.items.ports') },
    { text: t('table.head.items.isActive') },
    { text: t('table.head.items.actions') },
  ];

  return (
    <>
      <CCol xs={12} className='mt-4'>
        <div className='bg-white p-4 shadow-sm'>
          <CTable bordered responsive='xxl'>
            <CTableHead>
              <CTableRow>
                {headTable.map((item) => {
                  return <CTableHeaderCell key={randomIntNumber()}>{item.text}</CTableHeaderCell>;
                })}
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {data.map((item) => {
                return (
                  <CTableRow key={randomIntNumber()}>
                    <CTableDataCell>{item?.id}</CTableDataCell>
                    <CTableDataCell>{item?.providerName}</CTableDataCell>
                    <CTableDataCell>{item?.tokenUrl}</CTableDataCell>
                    <CTableDataCell>{item?.postUrl}</CTableDataCell>
                    <CTableDataCell>{item?.fromNumber}</CTableDataCell>
                    <CTableDataCell>{item?.toTestNumber}</CTableDataCell>
                    <CTableDataCell>{item?.ports}</CTableDataCell>
                    <CTableDataCell>
                      {!!item?.isActive ? t('table.body.items.isActive.true') : t('table.body.items.isActive.false')}
                    </CTableDataCell>
                    <CTableDataCell>
                      <div className='d-flex gap-2'>
                        <CButton variant='outline' color='danger' onClick={() => handleOpenRemoveProviderModal(item)}>
                          <i className='cil-trash'></i>
                        </CButton>

                        <CButton variant='outline' color='success' onClick={() => handleOpenEditProviderModal(item)}>
                          <i className='cil-color-border'></i>
                        </CButton>
                      </div>
                    </CTableDataCell>
                  </CTableRow>
                );
              })}
            </CTableBody>
          </CTable>
        </div>
      </CCol>

      <RemoveProviderModalNotification
        show={!!removeProviderModal}
        onHide={handleCloseRemoveProviderModal}
        data={removeProviderModal}
        getProviders={getProviders}
      />
      <EditProviderModalNotification
        show={!!editProviderModal}
        onHide={handleCloseEditProviderModal}
        getProviders={getProviders}
        data={editProviderModal}
      />
    </>
  );
};
export default ProviderTableNotification;
