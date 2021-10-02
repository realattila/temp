import { Controller, RegisterOptions, useFormContext } from 'react-hook-form';
import { useTranslation } from 'next-i18next';
import { CFormFeedback, CFormInput, CFormLabel } from '@coreui/react-pro';

export interface NumberInputProps {
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

const NumberInput: React.FC<NumberInputProps> = ({
  label = '',
  name = '',
  defaultValue = '',
  rules = {},
  required = false,
  minLength = 0,
  placeholder = '',
  showLabel = false,
  disabled = false,
  className = '',
  min = Number.MIN_SAFE_INTEGER,
  max = Number.MAX_SAFE_INTEGER,
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
            {showLabel && <CFormLabel htmlFor={`number-input_${name}`}>{label || name}</CFormLabel>}
            <CFormInput
              className={className}
              onChange={(e) => {
                if (!(Number(e.target.value) > max || Number(e.target.value) < min)) {
                  onChange(e);
                }
              }}
              id={`number-input_${name}`}
              value={value}
              required
              disabled={disabled}
              placeholder={placeholder}
              invalid={invalid}
              type='number'
            />
            <CFormFeedback invalid={invalid}>{error?.message}</CFormFeedback>
          </div>
        );
      }}
    />
  );
};

export default NumberInput;
