import { CForm } from '@coreui/react-pro';
import { DeepPartial, FormProvider, UnpackNestedValue, useForm } from 'react-hook-form';

// Types
export type FieldValues = Record<string, any>;
export type Mode = 'onBlur' | 'onChange' | 'onSubmit' | 'all' | 'onTouched';
export type ReValidateMode = 'onBlur' | 'onChange' | 'onSubmit';
export type UseFormProps<TFieldValues extends FieldValues = FieldValues> = Partial<{
  mode?: Mode;
  reValidateMode?: ReValidateMode;
  defaultValues?: UnpackNestedValue<DeepPartial<TFieldValues>>;
  shouldFocusError?: boolean;
  shouldUnregister?: boolean;
  criteriaMode?: 'firstError' | 'all';
}>;

interface FormProps {
  onSubmit: (data?: any) => void;
  useFormProps?: UseFormProps;
}

// Main core
const Form: React.FC<FormProps> = ({ children, onSubmit, useFormProps }) => {
  const methods = useForm(useFormProps);

  return (
    <FormProvider {...methods}>
      <CForm noValidate onSubmit={methods.handleSubmit(onSubmit)}>
        {children}
      </CForm>
    </FormProvider>
  );
};

Form.defaultProps = {
  onSubmit: () => {},
  useFormProps: {
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: {},
    criteriaMode: 'firstError',
    shouldFocusError: true,
    shouldUnregister: false,
  },
};

export default Form;
