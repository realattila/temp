import { FormProvider, useForm, UseFormProps } from 'react-hook-form';

const withForm = (WappedComponent: any, useFormProps?: UseFormProps) => (props: any) => {
  const methods = useForm(useFormProps);

  return (
    <FormProvider {...methods}>
      <WappedComponent {...props} />
    </FormProvider>
  );
};

export default withForm;
