import { useState } from 'react';
import { AnyObjectSchema, ValidationError } from 'yup';

const useFormValidation = (initialValues: any, schema: AnyObjectSchema) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<any>({});

  const handleChange = async (event: any) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });

    try {
      await schema.validateAt(name, { ...values, [name]: value });
      setErrors((prevErrors: any) => ({ ...prevErrors, [name]: '' }));
    } catch (error: any) {
      if (error instanceof ValidationError) {
        setErrors((prevErrors: any) => ({
          ...prevErrors,
          [name]: error.message,
        }));
      }
    }
  };

  const handleSubmit = (onSubmit: () => void) => async (event: any) => {
    event.preventDefault();
    try {
      await schema.validate(values, { abortEarly: false });
      setErrors({});
      onSubmit();
    } catch (validationErrors) {
      if (validationErrors instanceof ValidationError) {
        const formattedErrors: any = {};
        validationErrors.inner.forEach((error: any) => {
          formattedErrors[error.path] = error.message;
        });
        setErrors(formattedErrors);
      }
    }
  };

  return {
    values,
    errors,
    handleChange,
    handleSubmit,
  };
};

export default useFormValidation;
