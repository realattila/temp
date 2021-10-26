import { memo } from 'react';
import { useFormContext, Controller, RegisterOptions } from 'react-hook-form';
import { CFormFeedback, CFormSwitch } from '@coreui/react-pro';

interface SwitchInput {
  label: string;
  name: string;
  defaultValue?: string | boolean;
  rules?: RegisterOptions;
  required?: boolean;
  placeholder?: string;
  id?: string;
}

const SwitchInput: React.FC<SwitchInput> = ({ label = '', name = '', defaultValue = false, rules = {} }) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      defaultValue={defaultValue}
      control={control}
      rules={rules}
      render={({ field: { onChange, value, name }, fieldState: { invalid, error } }) => {
        return (
          <>
            <CFormSwitch
              onChange={onChange}
              checked={value}
              name={name}
              size='xl'
              label={label}
              id={`switch-input_${name}`}
              invalid={invalid}
            />
            <CFormFeedback invalid={invalid}>{error?.message}</CFormFeedback>
          </>
        );
      }}
    />
  );
};

export default memo(SwitchInput);
