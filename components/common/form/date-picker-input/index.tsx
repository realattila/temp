import { DatePicker } from 'jalali-react-datepicker';
import { Controller, useFormContext } from 'react-hook-form';
import moment from 'jalali-moment';

interface DatePickerInputProps {
  name: string;
  label?: string;
  showLabel?: boolean;
  defaultValue?: Date;
  onChange?: Function;
  timePicker?: boolean;
}
const DatePickerInput: React.FC<DatePickerInputProps> = ({
  name = '',
  label = '',
  showLabel = true,
  defaultValue,
  onChange,
  timePicker = false,
}) => {
  const { control } = useFormContext();
  return (
    <Controller
      control={control}
      name={name}
      defaultValue={moment(defaultValue)}
      render={({ field: { value, onChange: onChangeControll } }) => (
        <div className={`date_picker_input__wapper ${showLabel ? '' : 'date_picker_input__lable--hide'}`}>
          <DatePicker
            label={label}
            value={value}
            onClickSubmitButton={(e) => {
              onChangeControll(moment(e.value));
              if (!!onChange) {
                onChange(moment(e.value));
              }
            }}
            timePicker={timePicker}
          />
        </div>
      )}
    />
  );
};

export default DatePickerInput;
