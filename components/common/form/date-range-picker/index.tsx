import { memo, useRef } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import moment from 'jalali-moment';
import { RangeDatePicker } from 'jalali-react-datepicker';

interface DateRangePickerInputProps {
  name: string;
  defaultValue?: {
    start: Date;
    end: Date;
  };
  label?: string;
  showLabel?: boolean;
}

const DateRangePickerInput: React.FC<DateRangePickerInputProps> = ({
  name = '',
  defaultValue = { start: moment(new Date()), end: moment(new Date()) },
  showLabel = false,
  label = '',
}) => {
  const { control } = useFormContext();
  const pickerRef = useRef<any>(null);

  const toggleOpenDatePickerModal = () => {
    pickerRef.current?.toggleModalOpen();
  };

  return (
    <Controller
      name={name}
      defaultValue={defaultValue}
      control={control}
      render={({ field: { value, onChange } }) => {
        return (
          <div>
            <div className='date-range-picker-input'>
              <RangeDatePicker
                start={value.start.format('jYYYY/jMM/jDD')}
                end={value.end.format('jYYYY/jMM/jDD')}
                ref={pickerRef}
                onClickSubmitButton={(e) => onChange(e)}
              />
            </div>
            {showLabel && <label className='form-label'>{label}</label>}
            <div
              className='form-control d-flex gap-2 align-items-center date-range-picker-input__input '
              onClick={toggleOpenDatePickerModal}
            >
              <span>{value.end.format('jYYYY-jMM-jDD')}</span>
              <i className='cil-arrow-right text-secondary'></i>
              <span>{value.start.format('jYYYY-jMM-jDD')}</span>
              <i className='cil-calendar text-secondary'></i>
            </div>
          </div>
        );
      }}
    />
  );
};
export default memo(DateRangePickerInput);
