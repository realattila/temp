import { useFormContext, Controller, RegisterOptions } from 'react-hook-form';
import { useTranslation } from 'next-i18next';

import { CFormFeedback, CFormInput, CFormLabel } from '@coreui/react-pro';

export interface TextInputProps {
  label?: string;
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
  min?: number;
  max?: number;
}

const TextInput: React.FC<TextInputProps> = ({
  label,
  name,
  defaultValue = '',
  rules = {},
  required = false,
  type = 'text',
  minLength = 0,
  placeholder = '',
  showLabel = false,
  disabled = false,
  className = '',
  min,
  max,
}) => {
  const { t } = useTranslation('form');

  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      defaultValue={defaultValue}
      control={control}
      rules={{
        required: {
          value: required,
          message: t('textInput.rules.required', { name: label || name }),
        },
        minLength: {
          value: minLength,
          message: t('textInput.rules.minLength', { min: minLength }),
        },
        ...rules,
      }}
      render={({ field: { onChange, value, name }, fieldState: { invalid, error } }) => {
        return (
          <div>
            {showLabel && <CFormLabel htmlFor={`text-input_${name}`}>{label || name}</CFormLabel>}
            <CFormInput
              className={className}
              onChange={onChange}
              type={type}
              id={`text-input_${name}`}
              value={value}
              required
              disabled={disabled}
              placeholder={placeholder}
              invalid={invalid}
            />
            <CFormFeedback invalid={invalid}>{error?.message}</CFormFeedback>
          </div>
        );
      }}
    />
  );
};

export default TextInput;
