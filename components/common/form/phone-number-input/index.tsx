import { useTranslation } from 'next-i18next';
import NumberInput, { NumberInputProps } from 'components/common/form/number-input';

interface PhoneNumberInputProps extends NumberInputProps {}

const PhoneNumberInput: React.FC<PhoneNumberInputProps> = ({
  label,
  name,
  required,
  defaultValue,
  placeholder,
  rules,
  className = '',
  showLabel,
}) => {
  const { t } = useTranslation('form');

  return (
    <NumberInput
      name={name}
      label={label}
      required={required}
      defaultValue={defaultValue}
      placeholder={placeholder}
      showLabel={showLabel}
      rules={{
        pattern: {
          value: /^[0][9][0-9][0-9]{8,8}$/,
          message: t('PhoneNumberInput.rules.pattern', { name: label || name }),
        },
        ...rules,
      }}
      className={`phone_number_input ${className}`}
    />
  );
};

export default PhoneNumberInput;
