const DashboardLayout: React.FC = ({ children }) => {
  return (
    <>
      <AppSidebar />
      <div className='wrapper d-flex flex-column min-vh-100 bg-light dark:bg-transparent'>
        <AppHeader />
        <div className='body flex-grow-1 px-3'>{children}</div>
      </div>
    </>
  );
};

export default DashboardLayout;
