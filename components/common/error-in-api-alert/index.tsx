import { CAlert } from '@coreui/react-pro';
import { memo } from 'react';

import { useTranslation } from 'react-i18next';

interface ErrorInApiAlertProps {
  className?: string;
  children: React.ReactNode;
}

const ErrorInApiAlert: React.FC<ErrorInApiAlertProps> = ({ children, className }) => {
  const { t } = useTranslation('common');
  // const newChild = !!children ? (children != true ? children : t('errorInApi.content')) : t('errorInApi.content');
  // Check if hav Child or Not
  const newChild = !!children && children != true ? children : t('errorInApi.content');
  return (
    <CAlert color='danger' className={className}>
      {newChild}
    </CAlert>
  );
};

export default memo(ErrorInApiAlert);
