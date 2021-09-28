import type { GetServerSideProps, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import AppSidebar from 'components/layout/dashboard/sidebar';
import AppHeader from 'components/layout/dashboard/header/index';
import DashboardLayout from 'components/layout/dashboard';

const Home: NextPage = () => {
  return <DashboardLayout></DashboardLayout>;
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(String(locale))),
    },
  };
};

export default Home;
