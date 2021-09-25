import AppHeader from '../components/layout/dashboard/header/index';
import type { NextPage } from 'next';

import AppSidebar from '../components/layout/dashboard/aside';

const Home: NextPage = () => {
  return (
    <>
      <AppSidebar />
      <div className='wrapper d-flex flex-column min-vh-100 bg-light dark:bg-transparent'>
        <AppHeader />
        <div className='body flex-grow-1 px-3'></div>
      </div>
    </>
  );
};

export default Home;
