import { useTranslation } from 'react-i18next';

interface TabsMonitioringProps {
  selectedTabState: [selectedTab: string, setSelectedTab: Function];
}
const TabsMonitioring: React.FC<TabsMonitioringProps> = ({ selectedTabState }) => {
  const [selectedTab, setSeletectTab] = selectedTabState;

  const handleChangeTab = (value: string) => {
    setSeletectTab(value);
  };

  const { t } = useTranslation('pages_monitoring_[name]');

  return (
    <div className='monitoring-name__tabs'>
      <div className='d-flex gap-5'>
        <div
          className={`w-100 d-flex align-items-center gap-2 monitoring-name__tabs__item ${
            selectedTab === 'opration' && 'monitoring-name__tabs__item__active'
          } `}
          onClick={() => handleChangeTab('opration')}
        >
          <span>{t('tabs.oprationLogs')}</span>
          <i className='cil-grid'></i>
        </div>
        <div
          className={`w-100 d-flex align-items-center gap-2 monitoring-name__tabs__item ${
            selectedTab === 'audit' && 'monitoring-name__tabs__item__active'
          } `}
          onClick={() => handleChangeTab('audit')}
        >
          <span>{t('tabs.auditLogs')}</span>
          <i className='cil-notes'></i>
        </div>
      </div>
    </div>
  );
};
export default TabsMonitioring;
