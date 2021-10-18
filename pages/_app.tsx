import '../custom_packages/coreio-icons-pro/css/all.css';
import '../styles/globals.css';
import '../styles/style.scss';
import 'public/fonts/fontiran.css';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { store } from 'store/index';
import { appWithTranslation } from 'next-i18next';
import NextNProgress from 'nextjs-progressbar';
import { useEffect } from 'react';
import { Page } from 'types/page';

type Props = AppProps & {
  Component: Page;
};

function MyApp({ Component, pageProps }: Props) {
  useEffect(() => {
    document.dir = 'rtl';
  }, []);

  const getLayout = Component.getLayout || ((page) => page);

  return (
    <Provider store={store}>
      <NextNProgress color='#00b67a' startPosition={0.3} stopDelayMs={200} height={2} showOnShallow={true} />
      {getLayout(<Component {...pageProps} />)}
    </Provider>
  );
}
export default appWithTranslation(MyApp);
