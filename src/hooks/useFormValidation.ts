import { useState } from 'react';
import { AnyObjectSchema } from 'yup';

const useFormValidation = (initialValues: any, schema: AnyObjectSchema) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<any>({});

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = (onSubmit: () => void) => (event: any) => {
    event.preventDefault();

    schema
      .validate(values, { abortEarly: false })
      .then(() => {
        setErrors({});
        onSubmit();
      })
      .catch((validationErrors) => {
        const formattedErrors: any = {};
        validationErrors.inner.forEach((error: any) => {
          formattedErrors[error.path] = error.message;
        });
        setErrors(formattedErrors);
      });
  };

  return {
    values,
    errors,
    handleChange,
    handleSubmit,
  };
};

export default useFormValidation;
