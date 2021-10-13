import {
  CAccordion,
  CAccordionBody,
  CAccordionButton,
  CAccordionCollapse,
  CAccordionHeader,
  CAccordionItem,
  CBadge,
} from '@coreui/react-pro';
import { useState } from 'react';

interface AuditLogMonitoringListProps {
  status?: {
    content: string;
    type:
      | 'primary'
      | 'secondary'
      | 'success'
      | 'danger'
      | 'warning'
      | 'info'
      | 'dark'
      | 'light'
      | 'primary-gradient'
      | 'secondary-gradient'
      | 'success-gradient'
      | 'danger-gradient'
      | 'warning-gradient'
      | 'info-gradient'
      | 'dark-gradient'
      | 'light-gradient'
      | string;
  };
  data: Array<any>;
}

const AuditLogMonitoringList: React.FC<AuditLogMonitoringListProps> = ({
  status = { type: 'primary', content: '' },
  data,
}) => {
  const [activeKey, setActiveKey] = useState(0);

  console.log('data', data);

  return (
    <CAccordion className='monitoring-name__results'>
      <CAccordionItem className='monitoring-name__results__item'>
        <CAccordionHeader>
          <CAccordionButton
            collapsed={activeKey !== 1}
            onClick={() => (activeKey === 1 ? setActiveKey(0) : setActiveKey(1))}
          >
            <div className='monitoring-name__results__item__status '>
              <CBadge color={status.type}>{status.content}</CBadge>
            </div>
            <div className='d-flex  gap-4 flex-wrap'>
              <div className='text-right'>
                <div className='text-secondary d-flex gap-2 align-items-center'>
                  <span>username</span>
                </div>
                <div>Sahar.karimi</div>
              </div>
              <div className='text-right'>
                <div className='text-secondary d-flex gap-2 align-items-center'>
                  <span>username</span>
                </div>
                <div>Sahar.karimi</div>
              </div>
              <div className='text-right'>
                <div className='text-secondary d-flex gap-2 align-items-center'>
                  <span>username</span>
                </div>
                <div>Sahar.karimi</div>
              </div>
              <div className='text-right'>
                <div className='text-secondary d-flex gap-2 align-items-center'>
                  <span>username</span>
                </div>
                <div>Sahar.karimi</div>
              </div>
              <div className='text-right d-flex flex-column '>
                <div className='text-secondary d-flex gap-2 align-items-center text-size-small'>
                  <i className='cil-clock'></i>
                  <span>Action Date</span>
                </div>
                <div>Sahar.karimi</div>
              </div>
            </div>
          </CAccordionButton>
        </CAccordionHeader>
        <CAccordionCollapse visible={activeKey === 1}>
          <CAccordionBody>
            <strong>This is the first item&#39;s accordion body.</strong> It is hidden by default, until the collapse
            plugin adds the appropriate classes that we use to style each element. These classes control the overall
            appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom
            CSS or overriding our default variables. It&#39;s also worth noting that just about any HTML can go within
            the <code>.accordion-body</code>, though the transition does limit overflow.
          </CAccordionBody>
        </CAccordionCollapse>
      </CAccordionItem>
    </CAccordion>
  );
};

export default AuditLogMonitoringList;
