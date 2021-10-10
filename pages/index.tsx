import type { GetServerSideProps, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import AppSidebar from 'components/layout/dashboard/sidebar';
import AppHeader from 'components/layout/dashboard/header/index';
import DashboardLayout from 'components/layout/dashboard';

const Home: NextPage = () => {
  return (
    <DashboardLayout>
      {/* <div className='body2'>
        <div className='scene'>
          <div className='floor'></div>
          <div className='cube'>
            <div className='front'></div>
            <div className='back'></div>
            <div className='left'></div>
            <div className='right'></div>
            <div className='top'>
              <div className='ballShadow'></div>
            </div>
            <div className='bottom'></div>
          </div>
          <div className='ball'></div>
        </div>
      </div> */}
    </DashboardLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(String(locale))),
    },
  };
};

export default Home;
