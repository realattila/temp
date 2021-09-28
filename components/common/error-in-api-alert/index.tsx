import { CAlert } from '@coreui/react-pro';

import { useTranslation } from 'react-i18next';

interface ErrorInApiAlertProps {
  className?: string;
}
const ErrorInApiAlert: React.FC<ErrorInApiAlertProps> = ({ children, className }) => {
  const { t } = useTranslation('common');

  const newChild = !!children ? (children != true ? children : t('errorInApi.content')) : t('errorInApi.content');

  return (
    <CAlert color='danger' className={className}>
      {newChild}
    </CAlert>
  );
};

export default ErrorInApiAlert;
