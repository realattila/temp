import { MouseEventHandler } from 'react';
import { useTranslation } from 'react-i18next';

import { CButton, CSpinner } from '@coreui/react-pro';

interface LoadingSessionProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  loading: boolean;
  error: boolean;
  data: any;
  onRetry: MouseEventHandler<HTMLButtonElement>;
}

const LoadingSession: React.FC<LoadingSessionProps> = ({ loading, error, data = '', onRetry, children, ...props }) => {
  const { t } = useTranslation('common');
  return loading ? (
    <div {...props} className='loading-session'>
      <div className='loading-session__loading'>
        <CSpinner color='primary' />
        <span className='ms-2 '>{t('loadingSession.loading')}</span>
      </div>
    </div>
  ) : error ? (
    <div {...props} className='loading-session'>
      <div className='loading-session__error'>
        <span className='mb-2'>{t('loadingSession.error')}</span>
        <CButton onClick={onRetry}>{t('loadingSession.onRetry')}</CButton>
      </div>
    </div>
  ) : !data ? (
    <div {...props} className='loading-session'>
      <div className='loading-session__loading'>
        <span>{t('loadingSession.noData')}</span>
      </div>
    </div>
  ) : (
    <>{children}</>
  );
};
export default LoadingSession;
