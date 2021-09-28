import { useFormContext, Controller, RegisterOptions } from 'react-hook-form';
import { useTranslation } from 'next-i18next';
import { CFormFeedback, CFormLabel, CFormTextarea } from '@coreui/react-pro';

export interface TextAreaInputProps {
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
  afterLabel?: string;
  className?: string;
}

const TextAreaInput: React.FC<TextAreaInputProps> = ({
  label,
  name,
  defaultValue = '',
  rules = {},
  required = false,
  minLength = 0,
  placeholder = '',
  showLabel = false,
  disabled = false,
  className = '',
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
          message: t('TextAreaInput.rules.required', { name: label || name }),
        },
        minLength: {
          value: minLength,
          message: t('TextAreaInput.rules.minLength', { min: minLength }),
        },
        ...rules,
      }}
      render={({ field: { onChange, value, name }, fieldState: { invalid, error } }) => {
        return (
          <div>
            {showLabel && <CFormLabel htmlFor={`text-area-input_${name}`}>{label || name}</CFormLabel>}
            <CFormTextarea
              className={className}
              id={`text-area-input_${name}`}
              placeholder={placeholder}
              disabled={disabled}
              value={value}
              onChange={onChange}
              invalid={invalid}
            ></CFormTextarea>
            <CFormFeedback invalid={invalid}>{error?.message}</CFormFeedback>
          </div>
        );
      }}
    />
  );
};

export default TextAreaInput;
