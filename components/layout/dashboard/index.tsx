import AppSidebar from 'components/layout/dashboard/sidebar';
import AppHeader from 'components/layout/dashboard/header';

const DashboardLayout: React.FC = ({ children }) => {
  return (
    <div className='dashboard'>
      <AppSidebar />
      <div className='wrapper d-flex flex-column min-vh-100 bg-light dark:bg-transparent'>
        <AppHeader />
        <div className='body flex-grow-1 '>{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
