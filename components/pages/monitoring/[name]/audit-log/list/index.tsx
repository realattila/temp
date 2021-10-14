import { CAccordion } from '@coreui/react-pro';

import Pagination from 'components/common/pagination';
import { paginationType } from 'types/pagination';
import randomIntNumber from 'utility/random-int-number';

import AuditLogMonitoringListItem from './item';

interface AuditLogMonitoringListProps {
  data: any;
  handleChangePage: Function;
  pagination: paginationType;
}

const AuditLogMonitoringList: React.FC<AuditLogMonitoringListProps> = ({ data, handleChangePage, pagination }) => {
  const RenderItems = () =>
    (data?.items || []).map((item: any) => {
      const statusType = () => {
        switch (String(item?.actionType).toLowerCase()) {
          case 'update':
            return 'info';
          case 'delete':
            return 'danger';
          default:
            return 'primary';
        }
      };
      return (
        <AuditLogMonitoringListItem
          data={item}
          key={randomIntNumber()}
          status={{ content: item?.actionType, type: statusType() }}
        />
      );
    });

  return (
    <div className='d-flex flex-column gap-4'>
      <CAccordion className='monitoring-name__results'>{RenderItems()}</CAccordion>
      <div>
        <Pagination handleChangePage={handleChangePage} pagination={pagination} />
      </div>
    </div>
  );
};

export default AuditLogMonitoringList;
