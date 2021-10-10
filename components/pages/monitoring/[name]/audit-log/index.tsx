import { memo } from 'react';
import AuditLogHeadingMonitioring from './header';

interface AuditLogMonitoringProps {
  openSettings: Function;
}

const AuditLogMonitoring: React.FC<AuditLogMonitoringProps> = ({ openSettings }) => {
  return (
    <div className=''>
      <AuditLogHeadingMonitioring openSettings={openSettings} />
    </div>
  );
};

export default memo(AuditLogMonitoring);
