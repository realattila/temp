interface DashboardStatusCardProps {
  color: 'orange' | 'blue' | 'green' | 'red' | 'purple' | 'pink' | 'yellow';
  data: {
    label: string;
    value: string | number;
  };
}

const DashboardStatusCard: React.FC<DashboardStatusCardProps> = ({ color, data }) => {
  return (
    <div className={`shadow dashboard_page__status_card dashboard_page__status_card--${color}`}>
      <div className='dashboard_page__status_card__content'>
        <div className='dashboard_page__status_card__text'>{data.label}</div>
        <div className='dashboard_page__status_card__number'>{data.value || '0'}</div>
      </div>
      <div className='dashboard_page__status_card__icon_wapper'>
        <i className='fas fa-pause-circle dashboard_page__status_card__icon'></i>
      </div>
    </div>
  );
};

export default DashboardStatusCard;
