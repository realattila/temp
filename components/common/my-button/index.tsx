import { CButton } from '@coreui/react-pro';
import { CButtonProps } from '@coreui/react-pro/dist/components/button/CButton';

interface MyButtonProps extends CButtonProps {}

const MyButton: React.FC<MyButtonProps> = ({ className = '', ...props }) => {
  return <CButton className={`d-flex align-items-center ${className}`} {...props} />;
};

export default MyButton;
