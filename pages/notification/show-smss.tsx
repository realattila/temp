import DashboardLayout from 'components/layout/dashboard';
import { GetStaticProps, NextPage } from 'next';

import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const ShowSmsDashboard: NextPage = () => {
  return <DashboardLayout></DashboardLayout>;
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(String(locale))),
    },
  };
};

export default ShowSmsDashboard;
