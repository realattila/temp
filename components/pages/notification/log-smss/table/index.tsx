import {
  CButton,
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

import DetailsModallogSmssTableNotification from 'components/pages/notification/log-smss/table/details-modal';
import LogsSmsTablePaginationNotification from './pagination';

interface LogsSmsTableNotificationProps {
  data: any;
  pagination?: {
    pageNumber: number;
    totalPages: number;
    pageSize: number;
  };
  handleChangePage?: Function;
  showPagination?: boolean;
}
const LogsSmsTableNotification: React.FC<LogsSmsTableNotificationProps> = ({
  data,
  pagination = { pageNumber: 1, totalPages: 1, pageSize: 50 },
  handleChangePage = () => {},
  showPagination = true,
}) => {
  const { t } = useTranslation('pages_notification_show-smss');

  const [detailsModal, setDetailsModal] = useState<any>(null);

  const handleOpenDetailsModal = (data: any) => setDetailsModal(data);

  const handleCloseDetailsModal = () => setDetailsModal(null);

  const headTable = [
    { text: t('table.head.items.id') },
    { text: t('table.head.items.requesterName') },
    { text: t('table.head.items.recipient') },
    { text: t('table.head.items.status') },
    { text: t('table.head.items.createDateFa') },
    { text: t('table.head.items.details') },
  ];

  return (
    <>
      <div>
        <div className='bg-white p-4 shadow-sm mb-4'>
          <CTable bordered responsive='xxl'>
            <CTableHead>
              <CTableRow>
                {headTable.map((item) => {
                  return <CTableHeaderCell key={randomIntNumber()}>{item.text}</CTableHeaderCell>;
                })}
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {(data.items || []).map((item: any) => {
                return (
                  <CTableRow key={randomIntNumber()}>
                    <CTableDataCell>{item?.id}</CTableDataCell>
                    <CTableDataCell>{item?.requesterName}</CTableDataCell>
                    <CTableDataCell>{item?.recipient}</CTableDataCell>
                    <CTableDataCell>{item?.status}</CTableDataCell>
                    <CTableDataCell>{item?.createDateFa}</CTableDataCell>
                    <CTableDataCell>
                      <CButton variant='outline' onClick={() => handleOpenDetailsModal(item)}>
                        <i className='cil-info'></i>
                      </CButton>
                    </CTableDataCell>
                  </CTableRow>
                );
              })}
            </CTableBody>
          </CTable>
        </div>
        {showPagination && (
          <LogsSmsTablePaginationNotification pagination={pagination} handleChangePage={handleChangePage} />
        )}
      </div>
      <DetailsModallogSmssTableNotification
        data={detailsModal}
        show={!!detailsModal}
        onHide={handleCloseDetailsModal}
      />
    </>
  );
};

export default LogsSmsTableNotification;
