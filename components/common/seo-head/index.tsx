import Head from 'next/head';

interface SeoHeadProps {
  title?: string;
  description?: string;
}

const SeoHead: React.FC<SeoHeadProps> = ({ title = '', description = '', children }) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name='description' content={description} />
    </Head>
  );
};

export default SeoHead;
