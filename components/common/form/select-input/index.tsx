import { memo } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { CFormFeedback, CFormLabel, CFormSelect } from '@coreui/react-pro';

import randomIntNumber from 'utility/random-int-number';

interface SelectInputProps {
  list: Array<{
    value: any;
    label?: string;
  }>;
  name: string;
  label?: string;
  showLabel?: boolean;
  defaultValue?: any;
  required?: boolean;
  disabled?: boolean;
}

const SelectInput: React.FC<SelectInputProps> = ({
  list,
  name,
  label,
  showLabel = false,
  defaultValue = '-1',
  required = false,
  disabled = false,
}) => {
  const { control } = useFormContext();
  const { t } = useTranslation('form');

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue}
      rules={{
        required: {
          value: required,
          message: t('selectInput.rules.required', { name: label || name }),
        },
        validate: (value) => {
          if (required) {
            return value === '-1' ? `${t('selectInput.rules.required', { name: label || name })}` : true;
          } else {
            return true;
          }
        },
      }}
      render={({ field: { value, onChange }, fieldState: { invalid, error } }) => {
        const onChnageInput = (e: any) => {
          if (!!e) {
            onChange(e);
          }
        };

        const RenderList = () =>
          (list || []).map((item) => (
            <option key={randomIntNumber()} value={item.value}>
              {item.label || item.value}
            </option>
          ));

        return (
          <div>
            {showLabel && <CFormLabel htmlFor={`selecte-input_${name}`}>{label || name}</CFormLabel>}

            <CFormSelect
              aria-label='Default select example'
              id={`selecte-input_${name}`}
              onChange={onChnageInput}
              value={value}
              invalid={invalid}
              disabled={disabled}
            >
              <option value='-1'>{showLabel ? '' : label}</option>
              {RenderList()}
            </CFormSelect>
            <CFormFeedback invalid={invalid}>{error?.message}</CFormFeedback>
          </div>
        );
      }}
    />
  );
};

export default memo(SelectInput);
