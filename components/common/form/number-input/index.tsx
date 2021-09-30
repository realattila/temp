import { RegisterOptions } from 'react-hook-form';
import { useTranslation } from 'next-i18next';

import TextInput from 'components/common/form/text-input';

export interface NumberInputProps {
  label: string;
  name: string;
  defaultValue?: string | number;
  rules?: RegisterOptions;
  required?: boolean;
  type?: 'text' | 'number' | 'email' | 'password' | 'tel';
  minLength?: number;
  placeholder?: string;
  showLabel?: boolean;
  disabled?: boolean;
  className?: string;
}

const NumberInput: React.FC<NumberInputProps> = ({
  label,
  name,
  defaultValue,
  rules,
  required,
  minLength,
  placeholder,
  showLabel,
  disabled,
  className,
}) => {
  const { t } = useTranslation('form');

  return (
    <TextInput
      name={name}
      label={label}
      defaultValue={defaultValue}
      type='number'
      required={required}
      minLength={minLength}
      placeholder={placeholder}
      showLabel={showLabel}
      disabled={disabled}
      className={className}
      rules={rules}
    />
  );
};

export default NumberInput;
