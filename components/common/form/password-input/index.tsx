import TextInput, { TextInputProps } from 'components/common/form/text-input';
import { useState } from 'react';

interface PasswordInputProps extends TextInputProps {}

const PasswordInput: React.FC<PasswordInputProps> = ({ type, showLabel, ...props }) => {
  const [toggleShow, setToggleShow] = useState<boolean>(false);

  const toggleShowPassword = () => {
    setToggleShow((preValue: boolean) => !preValue);
  };

  return (
    <TextInput
      {...props}
      type={toggleShow ? 'text' : 'password'}
      showLabel={showLabel}
      customChild={
        <div className={`toggle-password ${showLabel && 'with-label'}`}>
          {toggleShow ? (
            <i className='cil-eye' onClick={() => toggleShowPassword()}></i>
          ) : (
            <i className='cil-eye-slash' onClick={() => toggleShowPassword()}></i>
          )}
        </div>
      }
    />
  );
};

export default PasswordInput;
